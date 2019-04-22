const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../../lib/actions/task/getTaskById');

const event = {
  meta: {
    baseURI: process.env.BASE_URI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
   "id":3076434,
  }
};

  describe('Action: Get task by id', function () {
  it('returns success with valid task - teste -', function (done) {

    plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/login`,
      params: { ApiKey: process.env.ApiKey, apiToken: process.env.apiToken }
    }).then((res) => {
      event.auth.accessToken = res.data.result.accessToken;
      
      return action.handle(plg, event).then((task) => {
        
       expect(task.result.taskID).to.not.be.null;
       expect(task.result.taskID).to.eq(event.input.id);
       
       done();
     });
    }).catch(done);
  });
});

