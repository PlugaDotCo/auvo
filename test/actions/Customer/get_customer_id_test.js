const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../../lib/actions/customer/getCustomerById');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
   "id":2496118,
  }
};

  describe('Action: Get customer by id', function () {
  it('returns success with valid customer - teste -', function (done) {

    plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/login`,
      params: { ApiKey: process.env.ApiKey, apiToken: process.env.apiToken }
    }).then((res) => {
      event.auth.accessToken = res.data.result.accessToken;
      
      return action.handle(plg, event).then((customer) => {
        
       console.log('customer result: ' +JSON.stringify(customer)); 
       expect(customer.result.id).to.not.be.null;
       expect(customer.result.id).to.eq(event.input.id);
       
       done();
     });
    }).catch(done);
  });
});

