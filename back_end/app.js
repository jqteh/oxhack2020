require('dotenv').config({ path: 'back_end/.env'})

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const ejs = require("ejs");
// const http = require('http');
const request = require('request');
// const send = require('process');

const hostname = '127.0.0.1';
const port = 5117;

let subscriptionKey = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY;
let endpoint = process.env.COMPUTER_VISION_ENDPOINT;
let mongo_pw = process.env.DB_PW;
let mongo_un = process.env.DB_UN;
let db_name = process.env.DB_NAME;
let host = process.env.DB_HOST;

const app = express();

const db_url = 'mongodb+srv://'+ mongo_un + ':' + mongo_pw +'@' + host + '/' + db_name //+ '?retryWrites=true&w=majority'

const latexSc = new mongoose.Schema({
  latex: String,
})
const Equation = mongoose.model("Equation", latexSc)


mongoose
  // .connect('mongodb+srv://'+ mongo_un + ':'+ mongo_pw + '@'+host+'/'+DB_NAME+'+?ssl=true&replicaSet=atlas-qlljxs-shard-0&authSource=admin&retryWrites=true&w=majority')
  
 .connect(db_url, {useNewUrlParser: true})
  
  .then(() => {
    console.log('database connected')
  })
  .catch((e) => {
    console.log('database connection failed, error')
    console.log(e)
  })
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

app.route('/remove/id/:id').delete((req, res, next) => {
  // delete request received
  req.collection.removeById(req.params.id, (err, output) => {
    if (err) {
      return next(err)
    } 
    res.send(output === 1 ? {message: 'deletion succesful'} : {message: 'error encountered'})
  })
})

// GET ALL
app.route('/retrieve/all')
.get(function(req,res) {
  Equation.find().then((docs) => {
    res.status(200).json({
      message: docs,
    })
  })
})


// GET
app.route('retrieve/id/:id')
.get(function(req, res) {
  Equation.findById(req.params._id).then((doc) => {
    res.status(200).json({
      message: doc,
    })
  })
})


app.route('/process/byimg')
.post(function(req, res){
  req.body.pipe()
  throw new Error('not impemented exception')
})


app.route('process/byjson')
.post(function(req, res) {
  processed_data = process_json_eqns(req.body.data)

  // DO PROCESSING



  const equation = new Equation({
    latex: '4x + 2 = 3'
  })
  equation.save((e) => {
    res.status(501).json({message: 'error'}).redirect('/')
  })
  res.status(201).json({ 
    message: 'data retrieved and stored succesfully'
  })
})

app.route('/process/byurl')
.post(function(req, res) {
  var imageUrl = req.body.url 

  // remove remove remove
  // imageUrl = 'https://i.imgur.com/aa2QCn3.jpeg' 
  // test img


  console.log(imageUrl)
  const data_retrieved = segment_image_by_url(imageUrl)

 
  // GET DATA FROM API

  // PROCESS THE DATA

  // POST THE DATA TO DATABASE

  const eqns = process_json_eqns(data_retrieved)

  // figure out how to put data into this? =>

  // const equation = new Equation({
  //   latex: '4x + 2 = 3'
  // })
  eqns.save((e) => {
    res.status(501).json({message: 'error'}).redirect('/')
  })
  res.status(201).json({ 
    message: 'data retrieved and stored succesfully'
  })
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
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
  };

  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);nod
      return;
    }

    const req_id = response.headers['apim-request-id']
    
    setTimeout(try_get, req_id, 100);
  });
}

function try_get(id) {
  req_url = endpoint + 'vision/v3.1/read/analyzeResults/' + id

  const req_opt = { 
      qs: '',
      body: '',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
    }
  }

const TIME_OUT = 3000
  
request.get(req_url, req_opt, (error, response, body) => {
    let jsonResponse = JSON.parse(body);
    if (jsonResponse['status'] == 'running') {
        setTimeout(try_get, id, TIME_OUT);
    } else {
        console.log('JSON Response\n');
        console.log(JSON.stringify(jsonResponse));
    }
  })
}

function process_json_eqns(data) {
  throw new Error('not implemented')
  return data
}