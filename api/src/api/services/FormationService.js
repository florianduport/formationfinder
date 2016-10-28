module.exports = {

  isValidFormationDate: function (formationDate) {
    // body...

    // this function return true if formationDate is like:
    // 	{
    // 		date: "",
    // 		morning: {hourStart: "", hourEnd: ""},
    // 		afternoon: {hourStart: "", hourEnd: ""}
    // 	}
    // otherwise return false.

    var isValid = _.isObject(formationDate) && _.isString(formationDate.date)
      && _.isString(formationDate.morning.hourStart)
      && _.isString(formationDate.morning.hourEnd)
      && _.isString(formationDate.afternoon.hourStart)
      && _.isString(formationDate.afternoon.hourEnd);

    if (isValid === true)
      return true;

    return false;
  },

  isFormationFull: function (formationFounded, callback) {

    if (typeof formationFounded == "undefined"){
      callback({response:"ERROR",message: "Formation undefined"}, null)
      return;
    }
    if (typeof formationFounded.isFull == "undefined"){
      callback({response:"ERROR",message: "Formation undefined"}, null)
      return;
    }
    if (typeof  formationFounded.place == "undefined"){
      callback({response:"ERROR",message: "Formation  have not place defined"}, null)
      return;
    }
    if (formationFounded.isFull == true) {
      ///Create Alert and Send Mail
      alertText = "Formation " +  formationFounded.place.name +" is full "

      console.log("Call from service")
      FormationCenter.findOne({id: formationFounded.formationCenter}).exec(function (err, resultObject) {

        if (err) {
          callback(err, false)
          return;
        }
        console.log("Call from service Alert")
        AlertService.createAlertIsFull(resultObject.name, alertText , function (err, result ) {

          if ( err){
            callback(err, false)
            return;
          }

          console.log("RESPONSE ",result)
          callback(null, result)
          return;
        });
      })
    }
    else {

      console.log("RESPONSE ", {response:"OK" , result:"Not full"})
      callback(null, {response:"OK" , result:"Not full"})
      return;
    }
  },

  costumerBooked: function (formationFounded, customerObject, callback) {

    if (typeof formationFounded == "undefined") {
      callback({message: "Formation undefined"}, null)
      return;
    }

    FormationCenter.findOne({id: formationFounded.formationCenter}).exec(function (err, resultObject) {

      if (err) {
        callback(err, false)
       return;
      }
      alertText = "<h3>" + sails.__("CUSTMOMER_BOOKED_HEAD") + resultObject.name + "</h3><br />"

      if (typeof customerObject != "undefined") {
        alertText += "<h4>" +sails.__("CUSTMOMER_NAME")+ " "+  customerObject.firstName+"</h4><br />"
        alertText += "<h4>" +sails.__("CUSTMOMER_FIRSTNAME")+ " "+  customerObject.name+"</h4><br />"
        alertText += "<h4>" +sails.__("CUSTMOMER_MAIL")+ " "+  customerObject.email+"</h4><br />"
        alertText += "<h4>" +sails.__("CUSTMOMER_PHONE")+ " "+  customerObject.phoneNumber+"</h4><br />"
        alertText += "<h4>" +sails.__("CUSTMOMER_ADRESS")+ " "+  customerObject.address+"</h4><br />"

      }

      console.log( "BOOKED MAIL ", alertText);
      AlertService.createAlertCustomerBooked(resultObject.name, alertText, function (err, result) {
        callback(err, result)
        return;
      });
    })
  },

  createCustomerBill: function (customerObject, formationObject, isPaid, callback) {
    if (typeof customerObject == "undefined") {
      callback({response: "ERROR", message: "Not defined Customer"})
      return;
    }

    if (typeof formationObject == "undefined") {
      callback({response: "ERROR", message: "Not defined Formation"})
      return;
    }

    if (typeof isPaid == "undefined") {
      callback({response: "ERROR", message: "Not defined paid variable"})
      return;
    }

    ////Find Formation Center
    formationCenterId = formationObject.formationCenter

    ////
    objectCustomerBill = {
      billNumber: customerObject.id,
      billState: isPaid,
      formationCenter: formationCenterId,
      customer: customerObject.id,
      date: new Date(),
      amount: formationObject.price
    }

    CustomerBill.create(objectCustomerBill).exec(function (err, resultObject) {
      if (err) {
        callback({response: "ERROR", message: "CustomerBill not created " + err.message}, null)
        return;
      }

      ///If Customer not pay send messaje for  stimulus payment by email
      if (!isPaid) {
        FormationService.sendMailPayStimulus(customerObject, formationObject, function (err, result) {
          if (err) {
            callback(null,{response: "ERROR", message: "Not sended Mail stimulus for Paid"})
            return
          }
          callback(null, {response: "OK", result: result})
          return
        });
      }
      else {
        console.log("End call funtion")
        callback(null, {response: "OK", result: resultObject})
        return;
      }
    });

  },

  sendMailPayStimulus: function (customerObject, formationObject, callback) {
    if (typeof customerObject == "undefined") {
      callback({response: "ERROR", message: "Not defined Customer"})
      return;
    }

    if (typeof formationObject == "undefined") {
      callback({response: "ERROR", message: "Not defined Formation"})
      return;
    }

    Formation.findOne({id:formationObject.id}).populate("place").populate("formationCenter").exec(function (err, formationFounded) {


      subject = "From " + sails.config.globals.configsystem.applicationame + " payment request"
      bodytext = "<p><h3>Dear " + customerObject.name + " :</h3></p>"
      bodytext = bodytext + "<p> We are remenber payment request in your formation </p>"
      bodytext = bodytext + "<p><strong>Address: " + formationFounded.place.address + "</strong></p>"
      bodytext = bodytext + "<p><strong>Formation Center : " + formationFounded.formationCenter.name + "</strong></p>"
      if (formationFounded.formationCenter.email !== undefined && formationFounded.formationCenter.email != "")
       bodytext = bodytext + "<p><strong>Formation email : " + formationFounded.formationCenter.email + "</strong></p>"
      if (formationFounded.formationCenter.phoneNumber !== undefined && formationFounded.formationCenter.phoneNumber != "")
        bodytext = bodytext + "<p><strong>Formation phone number : " + formationFounded.formationCenter.phoneNumber + "</strong></p>"
      bodytext = bodytext + "<p><h4> Dates: " + "</h4></p>"

      dateText = ""

      formationFounded.dates.forEach(function (iFormation, index){
         currentDate = FormationCenterServices.getReadableDate(iFormation.date)
        dateText = dateText   + "<p><strong>" +  currentDate + "</strong></p>"
          if ( typeof iFormation.morning != "undefined" ) {
            dateText = dateText   + "<p> Morning  Start " + iFormation.morning.hourStart + " End " + iFormation.morning.hourEnd + "</p>"
          }

          if ( typeof iFormation.afternoon != "undefined" ) {
            dateText = dateText   + "<p>  Afternoon Start " + iFormation.afternoon.hourStart + " End " + iFormation.afternoon.hourEnd
          }


      })
      bodytext = bodytext + dateText

      var config = {}
      config = {
        to: customerObject.email,
        subject: subject,
        html: bodytext
      };

     // console.log("Sended Mail to Customer for payment ", config)

      result = EmailService.send(config, function (err, result) {
        ///If not error when send mail
        ///0 Ok, 1 Error, 5 all intent

        console.log("Mail send answer ", result.response)
        if (result.response != "OK") {
          ////Create Log and Alert for formationCenter
          callback( result, null )
          return;
        }
        else {
          callback(null, result)
          return;
        }
      });


    })

  },

  sendMessageToCustomer: function (idStr, from, subject, text, callback){


    if ( idStr === undefined ){
      callback("Undefined formation identifier", null)
      return
    }

    if ( from === undefined ){
      callback("Undefined from email", null)
      return
    }

    if ( text === undefined ){
      callback("Undefined email text", null)
      return
    }

    Formation.findOne({id:idStr}).populate('customers').exec(function (err, formationObject){
      if (err) {
        callback("Error in search formation", null)
        return;
      }

      if (formationObject === undefined){
        callback("Error in search formation", null)
        return;
      }

      if (formationObject.customers === undefined || formationObject.customers.length == 0 ){
        callback("Error in search formation, not exist customer in formation", null)
        return;
      }

      bodytext = "<p><strong>" +  text + "</strong></p>"
      formationObject.customers.forEach(function (iCustomer, index){

        var config = {}
        config = {
          to: iCustomer.email,
          from:from,
          subject: subject,
          html: bodytext
        };

        result = EmailService.send(config, function (err, result) {
          ///If not error when send mail
          ///0 Ok, 1 Error, 5 all intent

          console.log("Mail send answer ", result.response)
          //if (result.response != "OK") {
          //  ////Create Log and Alert for formationCenter
          //  callback( result, null )
          //  return;
          //}
          //else {
          //  callback(null, result)
          //  return;
          //}
        });
      })

      callback(null, "OK")
      return
    });
  }

};
