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

const encoded = (inputData) => {
  var json = {
    'status': inputData.status,
    'startDate': inputData.startDate,
    'endDate': inputData.endDate,
    'orientation': inputData.orientation,
    'tags': inputData.tags,
    'idUserTo': inputData.idUserTo,
    'customerId': inputData.customerId,
    'priority': inputData.priority,
    'teamId': inputData.teamId,
    'taskId': inputData.taskId,
    'type': inputData.type,
    'customerGroupId': inputData.customerGroupId
  }

  fields = encodeURIComponent(JSON.stringify(json));
  return fields;
};

exports.handle = function (plg, event) {
  
   return plg.axios({
      method: 'get',
      url: `${event.meta.baseURI}/tasks/`,
      headers: {
         AUTHORIZATION: `Bearer ${event.auth.accessToken}`
      },
      params: {
         paramFilter: encoded(event.input) || null,
         page: event.input.page,
         pageSize: event.input.pageSize,
         order: event.input.order,
         selectfields: event.input.selectfields
      }
   }).then(res => 
      {
        if(res.data)
          return res.data

      }).catch((err) => {
        
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
