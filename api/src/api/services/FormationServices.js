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

    if (typeof formationFounded == "undefined")
      callback({response:"ERROR",message: "Formation undefined"}, null)

    if (typeof formationFounded.isFull == "undefined")
      callback({response:"ERROR",message: "Formation undefined"}, null)

    if (typeof  formationFounded.place == "undefined")
      callback({response:"ERROR",message: "Formation  have not place defined"}, null)

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
        });
      })


      return;
    }

    if ((formationFounded.customers.length + 1) > formationFounded.maxPeople) {
      if (typeof formationFounded.id != "undefined") {
        Formation.update({id: formationFounded.id}, {isFull: true}).exec(function (err, formationObject) {
          if (err)
            console.log("ERROR ", err.message)
        })


        FormationCenter.findOne({id: formationFounded.formationCenter}).exec(function (err, resultObject) {

          if (err)
            callback(err, null)
          AlertService.createAlertIsFull(resultObject.name, alertText, function (err, result) {
            callback(err, result)
          });
          console.log("RESPONSE ",result)
          callback(null, result)
        })



        return
      }
    }
    console.log("RESPONSE ", {response:"OK" , result:"Not full"})
    callback(null, {response:"OK" , result:"Not full"})
    return;
  },


  costumerBooked: function (formationFounded, callback) {

    if (typeof formationFounded == "undefined")
      callback({message: "Formation undefined"}, null)

    alertText = "A client has booked to formation " + formationFounded.name
    FormationCenter.findOne({id: formationFounded.formationCenter}).exec(function (err, resultObject) {

      if (err)
        callback(err, false)

      AlertService.createAlertCustomerBooked(resultObject.name, alertText, function (err, result) {
        callback(err, result)
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
      if (err)
        callback({response: "ERROR", message: "CustomerBill not created " + err.message}, null)

      ///If Customer not pay send messaje for  stimulus payment by email
      if (!isPaid) {
        FormationServices.sendMailPayStimulus(customerObject, formationObject, function (err, result) {
          if (err) {
            callback({response: "ERROR", message: "Not sended Mail stimulus for Paid"})
          }
          callback(null, {response: "OK", result: result})
          return
        });
      }

      callback(null, {response: "OK", result: resultObject})
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

    Formation.findOne({id:formationObject.id}).populate("place").exec(function (err, formationFounded) {

      subject = "From " + sails.config.globals.configsystem.applicationame + " payment request"
      bodytext = "<p><h5>Dear " + customerObject.name + " :</h5></p>"
      bodytext = bodytext + "<p> We are remenber payment request in your formation </p>"
      bodytext = bodytext + "<p>Adress: " + formationFounded.place.address + "</p>"
      bodytext = bodytext + "<p> Dates: " + "</p>"

      dateText = ""

      formationFounded.dates.forEach(function (iFormation, index){
         currentDate = FormationCenterServices.getReadableDate(iFormation.date)
        dateText = dateText   + "<p><strong>" +  currentDate + "</strong></p>"
          if ( typeof iFormation.morning != "undefined" ) {
            dateText = dateText   + "<p> Morning  hour start " + iFormation.morning.hourStart + " hour end " + iFormation.morning.hourEnd + "</p>"
          }

          if ( typeof iFormation.afternoon != "undefined" ) {
            dateText = dateText   + "<p>  Afternoon  hour start " + iFormation.afternoon.hourStart + " hour end " + iFormation.afternoon.hourEnd
          }


      })
      bodytext = bodytext + dateText

      var config = {}
      config = {
        to: customerObject.email,
        subject: subject,
        html: bodytext
      };

      console.log("Sended Mail to Customer for payment ", config)

      result = EmailService.send(config, function (err, result) {
        ///If not error when send mail
        ///0 Ok, 1 Error, 5 all intent

        console.log("Mail send answer ", result.response)
        if (result.response != "OK") {
          ////Create Log and Alert for formationCenter
          callback( result, null )
          return;
        }
        callback( null, result)
      });


    })

  }


};
