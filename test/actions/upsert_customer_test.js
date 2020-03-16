const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../lib/actions/upsert_customer');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    apiKey: process.env.API_KEY,
    apiToken: process.env.API_TOKEN
  },
  input: {
    externalId: "10",
    name: "Pluga customer",
    phoneNumber: "988888888, 977777777",
    email: "email1@pluga.com, email2@pluga.com",
    manager: "Pluga managers name",
    managerJobPosition: "Pluga director",
    note: "Something written here",
    address: "adress pluga Rio",
    latitude: -22.9686807,
    longitude: -43.1842243,
    maximumVisitTime: 1,
    unitMaximumTime: 3,
    cpfCnpj: "71728976090",
    // groupsId: '31171, 31172',
    /*managerTeamsId: [],*/
    // managersId: '12080, 12111',
    // segmentId: 1096, //quando não existe volta com err.response.data = "" - tratar isso
    active: true,
    adressComplement: "copacabana"
  }
};

describe('Action: Upsert customer', function () {
  let customer;
  it('returns success with valid customer', function (done) {
    action.handle(plg, event).then((result) => {
      // console.log('customer result: ', result);  
      expect(result.id).to.not.be.null;
      expect(result.externalId).to.eq(event.input.externalId);
      
      customer = result;
      done();
    }).catch(done);
  });

  it('return success when update customer', function (done) {
    delete event.input.externalId;
    event.input.id = customer.id;
    event.input.name = "Pluga customer updated";
    event.input.phoneNumber = "977777777";
    event.input.email = "email1@pluga.com";

    console.log('event befor update = ', event.input);

    action.handle(plg, event).then((result) => {
      // console.log('customer update result: ', result);  
      expect(result.id).to.eq(customer.id);
      expect(result.description).to.eq("Pluga customer updated");
      expect(result.externalId).to.eq("10");
      
      done();
    }).catch(done);
  })
});

