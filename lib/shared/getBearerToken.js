const plg = require('pluga-plg');
const buildError = require('./buildError');

const getBearerToken = (plg, event) => plg.axios({
  method: 'get',
  url: `${event.meta.baseURI}/login`,
  params: { 
    apiKey: event.auth.apiKey,
    apiToken: event.auth.apiToken 
  }
}).then((res) => res.data.result.accessToken).catch((err) => {
  throw buildError('get bearer token', err);
});

module.exports = getBearerToken;