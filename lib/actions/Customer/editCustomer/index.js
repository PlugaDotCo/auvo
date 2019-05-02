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
    if (inputData.name)
    {
      vetor.push({"op" : "replace", "path" : "name", "value" : inputData.name});
    }
    
    if (inputData.externalId)
    {
      vetor.push({"op" : "replace", "path" : "externalId", "value" : inputData.externalId});
    }
 
    if (inputData.phoneNumber){
      vetor.push({"op" : "replace", "path" : "phoneNumber", "value" : inputData.phoneNumber});
    }
  
    if (inputData.email){
      vetor.push({"op" : "replace", "path" : "email", "value" : inputData.email});
    }
    
    if (inputData.manager){
      vetor.push({"op" : "replace", "path" : "manager", "value" : inputData.manager});
    }
    
    if (inputData.managerJobPosition){
      vetor.push({"op" : "replace", "path" : "managerJobPosition", "value" : inputData.managerJobPosition});
    }
    
    if (inputData.note){
      vetor.push({"op" : "replace", "path" : "note", "value" : inputData.note});
    }
    
    if (inputData.address){
      vetor.push({"op" : "replace", "path" : "address", "value" : inputData.address});
    }

    if (inputData.latitude){
      vetor.push({"op" : "replace", "path" : "latitude", "value" : inputData.latitude});
    }

    if (inputData.longitude){
      vetor.push({"op" : "replace", "path" : "longitude", "value" : inputData.longitude});
    }
    
    if (inputData.maximumVisitTime){
      vetor.push({"op" : "replace", "path" : "maximumVisitTime", "value" : inputData.maximumVisitTime});
    }
    
    if (inputData.unitMaximumTime){
      vetor.push({"op" : "replace", "path" : "unitMaximumTime", "value" : inputData.unitMaximumTime});
    }
    
    if (inputData.cpfCnpj){
      vetor.push({"op" : "replace", "path" : "cpfCnpj", "value" : inputData.cpfCnpj});
    } 
    
    if (inputData.groupsId){
      vetor.push({"op" : "replace", "path" : "groupsId", "value" : inputData.groupsId});
    }
    
    if (inputData.managerTeamsId){
      vetor.push({"op" : "replace", "path" : "managerTeamsId", "value" : inputData.managerTeamsId});
    }

    if (inputData.managersId){
      vetor.push({"op" : "replace", "path" : "managersId", "value" : inputData.managersId});
    }

    if (inputData.segmentId){
      vetor.push({"op" : "replace", "path" : "segmentId", "value" : inputData.segmentId});
    }

    if (inputData.active){
      vetor.push({"op" : "replace", "path" : "active", "value" : inputData.active});
    }

    if (inputData.adressComplement){
      vetor.push({"op" : "replace", "path" : "adressComplement", "value" : inputData.adressComplement});
    }
    
    return vetor;
}


exports.handle = function (plg, event) {
  
   return plg.axios({
      method: 'patch',
      url: `${event.meta.baseURI}/customers/${event.input.id}`,
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
