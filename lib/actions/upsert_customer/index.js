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

const arrayFields = ['phoneNumber', 'email', 'groupsId', 'managersTeam', 'managersId'];

const parseStringToArray = (input, arrayMaps = arrayFields) => {
  for (let i = 0; i < arrayMaps.length; i++) {
    let map = arrayMaps[i]
    
    if (typeof(input[map]) === 'string') {
      console.log('map =', map);
      console.log('before input[map] =', input[map]);
      input[map] = input[map].indexOf(',') != -1 ? 
                   input[map].split(",") : input[map].split(" ");
    }
    else {
      input[map] = [];
    }
  }
}

exports.handle = async function (plg, event) {
  parseStringToArray(event.input);

  return plg.axios({
    method: 'put',
    url: `${event.meta.baseURI}/customers`,
    headers: {
      Authorization: `Bearer ${event.auth.accessToken}`
    },
    data:  event.input 
  }).then(res => res.data.result).catch((err) => {
        throw buildError('upsert customer', err);
    });
};