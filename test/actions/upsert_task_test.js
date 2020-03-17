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
   orientation: "orientation",
   taskDate: "2019-03-26T14:00:00",
   sendSatisfactionSurvey: false,
   priority: "1",
   externalId: "7",
   longitude: "85",
   latitude: "85",
   address: "rua rua 123",
   checkinType: "1",
   attachments: "fileNamePluga.txt/dGVzdGUgcGx1Z2E=, fileNamePluga2.txt/dGVzdGUgcGx1Z2EgMg==",
   keyWords: "1792, 9254"
  }
};

before(async function () {
  event.auth.accessToken = await getBearerAccessToken(plg);
});

describe('Action: Upsert task', function () {
  let task;
  it('returns success when register a new task', function (done) {
    action.handle(plg, event).then((result) => {  
      // console.log('result =', result);
      expect(result.taskID).to.not.be.null;
      expect(result.orientation).to.eq(event.input.orientation);
      
      task = result;
      done();
    }).catch(done);
  });

  it('returns success when update task', function(done){
    delete event.input.externalId;
    event.input.idUserFrom = task.idUserFrom
    event.input.idUserTo = task.idUserTo
    event.input.id = task.taskID;
    event.input.orientation = "orientation update";

    action.handle(plg, event).then((result) => {
      expect(result.taskID).to.eq(task.taskID);
      expect(result.orientation).to.eq(event.input.orientation);
      expect(result.externalId).to.eq("7");
      expect(result.idUserFrom).to.eq(task.idUserFrom);

      done();
    }).catch(done);
  }); 
});
