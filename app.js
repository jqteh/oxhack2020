
// 'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const mongoose = require('mongoose');

const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 3000;

let subscriptionKey = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY
let endpoint = process.env.COMPUTER_VISION_ENDPOINT
// if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }

var uriBase = endpoint + 'vision/v3.1/analyze';

const imageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';

// Request parameters.
const params = {
    'visualFeatures': 'Categories,Description,Color',
    'details': '',
    'language': 'en'
};




// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


const app = express();

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

// app.route('/process/:imUrl')
app.route('/process')

.get(function(req, res) {
  const imurl = req.params.imUrl


  const imageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';

  console.log(imurl)
  process_image(imageUrl)
})


function process_image(url) {

  const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + url + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
  };

  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    console.log('JSON Response\n');
    console.log(jsonResponse);
  });
}




