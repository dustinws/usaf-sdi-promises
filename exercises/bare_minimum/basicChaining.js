/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

const { getGitHubProfileAsync } = require('./promisification');
const { pluckFirstLineFromFileAsync } = require('./promiseConstructor');


const writeJSONFile = (filePath) => (data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), (error) => {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  });


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(getGitHubProfileAsync)
    .then(writeJSONFile(writeFilePath))
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
