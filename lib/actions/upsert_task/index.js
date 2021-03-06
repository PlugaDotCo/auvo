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

const taskArrayFields = ['keyWords']
const userArrayFields = ['workDaysOfWeek'];
const customerArrayFields = ['phoneNumber', 'email', 'groupsId', 'managersTeam', 'managersId'];

const userRequiredFields = [ 'name', 'smartPhoneNumber', 'culture', 'jobPosition', 'login', 'email' ]

const requiredFieldsOk = (input, requiredMaps) => {
   for (let i = 0; i < requiredMaps.length; i++) {
     let map = requiredMaps[i] 
     if (typeof(input[map]) === ('undefined')) {
       return `${map} is required.`
     }
   }
   return null;
 }

const getCustomerId = (plg, event) => {
   let { customer } = event.input;

   if(!customer.name) return null;
   parseStringToArray(customer, customerArrayFields);

   return plg.axios({
      method: 'put',
      url: `${event.meta.baseURI}/customers`,
      headers: {
        Authorization: `Bearer ${event.auth.accessToken}`
      },
      data: customer
   }).then(res => res.data.result.id).catch((err) => {
         throw buildError('upsert customer', err);
   });
}

const getUserId = (plg, event) => {
   let { user } = event.input;

   const errorMessage = requiredFieldsOk(user, userRequiredFields)
   if (errorMessage) return errorMessage;
   parseStringToArray(user, userArrayFields);

   return plg.axios({
      method: 'put',
      url: `${event.meta.baseURI}/users`,
      headers: {
         AUTHORIZATION: `Bearer ${event.auth.accessToken}`
      },
      data: user 
   }).then(res => res.data.result.userID)
     .catch((err) => {
         throw buildError('upsert user', err);
     });
}

// na criação da task o endereço do cliente precisa ser obrigatório.
exports.handle = async function (plg, event) {

   if(event.input.customer){
      const customerId = event.input.customerId || null;

      if (customerId != null) {
         event.input.customer.id = customerId
         delete event.input.address;
      };

      console.log('id =', event.input.customer.id);
      event.input.customerId = await getCustomerId(plg, event);
      console.log(event.input.customerId);
      // delete event.input.customer;
   }
   
   // const userId = await getUserId(plg, event);
   // console.log

   // event.input.idUserFrom = userId
   
   delete event.input.user;
   console.log('event.input =', event.input);
   parseStringToArray(event.input, taskArrayFields);

   return plg.axios({
      method: 'put',
      url: `${event.meta.baseURI}/tasks`,
      headers: {
         AUTHORIZATION: `Bearer ${event.auth.accessToken}`
      },
      data:  event.input 
   }).then(res => res.data.result).catch((err) => {
         // console.log('erro =', err.response.data);
        throw buildError('upsert task', err);
      });
};
