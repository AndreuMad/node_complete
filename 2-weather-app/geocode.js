const request = require('request');

module.exports.geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
      json: true
    }, (error, response, body) => {
      const { body: parsedBody } = response;
      if (error) {
        reject(JSON.stringify(error, undefined, 2));
      } else if (parsedBody.status === 'ZERO_RESULTS') {
        reject('No results');
      } else if (parsedBody.status === 'OVER_QUERY_LIMIT') {
        reject('You have exceeded your daily request quota for this API');
      } else if (parsedBody.status === 'OK') {
        const { lat, lng } = parsedBody.results[0].geometry.location;
        resolve({
          lat,
          lng
        });
      }
    });
  });
};
