const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../../lib/actions/Task/deleteTask');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
    'id': 3076404
  }
};

  describe('Action: Delete task', function () {
  it('returns success with valid task - teste -', function (done) {

    plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/login`,
      params: { apiKey: process.env.apiKey, apiToken: process.env.apiToken }
    }).then((res) => {
      event.auth.accessToken = res.data.result.accessToken;
      
      return action.handle(plg, event).then((task) => {       
        done();
     });
    }).catch(done);
  });
});

