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

const getBearerToken = require('../../shared/getBearerToken');
const buildError = require('../../shared/buildError');

/*Se attachment que vem do meta.json já for uma lista, essa funciotn é desnecessária*/
function parseArrayAttachment(input) {
  if (!input.attachment) {
    delete input.attachment;
    return;
  }

  var vetor = [];
  for (var i = 0, l = input.attachment.length; i < l; i++){
    var attachment = { "name": input.attachment[i].name, "file": input.attachment[i].file };
    vetor.push(attachment);
  }

  input.attachments = vetor;
  delete input.attachment;
}

exports.handle = async function (plg, event) {
  const bearer_token = await getBearerToken(plg, event);
  event.auth.accessToken = bearer_token;

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
