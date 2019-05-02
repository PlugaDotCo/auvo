const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../../lib/actions/Customer/deleteCustomer');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
    'id': 2496118
  }
};

  describe('Action: Delete customer', function () {
  it('returns success with valid customer - teste -', function (done) {

    plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/login`,
      params: params: { ApiKey: process.env.ApiKey, apiToken: process.env.apiToken }
    }).then((res) => {
      event.auth.accessToken = res.data.result.accessToken;
      
      return action.handle(plg, event).then((customer) => {       
        done();
     });
    }).catch(done);
  });
});

