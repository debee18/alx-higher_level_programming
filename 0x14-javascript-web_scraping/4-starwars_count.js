#!/usr/bin/node

const request = require('request');

const apiUrl = process.argv[2];
const characterId = 18;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Request failed with status code: ${response.statusCode}`);
    return;
  }

  const moviesData = JSON.parse(body).results;
  const moviesWithWedge = moviesData.filter(movie => {
    return movie.characters.includes(`https://swapi-api.alx-tools.com/api/people/${characterId}/`);
  });

  console.log(moviesWithWedge.length);
});
