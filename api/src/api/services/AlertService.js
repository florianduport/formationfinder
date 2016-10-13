/**
 * Created by dionis on 8/26/2016.
 */
module.exports = {

  createAlertIsFull: function (nameformation, textParm , callback ) {

    var nameFormation = nameformation;

    typeIsFull = "Formation_Full"

    if (!nameFormation || nameFormation == "")
      callback({response: "ERROR", message: "Not defined Formation´s name"}, null)

    FormationCenter.findOne({name: nameFormation}).exec(function (err, resultObject) {
      if (err) {
        callback({response: "ERROR", message: err.message}, null)
      }

      if (typeof resultObject == "undefined")
        callback({response: "ERROR", message: "Not exist Formation´s name"}, null)

      var text = textParm

      if (!text || text == "")
        callback({response: "ERROR", message: "Not defined text parameter"}, null)

      currentTime = new Date()
      objectToUpdate = {
        text: text,
        type: typeIsFull,
        formationCenter: resultObject.id,
        date: currentTime,
        timestamp :currentTime.getTime()
      }

      Alert.create(objectToUpdate).exec(function (err, resultUpdate) {
        if (err) {
          callback({response: "ERROR", message: err.message}, null)
        }

        ///Send Mail to formation Center
        mailSubjet = "Formation is full";

      //  console.log("INIT SERVICES SEND MAIL")
        FormationCenterServices.sendAlertMailToFormationCenter(resultUpdate.type, text, resultObject, mailSubjet, function (err, result){

          responseObject = { mailresponse:result.response, result:resultUpdate}
        //  console.log("AlertService",resultUpdate )
          callback(null,{response: "OK", responseObject})

        })



      })
    })
  },

  createAlertCustomerBooked: function (nameformation, textParm, callback) {

    var nameFormation = nameformation;

    typeIsFull = 'New_Costumer'

    if (!nameFormation || nameFormation == "")
      callback({response: "ERROR", message: "Not defined Formation´s name"})

    FormationCenter.findOne({name: nameFormation}).exec(function (err, resultObject) {
      if (err) {
        callback({response: "ERROR", message: err.message}, null)
      }

      if (typeof resultObject == "undefined")
        callback({response: "ERROR", message: "Not exist Formation´s name"}, null)

      var text = textParm;

      if (!text || text == "")
        callback({response: "ERROR", message: "Not defined text parameter"}, null)

      currentTime = new Date()
      objectToUpdate = {
        text: text,
        type: typeIsFull,
        formationCenter: resultObject.id,
        date: currentTime,
        timestamp:currentTime.getTime()
      }

      Alert.create(objectToUpdate).exec(function (err, resultUpdate) {
        if (err) {
          callback({response: "ERROR", message: err.message}, null)
        }

        ///Send Mail to formation Center
        mailSubjet = "A client has booked a formation";
        FormationCenterServices.sendAlertMailToFormationCenter(resultUpdate.type, text, resultObject, mailSubjet, function (err, result) {
          responseObject  = { mailresponse:result.response, result: resultUpdate}
          callback(null, {response: "OK", responseObject})
        })
      })
    })
  }
}
