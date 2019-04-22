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

const jsonPatch = (inputData) => {
  var vetor = [];
    if (inputData.priority)
    {
      vetor.push({"op" : "replace", "path" : "priority", "value" : inputData.priority});
    }
    
    if (inputData.orientation)
    {
      vetor.push({"op" : "replace", "path" : "orientation", "value" : inputData.orientation});
    }
 
    if (inputData.taskDate){
      vetor.push({"op" : "replace", "path" : "taskDate", "value" : inputData.taskDate});
    }
  
    if (inputData.idUserTo){
      vetor.push({"op" : "replace", "path" : "idUserTo", "value" : inputData.idUserTo});
    }
    
    if (inputData.longitude){
      vetor.push({"op" : "replace", "path" : "Longitude", "value" : inputData.longitude});
    }
    
    if (inputData.questionnaireId){
      vetor.push({"op" : "replace", "path" : "questionnaireId", "value" : inputData.questionnaireId});
    }
    
    if (inputData.idUserFrom){
      vetor.push({"op" : "replace", "path" : "idUserFrom", "value" : inputData.idUserFrom});
    }
    
    if (inputData.keyWords){
      vetor.push({"op" : "replace", "path" : "keyWords", "value" : inputData.keyWords});
    }

    if (inputData.teamId){
      vetor.push({"op" : "replace", "path" : "teamId", "value" : inputData.teamId});
    }
    
    if (inputData.externalId){
      vetor.push({"op" : "replace", "path" : "externalId", "value" : inputData.externalId});
    }
    
    if (inputData.checkinType){
      vetor.push({"op" : "replace", "path" : "checkinType", "value" : inputData.checkinType});
    }
    
    if (inputData.latitude){
      vetor.push({"op" : "replace", "path" : "Latitude", "value" : inputData.latitude});
    }
    
    if (inputData.taskType){
      vetor.push({"op" : "replace", "path" : "taskType", "value" : inputData.taskType});
    }
    
    if (inputData.customerId){
      vetor.push({"op" : "replace", "path" : "customerId", "value" : inputData.customerId});
    }
    
    if (inputData.address){
      vetor.push({"op" : "replace", "path" : "address", "value" : inputData.address});
    }

    if (inputData.sendSatisfactionSurvey){
      vetor.push({"op" : "replace", "path" : "sendSatisfactionSurvey", "value" : inputData.sendSatisfactionSurvey});
    }
    
    return vetor;
}


exports.handle = function (plg, event) {
  
   return plg.axios({
      method: 'patch',
      url: `${event.meta.baseURI}/tasks/${event.input.id}`,
      headers: {
         AUTHORIZATION: `Bearer ${event.auth.accessToken}`
      },
      data:  jsonPatch(event.input) 
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
