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

const arrayFields = ['phoneNumber', 'email', 'groupsId', 'managersTeam', 'managersId', 'attachments'];

exports.handle = function (plg, event) {
  parseStringToArray(event.input, arrayFields);

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
