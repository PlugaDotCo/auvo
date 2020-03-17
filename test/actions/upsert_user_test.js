const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../lib/actions/upsert_user');
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
    externalId: "200",
    name: "usuário upsert",
    smartPhoneNumber: "6212365478",
    culture: 'pt-BR',
    jobPosition: "pluga",
    userType: 2,
    password: "1234567",
    workDaysOfWeek: "2, 3, 4, 5, 6",
    startWorkHour: "08:00",
    endWorkHour: "18:00",
    startLunchHour: "12:00",
    endLunchHour: "14:00",
    hourValue: 100.0,
    checkInManual: true,
    address: "rua pluga 1234",
    latitude: 60.0,
    longitude: 80.0,
    openTaskInPlace: true,
    galleryPhotos: true,
    gpsFrequency: 300,
    login: "upsert.pluga",
    email: "upsert.pluga@email.com",
    unavailableForTasks: false,
    editTaskAfterCheckout: true,
    informStartTravel: false,
    changeBasePoint: true,
    monitoringNotification:{
      gpsActivation: 1,
      gpsDisabling: 2,
      appLogin: 3,
      appLogout: 1
    },
    employeeNotification:{
      basePointChange: 1
    },
    clientNotification:{
      AdressChange: 2,
    },
    taskNotification:{
      checkIn: 1,
      checkout: 1,
      rescheduling: 2,
      travelStart: 3,
      researchAnswer: 1,
      delay: 2,
      taskDelete: 3
    }
  }
};

before(async function () {
  event.auth.accessToken = await getBearerAccessToken(plg);
});

describe('Action: Upsert user', function () {
  let user;
  it('returns success when register a new user', function (done) {
    action.handle(plg, event).then((result) => {
      expect(result.userID).to.not.be.null;
      expect(result.name).to.eq(event.input.name);
      
      user = result;
      done();  
    }).catch(done);
  });

  it('returns success when update user', function(done){
    delete event.input.externalId;
    event.input.id = user.userID;
    event.input.name = "usuário updated pluga";
    event.input.workDaysOfWeek = "2, 3, 4, 5";

    action.handle(plg, event).then((result) => {
      expect(result.userID).to.eq(user.userID);
      expect(result.name).to.eq("usuário updated pluga");
      expect(result.externalId).to.eq("200");

      done();
    }).catch(done);
  })
});
