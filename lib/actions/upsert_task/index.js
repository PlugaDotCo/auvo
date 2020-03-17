/**
 * Action handler
 *
 * @param {object} plg - Pluga developer platform toolbox.
 * @param {object} plg.axios - [axios](https://github.com/axios/axios)
 *
 * @param {object} event - Event bundle to handle.
 * @param {object} event.meta - Pluga event meta data.
 * @param {string} event.meta.baseURI - Environment base URI.
 * @param {object} event.auth - Your app.json auth fields.
 * @param {object} event.input - Your meta.json fields.
 *
 * @returns {Promise} Promise object represents the action result.
 */

const buildError = require('../../shared/buildError');
const parseStringToArray = require('../../shared/stringToArray');

const arrayFields = ['attachments', 'keyWords']

//ver direitinho como passar isso no meta e pro usuario inputar esses dados;
function parseArrayAttachment(input) {
  if (!input.attachments) {
    delete input.attachments;
    return;
  }

  let vetor = [];
  for (var i = 0; i < input.attachments.length; i++){
    let attachment = { "name": input.attachments[i].split('/')[0], "file": input.attachments[i].split('/')[1] };
    vetor.push(attachment);
  }

  input.attachments = vetor;
}

exports.handle = function (plg, event) {
  parseStringToArray(event.input, arrayFields);
  parseArrayAttachment(event.input);

   return plg.axios({
      method: 'put',
      url: `${event.meta.baseURI}/tasks`,
      headers: {
         AUTHORIZATION: `Bearer ${event.auth.accessToken}`
      },
      data:  event.input 
   }).then(res => res.data.result).catch((err) => {
        throw buildError('upsert task', err);
      });
};
