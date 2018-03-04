const yargs = require('yargs');

const geocode = require('./geocode');
const getWeather = require('./getWeater').getWeather;

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

geocode.geocodeAddress(arguments.a)
  .then(({ lat, lng }) => getWeather(lat, lng))
  .then(result => console.log(result))
  .catch(error => console.log(error));
