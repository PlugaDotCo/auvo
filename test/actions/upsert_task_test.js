const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../lib/actions/upsert_task');
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
    // externalId: "7",
    // idUserFrom: 
    taskDate: "2019-03-27T14:00:00",
    latitude: "85.3",
    longitude: "85.3",
    address: "rua rua 1234",
    orientation: "orientation", 
    priority: "2",
    checkinType: "3",
    keyWords: "1792, 9254",
    sendSatisfactionSurvey: false,
    customer: {
      name: "Pluga Task customer",
    },
    user: {
      userID: 57951,
      name: "usuário upsert",
      smartPhoneNumber: "63312365478",
      culture: 'pt-BR',
      jobPosition: "pluga",
      userType: 2,
      password: "1234567",
      login: "upsert2.task..pluga",
      email: "upsert.pluga@email.com",
    }
  }
};

before(async function () {
  event.auth.accessToken = await getBearerAccessToken(plg);
});

describe('Action: Upsert task', function () {
  let task;
  it('returns success when register a new task', function (done) {
    action.handle(plg, event).then((result) => {
      // console.log('result insert =', result);  
      expect(result.taskID).to.not.be.null;
      expect(result.orientation).to.eq(event.input.orientation);
      
      task = result;
      done();
    }).catch(done);
  });

  it('returns success when update task', function(done){
    // delete event.input.externalId;
    event.input.idUserFrom = task.idUserFrom
    event.input.idUserTo = task.idUserTo
    event.input.id = task.taskID;
    event.input.orientation = "orientation update";

    //update customer
    event.input.customer.id = ""
    event.input.customer.phoneNumber = "966666666, 999999997";
    event.input.customer.email = "taskemail1@pluga.com, taskemail2@pluga.com";
    event.input.customer.manager = "Pluga managers name";
    event.input.customer.managerJobPosition = "Pluga director";
    event.input.customer.note = "Something written here";
    event.input.customer.address = "adress pluga Rio";
    event.input.customer.latitude = -22.9686807;
    event.input.customer.longitude = -43.1842243;
    event.input.customer.maximumVisitTime = 1;
    event.input.customer.unitMaximumTime = 3;
    event.input.customer.cpfCnpj = "71728976090";
    event.input.customer.active = true;
    event.input.customer.adressComplement = "copacabana";

    //update user
    event.input.user.id = 57961,
    event.input.user.address = "rua pluga 1234";
    event.input.user.latitude = 60.0;
    event.input.user.longitude = 80.0,
    event.input.user.openTaskInPlace = true,
    event.input.user.galleryPhotos = true,
    event.input.user.gpsFrequency = 300,
    event.input.user.workDaysOfWeek = "2, 3, 4, 5, 6";

    action.handle(plg, event).then((result) => {
      // console.log('result update =', result);
      expect(result.taskID).to.eq(task.taskID);
      expect(result.orientation).to.eq(event.input.orientation);
      // expect(result.externalId).to.eq("7");
      expect(result.idUserFrom).to.eq(task.idUserFrom);

      done();
    }).catch(done);
  }); 
});
