require('dotenv').config()
// 'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const ejs = require("ejs");
const Post = require("./models/post")
// const mongoose = require('mongoose');

const http = require('http');
const request = require('request');
const { send } = require('process');

const hostname = '127.0.0.1';
const port = 3000;

let subscriptionKey = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY
let endpoint = process.env.COMPUTER_VISION_ENDPOINT
let mongo_pw = process.env.DATABASE_PW
let mongo_un = process.env.DATABASE_USERNAME
let DB_NAME = 'DB'
let host = 'host'
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

mongoose
  .connect('mongodb://'+ mongo_un + ':'+ mongo_pw + '@'+host+'/'+DB_NAME+'+?ssl=true&replicaSet=atlas-qlljxs-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(() => {
    console.log('database connected')
  })
  .catch(() => {
    console.log('connection failed, err')
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
  Post.find().then((docs) => {
    res.status(200).json({
      message: docs,
    })
  })
})

app.route('retrieve/id/:id')
.get(function(req, res) {
  Post.findById(req.params.id).then((doc) => {
    res.status(200).json({
      message: doc,
    })
  })
})


app.route('/process/byimg')
.post(function(req, res){

})


app.route('/process/byurl')
.post(function(req, res) {
  imageUrl = req.body.url 

  console.log(imageUrl)
  process_image_by_url(imageUrl)

 
  // GET DATA FROM API

  // PROCESS THE DATA

  // POST THE DATA TO DATABASE


  var data = { title: '0', content: '0' }

  const post = new Post({ 
    title: data.title,
    content: data.content,
  })
  post.save()
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

    try_get(req_id)
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

const TIME_OUT = 50
  
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



