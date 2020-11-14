// 'use strict';
require('dotenv').config()
const request = require('request');


let subscriptionKey = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY
let endpoint = process.env.COMPUTER_VISION_ENDPOINT

if (!subscriptionKey) { 
    throw new Error('Set your environment variables for your subscription key and endpoint.');
    // console.log(subscriptionKey);
 }

// var uriBase = endpoint + 'vision/v3.1/ocr'
var uriBase = endpoint + 'vision/v3.1/read/analyze'


const imageUrl =
    // 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';
    // 'https://i.imgur.com/cAOBxEq.jpeg'
    'https://i.imgur.com/aa2QCn3.jpeg'

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
//   let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
//   console.log('JSON Response\n');
//   console.log(jsonResponse);
  const req_id = response.headers['apim-request-id']


  try_get(req_id)
//   request.get(endpoint + 'vision/v3.1/read/analyzeResults/' + req_id)
  
});

function try_get(id) {
    req_url = endpoint + 'vision/v3.1/read/analyzeResults/' + id

    const req_opt = { 
        //   uri: endpoint + 'vision/v3.1/read/analyzeResults/' + req_id,
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