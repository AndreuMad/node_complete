const yargs = require('yargs');
const axios = require('axios');

const arguments = yargs
  .options({
    a: {
      alias: 'address',
      demand: true,
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const address = encodeURIComponent(arguments.a);
const geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

axios.get(geocodeUrl, {
  params: {
    address
  }
})
  .then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address');
    }

    const { lat, lng } = response.data.results[0].geometry.location;
    const weatherUrl = `https://api.darksky.net/forecast/a4644e9addc71d6b77a66fe22bd99019/${lat},${lng}`;

    return axios.get(weatherUrl)
  })
  .then((response) => {
    console.log(response.data.currently);
  })
  .catch((error) => {
    if(error.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers');
    } else {
      console.log(error.message);
    }
  });
