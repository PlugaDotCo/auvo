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


function parseStringToArray(input) {
  if (input.phoneNumber) {
    input.phoneNumber = input.phoneNumber.split(",");
  }

  if (input.email) {
    input.email = input.email.split(",");
  }
}

exports.handle = function (plg, event) {
  
  parseStringToArray(event.input);

   return plg.axios({
      method: 'put',
      url: `${event.meta.baseURI}/customers`,
      headers: {
         AUTHORIZATION: `Bearer ${event.auth.accessToken}`
      },
      data:  event.input 
   }).then(res => res.data.result).catch((err) => {
        throw new Error(err);
      });
};
