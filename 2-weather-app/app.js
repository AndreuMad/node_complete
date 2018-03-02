const request = require('request');
const yargs = require('yargs');

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

console.log(arguments);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(arguments.a)}`,
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(body, undefined, 2));
});
