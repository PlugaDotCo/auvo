const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../../lib/actions/Customer/getCustomerByFilter');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
    'active': true,
    'id': 0,
    'description': 'ana',
    'externalId': '',
    'segmentId': 0,
    'groupId': 0,
    'page': 1,
    'pageSize': 10,
    'order': '0',
    'selectfields': 'Email, Note, id'
  }
};

  describe('Action: Get customer by filter', function () {
  it('returns success with valid customer - teste -', function (done) {

    plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/login`,
      params: { ApiKey: process.env.ApiKey, apiToken: process.env.apiToken }
    }).then((res) => {
      event.auth.accessToken = res.data.result.accessToken;
      
      return action.handle(plg, event).then((customer) => {
        
        console.log('customer result: ' +JSON.stringify(customer.result));

        expect(customer.result).to.not.be.null;
               
        done();
     });
    }).catch(done);
  });
});

