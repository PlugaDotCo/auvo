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


/*Se attachment que vem do meta.json já for uma lista, essa funciotn é desnecessária*/
function parseArrayAttachment(input) {
  if (!input.attachment) 
    return;

  var vetor = [];
  for (var i = 0, l = input.attachment.length; i < l; i++){
    var attachment = { "name": input.attachment[i].name, "file": input.attachment[i].file };
    vetor.push(attachment);
  }

  return vetor;
}

const body = (inputData) => {
  var bodyReturn = {
    "removeAllAttachmentsInsertedByMe": inputData.removeAllAttachmentsInsertedByMe,
    "attachments" : parseArrayAttachment(inputData)
  };

  return bodyReturn;
}

exports.handle = function (plg, event) {
  
   var bodyData = body(event.input);
   
   return plg.axios({
      method: 'put',
      url: `${event.meta.baseURI}/tasks/${event.input.id}/attachments`,
      headers: {
         AUTHORIZATION: `Bearer ${event.auth.accessToken}`
      },
      data: bodyData 
   }).then(res => res.data).catch((err) => {
        
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
          throw new Error(err);
        }
      });
};
