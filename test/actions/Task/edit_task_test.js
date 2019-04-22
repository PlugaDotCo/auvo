const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../../lib/actions/Task/editTask');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
    'orientation': 'orientation pluga',
    'externalId': '6',
    'checkinType': 1,
    'id': 3076434
  }
};

  describe('Action: Edit task', function () {
  it('returns success with valid task - teste -', function (done) {

    plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/login`,
      params: { apiKey: process.env.apiKey, apiToken: process.env.apiToken }
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

