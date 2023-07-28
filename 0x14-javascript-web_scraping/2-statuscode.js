#!/usr/bin/node

const axios = require('axios');

const url = process.argv[2];

axios.get(url)
  .then(response => {
    console.log(`code: ${response.status}`);
  })
  .catch(error => {
    console.error(`code: ${error.response ? error.response.status : 'unknown'}`);
  });
