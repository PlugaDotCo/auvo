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

function buildNotificationObjects(input) {
  input.monitoringNotification = {
    "gpsActivation": input.monitoringNotification.gpsActivation,
    "gpsDisabling": input.monitoringNotification.gpsDisabling,
    "appLogin": input.monitoringNotification.appLogin,
    "appLogout": input.monitoringNotification.appLogout
  };

  delete input.monitoringNotification.gpsActivation;
  delete input.monitoringNotification.gpsDisabling;
  delete input.monitoringNotification.appLogin;
  delete input.monitoringNotification.appLogout;

  input.employeeNotification = {
    "basePointChange": input.employeeNotification.basePointChange
  };

  delete input.employeeNotification.basePointChange;

  input.clientNotification = {
    "adressChange": input.clientNotification.adressChange
  };

  delete input.clientNotification.adressChange;

  input.taskNotification = {
    "checkIn": input.taskNotification.checkIn,
    "checkout": input.taskNotification.checkout,
    "rescheduling": input.taskNotification.rescheduling,
    "travelStart": input.taskNotification.travelStart,
    "researchAnswer": input.taskNotification.researchAnswer,
    "delay": input.taskNotification.delay,
    "taskDelete": input.taskNotification.taskDelete
  };

  delete input.taskNotification.checkIn;
  delete input.taskNotification.checkout;
  delete input.taskNotification.rescheduling;
  delete input.taskNotification.travelStart;
  delete input.taskNotification.researchAnswer;
  delete input.taskNotification.delay;
  delete input.taskNotification.taskDelete;
}

exports.handle = async function (plg, event) {
  const bearer_token = await getBearerToken(plg, event);
  event.auth.accessToken = bearer_token;

  buildNotificationObjects(event.input);
  event.input.gpsFrequency = 300;

   return plg.axios({
      method: 'put',
      url: `${event.meta.baseURI}/users`,
      headers: {
         AUTHORIZATION: `Bearer ${event.auth.accessToken}`
      },
      data:  event.input 
   }).then(res => res.data.result).catch((err) => {
        throw buildError('upsert user', err);
      });
};
