const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../lib/actions/upsert_customer');
const { getBearerAccessToken } = require('../test_helper');

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
    phoneNumber: "988888888, 97 777 77 7 7",
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
    //groupsId: '', // valores invalidos //verificar como o meta ta enviando isso
    //managerTeamsId: [],
    // managersId: '12080, 12111',
    // segmentId: 1096, //quando não existe volta com err.response.data = "" - tratar isso
    active: true,
    adressComplement: "copacabana"
  }
};

before(async function () {
  event.auth.accessToken = await getBearerAccessToken(plg);
});

describe('Action: Upsert customer', function () {
  let customer;
  it('returns success with valid new customer', function (done) {
    action.handle(plg, event).then((result) => {
      expect(result.id).to.not.be.null;
      expect(result.externalId).to.eq(event.input.externalId);
      expect(result.phoneNumber[1]).to.eq("977777777");
      expect(result.email[0]).to.eq(event.input.email[0]);
      
      customer = result;
      // console.log(customer);
      done();
    }).catch(done);
  });

  it('returns success when update customer', function (done) {
    delete event.input.externalId;
    event.input.id = customer.id;
    event.input.name = "Pluga customer updated";
    event.input.phoneNumber = "97 7777 777";
    event.input.email = "email1@pluga.com";

    action.handle(plg, event).then((result) => {
      expect(result.id).to.eq(customer.id);
      expect(result.description).to.eq(event.input.name);
      expect(result.externalId).to.eq("10");
      expect(result.phoneNumber[0]).to.eq(event.input.phoneNumber[0]);
      expect(result.email[0]).to.eq(event.input.email[0]);
      
      done();
    }).catch(done);
  })
});

