const plg = require('pluga-plg');
const expect = require('chai').expect;

const action = require('../../../lib/actions/Task/editTaskAttachments');

const event = {
  meta: {
    baseURI: process.env.baseURI
  },
  auth: {
    accessToken: process.env.ACCESS_TOKEN
  },
  input: {
    'id': 3076434,
    'removeAllAttachmentsInsertedByMe': true,
    "attachment":[
      {
        "name": "fileNamePluga.txt",
        "file": "dGVzdGUgcGx1Z2E="
      },
            {
        "name": "fileNamePluga2.txt",
        "file": "dGVzdGUgcGx1Z2EgMg=="
      }
   ],
  }
};

  describe('Action: Edit task attachments', function () {
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

