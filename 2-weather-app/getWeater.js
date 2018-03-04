const request = require('request');

module.exports.getWeather = (lat, lng, callback) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/a4644e9addc71d6b77a66fe22bd99019/${lat},${lng}`,
      json: true
    }, (error, response, body) => {

      if (error) {
        reject(JSON.stringify(error, undefined, 2));
      } else if (!error && response.statusCode === 400) {
        resolve('Enable to connect to fetch weather');
      } else if (!error && response.statusCode === 200) {
        resolve(response.body.currently);
      }
    });
  });
};
