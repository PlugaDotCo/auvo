const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../lib/actions/Customer');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
    "externalId": "10",
    "name": "Pluga customer",
    "phoneNumber": "988888888, 977777777",
    "email": "email1@pluga.com, email2@pluga.com",
    "manager": "Pluga managers name",
    "managerJobPosition": "Pluga director",
    "note": "Something written here",
    "address": "adress pluga Rio",
    "latitude": -22.9686807,
    "longitude": -43.1842243,
    "maximumVisitTime": 1,
    "unitMaximumTime": 3,
    "cpfCnpj": "71728976090",
    "groupsId": [31171, 31172],
    /*"managerTeamsId": [],*/
    "managersId": [12080, 12111],
    "segmentId": 1096,
    "active": true,
    "adressComplement": "copacabana"
  }
};

  describe('Action: Create customer', function () {
  it('returns success with valid customer - teste -', function (done) {
    plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/login`,
      params: { ApiKey: process.env.ApiKey, apiToken: process.env.apiToken }
    }).then((res) => {
      event.auth.accessToken = res.data.result.accessToken;

      return action.handle(plg, event).then((customer) => {

        console.log('customer result: ' +JSON.stringify(customer));  
        expect(customer.id).to.not.be.null;
        expect(customer.externalId).to.eq(event.input.externalId);
       
        delete event.input.externalId;
        event.input.id = customer.id;
        event.input.name = "Pluga customer updated";
        event.input.phoneNumber = "977777777";
        event.input.email = "email1@pluga.com";

        return action.handle(plg, event).then((result) => {
        console.log('customer update result: ' +JSON.stringify(result));  

        expect(result.id).to.eq(customer.id);
        expect(result.description).to.eq("Pluga customer updated");
        expect(result.externalId).to.eq("10");
        
        console.log('customer update SUCCESS');  

        done();
         }).catch(done);

      }).catch(done);
    });
  });
});

