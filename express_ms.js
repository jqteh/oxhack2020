// 'use strict';
require('dotenv').config()
const request = require('request');


let subscriptionKey = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY
let endpoint = process.env.COMPUTER_VISION_ENDPOINT

if (!subscriptionKey) { 
    throw new Error('Set your environment variables for your subscription key and endpoint.');
    // console.log(subscriptionKey);
 }

var uriBase = endpoint + 'vision/v3.1/ocr'
// var uriBase = endpoint + 'vision/v3.1/read/analyze'


const imageUrl =
    // 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';
    'https://i.imgur.com/cAOBxEq.jpeg'

// Request parameters.
const params = {
    // 'visualFeatures': 'Categories,Description,Color',
    // 'details': '',
    'language': 'en'
};

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
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
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);
//   const req_id = response.headers['apim-request-id']


//   request.get(endpoint + 'vision/v3.1/read/analyzeResults/' + req_id, req_opt, (error, response, body) => {
//     let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
//     console.log('JSON Response\n');
//     console.log(jsonResponse);
//   })
//   request.get(endpoint + 'vision/v3.1/read/analyzeResults/' + req_id)
  
});
