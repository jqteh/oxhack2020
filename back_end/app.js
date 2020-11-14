require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const ejs = require("ejs");
const http = require('http');
const request = require('request');
const send = require('process');

const hostname = '127.0.0.1';
const port = 5117;

let subscriptionKey = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY
let endpoint = process.env.COMPUTER_VISION_ENDPOINT
let mongo_pw = process.env.DB_PW
let mongo_un = process.env.DB_UN
let db_name = process.env.DB_NAME
let host = process.env.DB_HOST

if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }



// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


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
  console.log(`Example app listening at http://localhost:${port}`)
})


app.route('/retrieve/all')
.get(function(req,res) {
  Equation.find().then((docs) => {
    res.status(200).json({
      message: docs,
    })
  })
})

app.route('retrieve/id/:id')
.get(function(req, res) {
  Equation.findById(req.params.id).then((doc) => {
    res.status(200).json({
      message: doc,
    })
  })
})


app.route('/process/byimg')
.post(function(req, res){
  throw new Error('not impemented exception')
})


app.route('/process/byurl')
.post(function(req, res) {
  var imageUrl = req.body.url 

  // remove remove remove
  imageUrl = 'https://i.imgur.com/aa2QCn3.jpeg' 
  // test img


  console.log(imageUrl)
  process_image_by_url(imageUrl)

 
  // GET DATA FROM API

  // PROCESS THE DATA

  // POST THE DATA TO DATABASE


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


function process_image_by_url(url) {
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



