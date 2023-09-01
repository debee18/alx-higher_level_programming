#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];
const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Request failed with status code: ${response.statusCode}`);
    return;
  }

  const movieData = JSON.parse(body);
  const characterUrls = movieData.characters;

  const printCharacterName = (index) => {
    if (index >= characterUrls.length) {
      return;
    }

    const characterUrl = characterUrls[index];
    request(characterUrl, (characterError, characterResponse, characterBody) => {
      if (characterError) {
        console.error(characterError);
        return;
      }

      if (characterResponse.statusCode !== 200) {
        console.error(`Request failed with status code: ${characterResponse.statusCode}`);
        return;
      }

      const characterData = JSON.parse(characterBody);
      console.log(characterData.name);

      // Call the function recursively for the next character
      printCharacterName(index + 1);
    });
  };

  printCharacterName(0);
});
