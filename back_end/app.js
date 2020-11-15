// require('dotenv').config({ path: 'back_end/.env'})
require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require('request');

const hostname = '127.0.0.1';
const port = 5117;

let subscriptionKey = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY;
let endpoint = process.env.COMPUTER_VISION_ENDPOINT;
let mongo_pw = process.env.DB_PW;
let mongo_un = process.env.DB_UN;
let db_name = process.env.DB_NAME;
let host = process.env.DB_HOST;

const app = express();


// Construct MongoDB url
const db_url = 'mongodb+srv://' + mongo_un + ':' + mongo_pw + '@' + host + '/' + db_name

// Mongo model
const latexSc = new mongoose.Schema({
  latex: String,
})
const Equation = mongoose.model("Equation", latexSc)


// Connect to DB
mongoose.connect(db_url, { useNewUrlParser: true })
  .then(() => {
    console.log('database connected')
  })
  .catch((e) => {
    console.log('database connection failed, error')
    console.log(e)
  })


// Server running

app.get('/', (req, res) => {
  res.send('Server running')
})

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`hAckPI listening at http://localhost:${port}`)
})

// SERVER NODES

// DELETE: /remove/id/:elid // DELETE ekement matching id in db
// GET: /retrieve/all // get all elements in db
// GET: /retrieve/id/:elid // get element of id
// POST: /process/byimg // process img from binary in body
// POST: /process/byjson // process img from json
// POST: /process/byurl // process img with url posted in body { url: imurl }

app.delete('/remove/id/:elid', (req, res, next) => {
  // delete request received
  Equation.findByIdAndDelete(req.params.elid, (err, output) => {
    if (err) {
      res.send({ message: 'could not delete' })
    } else {
      res.send({ message: 'succesful' })
    }
  }).catch((e) => {
    res.send(e)
  })
})


/////// ROUTING //////

// GET ALL
app.route('/retrieve/all')
  .get(function (req, res) {
    Equation.find().then((body) => {
      res.status(200).json({
        body,
      })
    })
  })


// GET
app.get('/retrieve/id/:elid', function (req, res) {
    // if params.id.
    Equation.findById(req.params.elid)
      .then((body) => {
        res.status(200).json({
          body,
        })
      })
      .catch((e) => {
        res.status(404).json({ message: 'id not in db' })
      })
  })


app.post('/process/byimg', function (req, res) {

    const options = {
      uri: uribase,
      qs: params,
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
      },
      body: req.body
    };
    request.post(options, (err, res, body) => {

      if (err) {
        console.log(err)
        return
      }
      const req_id = res.headers['apim-request-id']

      setTimeout(try_get, req_id, 100);
    })
  })


app.post('process/byjson', function (req, res) {

  if (!body) {
    res.send({body: 'error: no body'}).end()
  } else {
    res.send({body: 'received'}).end()
  }

  process_ocr_res(req.body.data).then((d) => {
    d.save()
  })
})

app.post('/process/byurl', function (req, res) {
    const imageUrl = req.body.url

    res.send({body: 'request received'}).end()

    segment_image_by_url(imageUrl)
  })



function segment_image_by_url(url) {
  const method = 'vision/v3.1/read/analyze'
  const uribase = endpoint + method

  // set language
  const params = {
    'language': 'en'
  };

  const options = {
    uri: uribase,
    qs: params,
    body: '{"url": ' + '"' + url + '"}',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey
    }
  };

  request.post(options, (error, response, body) => {

    if (response.statusCode === 202) {

      const req_id = response.headers['apim-request-id']

      setTimeout(try_get, 200, req_id);
    } else { 
      console.log(response.statusCode + ' error bad request')
    }
  })
  
}

async function try_get(req_id) {
  req_url = endpoint + 'vision/v3.1/read/analyzeResults/' + req_id

  const req_opt = {
    qs: '',
    body: '',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey
    }
  }

  const TIME_OUT = 1500

  request.get(req_url, req_opt, (error, response, body) => {

    let jsonResponse = JSON.parse(body);

    if (jsonResponse['status'] === 'succeeded') {

      process_read_res(jsonResponse.body).then((data) => {
        data.save()
      }).catch((e) => {
        console.log(e)
      })

    } else if (!jsonResponse['status'] || jsonResponse['status'] === 'error') {

      console.log(jsonResponse['status'])
      throw new Error()

    } else {

      setTimeout(try_get, TIME_OUT, req_id);

    }
  }).catch((e) => {})
};

async function process_read_res(data) {
  return new Promise(resolve => {
    var processed_data = data
    // throw new Error()
    return processed_data;
    // resolve(processed_data)
  })
  
}

function process_ocr_res(data) {
  var processed_data = {
    line: data.map(o => o.words.text)
  }

  processed_data.array.forEach(element => {
    var isLastCharNum = false
    if (typeof element === String) {
      if (typeof char != undefined) {
        if (!isNaN(char - parseFloat(char))) {
          isLastCharNum = true
        }
      }
    }

    
  });

  return new Promise(resolve => {
    resolve(processed_data)
  })
}