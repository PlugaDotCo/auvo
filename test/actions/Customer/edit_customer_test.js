const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../../lib/actions/Customer/editCustomer');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
    'name': 'Customer pluga',
    'manager': 'Pluga manager',
    'note': 'Pluga note',
    'id': 2496118
  }
};

  describe('Action: Edit customer', function () {
  it('returns success with valid customer - teste -', function (done) {

    plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/login`,
      params: { ApiKey: process.env.ApiKey, apiToken: process.env.apiToken }
    }).then((res) => {
      event.auth.accessToken = res.data.result.accessToken;
      
      return action.handle(plg, event).then((customer) => {
        
        console.log('customer result: ' +JSON.stringify(customer.result));

        expect(customer.result.id).to.not.be.null;
        expect(customer.result.id).to.eq(event.input.id);
        expect(customer.result.description).to.eq(event.input.name);
        expect(customer.result.manager).to.eq(event.input.manager);
        expect(customer.result.note).to.eq(event.input.note);
       
        done();
     });
    }).catch(done);
  });
});

