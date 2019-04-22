const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../../lib/actions/Task/getTaskByFilter');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
    'startDate': '2010-02-16T19:00:00',
    'endDate': '2019-01-16T19:00:00',
    'page': 1,
    'pageSize': 10,
    'order': '0',
    'selectfields': 'externalId, idUserFrom, idUserTo, creationDate'
  }
};

  describe('Action: Get task by filter', function () {
  it('returns success with valid task - teste -', function (done) {

    plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/login`,
      params: { ApiKey: process.env.ApiKey, apiToken: process.env.apiToken }
    }).then((res) => {
      event.auth.accessToken = res.data.result.accessToken;
      
      return action.handle(plg, event).then((task) => {
        
        console.log('task result: ' +JSON.stringify(task.result));

        expect(task.result.taskID).to.not.be.null;
        expect(task.result.taskID).to.eq(event.input.id);
       
        done();
     });
    }).catch(done);
  });
});

