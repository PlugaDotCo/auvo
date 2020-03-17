/**
 * Place your global test hooks here.
 *
 * See more at:
 * - [mocha](https://mochajs.org)
 * - [chai](https://chaijs.com)
 */
require('dotenv/config');
const buildError = require('../lib/shared/buildError');

if (process.env.AXIOS_DEBUG) {
  const plg = require('pluga-plg');
  const axiosDebug = require('axios-debug');
  axiosDebug(plg.axios);
}

before(function (done) {
  console.log('Testing functions...');
  done();
});

exports.getBearerAccessToken = (plg) => plg.axios({
  method: 'get',
  url: `${process.env.BASE_URI}/login`,
  params: { 
    apiKey: process.env.API_KEY,
    apiToken: process.env.API_TOKEN
  }
}).then((res) => res.data.result.accessToken).catch((err) => {
  throw buildError('get bearer token', err);
});
