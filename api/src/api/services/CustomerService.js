/**
 * Created by dionis on 6/22/2016.
 */
module.exports = {

  getReadableDate: function (dateParmt) {
    weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Friday", "Saturday"]
    value = new Date(dateParmt);
    resultDate = weekDay[value.getDay()] + ": " + value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear();

    return resultDate

  },

  searchbyclosedformation: function (callbackFunction) {
    //localhost:1337/Formationcenter/create?name=Paris"&adress="rue 15"&zipCode=21231&city="Paris"&email="dionis@uo.edu.cu"&phoneNumber="02131231231"

    //http://localhost:1337/Place/create?formationCenter=57655462ca27cbd00fbfe3f0&name=Paris_Place%22&adress=%22rue%2015%22&zipCode=21231&isActived=true&agreementNumber=344&agreementName=02131231231
    //http://localhost:1337/Place/create?formationCenter=57655462ca27cbd00fbfe3f0&name=Paris_Plac3e%22&adress=%22rue%2015%20tres%20prochain%20%20le%20chateau%20Martin%22&zipCode=61231&isActived=true&agreementNumber=34&agreementName=02131231231

    //http://localhost:1337/Formation/create?formationCenter=57655462ca27cbd00fbfe3f0&maxPeople=50&price=120.50&isConfirmed=true&isFull=false&place=57655564ca27cbd00fbfe3f2

    //http://localhost:1337/Customer/create?formationCenter=57655462ca27cbd00fbfe3f0&formation=576556a6ca27cbd00fbfe3f4&name=Frolian&firstName=Dupont&birthDate=%225/1/1984%22&birthCity=%22Bordeux%22&address=%22Rue%2045%22&zipCode=567894&emailsend=0&city=%22Bordeaux%22&phoneNumber=%224566787%22&email=dionis@localhost.com
    //http://localhost:1337/Customer/create?formationCenter=57655462ca27cbd00fbfe3f0&formation=5765567fca27cbd00fbfe3f3&name=Dionis&firstName=Duponte&birthDate=%225/1/1984%22&birthCity=%22Bordeux%22&address=%22Rue%2045%22&zipCode=567894&emailsend=0&city=%22Bordeaux%22&phoneNumber=%224566787%22&email=jolbert@localhost.com


    //

    console.log("Internacionalization ",  sails.__('DEAR'))
    var resultFormation = [];
    var date = new Date();

    ///add 5 hours
    var units = 5;
    date.setHours(date.getHours() + units);
    date = new Date(date);
    ///Search all costumer who not sended initcoursesmail

    formationsArray = []
    placeFormationArray = []
    console.log("Date to compare ", date)

    sendnotify = 5
    //
    Formation.find({"dates.date": {"lte": date}}).populate('customers').populate("place").exec(function (err, resultArray) {
      // console.log("Formation results ", resultArray.length)
      for (iTrForm in resultArray) {
        formation = resultArray[iTrForm]
        // console.log("Update data customer ", formation)
       if (typeof formation.customers != "undefined" && formation.customers.length > 0) {
          for (iTr in formation.customers) {

            iCustomer = formation.customers[iTr]
            if (iCustomer.emailsend < sendnotify) {
              //  console.log("Update data customer ", iCustomer)
              console.log("Copy value to send request")
              objectResult = {};
              objectResult.id = iCustomer.id
              objectResult.formationcenterid = iCustomer.formationCenter

              objectResult.costumername = iCustomer.name
              objectResult.email = iCustomer.email
              objectResult.date = formation.dates[0].date
              iPlace = formation.place
              if (typeof  iPlace != "undefined") {
                objectResult.placeid = iPlace.place
                objectResult.place = iPlace;
                objectResult.placename = iPlace.name
                objectResult.address = iPlace.address
                resultFormation.push(objectResult);
              }
              else
                console.log("Undefined place for formation ", formation.place)
            }
            else {
              //console.log("Sended all oportunity " , iCustomer)
              console.log("Sended all oportunity " , iCustomer.emailsend)
            }
          }
        }
     }
      //console.log("Verify formation for send Mail ", resultFormation.length)
      callbackFunction(resultFormation)
    })


    /*
     .then( function (placeFormationArray) {
     console.log("El lugar");
     //console.log(Place);
     for (iFormationPlace in  placeFormationArray)
     var object = PlaceFormationArray[iFormationPlace]
     if (object) {

     resultFormation.push({
     costumerid: Customer.id,
     name: object.formation.name,
     adress: object.place.address,
     starteddate: object.formation.createdAt,
     email: Customer.email
     })
     console.log(resultFormation)
     }
     return;
     })
     .then( function () {
     console.log("........................")
     console.log(resultFormation)
     return {
     formations: resultFormation
     }

     })
     .catch (function userFounded( err) {
     if (err)
     return next(err);
     })
     */


  },
  ///Update al costumer id with send mailed result
  ///parameter is Array with object { idcostumer, sendmailed} result
  updatemailnotify: function (costumerArray) {
    ////Para cada elemento del arreglo  actualizar en la base de datoss

    async.forEach(costumerArray, function (CustomerObject, callback) {
      // if any of the saves produced an error, err would equal that error

      console.log("------Usuario-------")
      console.log(CustomerObject)


      ///, {"createdAt" : { '<': date}}
      CustomerObject.update({"id": CustomerObject.costumerid}, {mailsended: CustomerObject.mailstatus}).exec(function CostumerUpdateFounded(err, Customer) {

        for (iTr in Customer) {
          formationsArray.push()
          objectResult = Customer[iTr]
          console.log("--- Actualizando usuario ---");
          console.log("--- nombre : " + objectResult.name);
          console.log("--- correo : " + objectResult.email);
        }
        //console.log(formation)
        callback();
      })
    }, function (err) {
      if (err)
        return next(err);
      console.log("------- Final de instrucciones ---------- ")

      //callback();
      return "OK"

    });
  },
  isValidCustomerData: function (data) {
    // body...
    var isValid = _.isObject(data) && _.isString(data.name)
      && _.isString(data.firstName)
      && _.isString(data.phoneNumber)
      && _.isString(data.email)
      && _.isObject(data.driverLicence)
      && _.isString(data.driverLicence.number)
      && _.isString(data.driverLicence.placeOfDeliverance);

    console.log("En la comprobacion isValid es: " + isValid);

    return (isValid === true);

  },

  sendMailToCostumer: function (customerData, callback) {

    var iResultCostumerUpdate = {}

    if (typeof customerData == "undefined") {
      console.log("Not data about Customer")
      callback(iResultCostumerUpdate)
    }
    else {
      Customer.findOne({id: customerData.id}).populate("formationCenter").exec(function (err, resultObject) {

        if (err) {
          iResultCostumerUpdate.err = err.message
          callback(iResultCostumerUpdate)
        }

        if (typeof resultObject == "undefined") {
          callback(iResultCostumerUpdate)
        }

        iResultCostumerUpdate.costumerid = customerData.id
        if (customerData.email) {
          ///Update all costumer like the started formation´s mail will send


          ////If exist send Mail with text
          ///Your course estarted at   in
          ///and GMail link with extact adress
          var initDate = customerData.date
          var mailSubjet = "Alert Formation almost started  ";

          ///Set systemurladdress in Configuration collection

          ///INTERNACIONALIZATION
          var mailHtmlBody = "<b><h4><a hrf=\"" + sails.config.globals.configsystem.systemurladdress + "\">Formationfinder</a> notify :</h4></b><br />"
          mailHtmlBody += "<b><h3> Formation in address " + customerData.address + " almost started at " + CustomerService.getReadableDate(initDate) + "</h3></b><br />"
          mailHtmlBody += "<b>Formation Center : " + resultObject.formationCenter.name + "</b><br />"
          mailHtmlBody += "<b>Formation Center (phone number): " + resultObject.formationCenter.phoneNumber + "</b><br />"
          mailHtmlBody += "<b>Formation Center (email): " + resultObject.formationCenter.email + "</b><br />"

          var config = {}
          config = {
            to: customerData.email,
            subject: mailSubjet,
            html: mailHtmlBody
          };

          config.costumerid = customerData.id;

          // console.log("REGISTERED MAIL ", config)

          result = EmailService.send(config, function (err, result) {
            ///If not error when send mail
            ///0 Ok, 1 Error, 5 all intent
            iResultCostumerUpdate.mailstatus = 5;
            var emailstatus = 5;
            // console.log("Mail send answer ", result.response)
            if (result.response != "OK") {
              Customer.update({id: customerData.id}, {emailsend: (resultObject.emailsend + 1)}).exec(function (err, resultObject) {
                console.log("Update Customer", resultObject)
              })
              console.log("Not sended customer email registered")
            }
            else {

              Customer.update({id: customerData.id}, {emailsend: emailstatus}).exec(function (err, resultObject) {
                console.log("Update Customer", resultObject)
              })
              console.log("Sended customer email registered")
            }

            callback(iResultCostumerUpdate)

          })
        }
      })
    }


  },

  sendMailBooked: function (customerData, callback) {

    var iResultCostumerUpdate = {}

    if (typeof customerData == "undefined") {
      console.log("Not data about Customer")
      callback(iResultCostumerUpdate)
    }
    else {
      Customer.findOne({id: customerData.id}).populate("formationCenter").populate("formation").exec(function (err, resultObject) {

        if (err) {
          iResultCostumerUpdate.err = err.message
          callback(iResultCostumerUpdate, null)
        }

        if (typeof resultObject == "undefined") {
          callback(iResultCostumerUpdate, null)
        }


        iResultCostumerUpdate.costumerid = customerData.id
        if (customerData.email) {
          ///Update all costumer like the started formation´s mail will send
//Fin place information
          Place.findOne({id: resultObject.formation.place}).exec(function (err, resultPlace) {
            if (err) {
              iResultCostumerUpdate.err = err.message
              callback(iResultCostumerUpdate, null)
            }

            if (typeof resultPlace == "undefined") {
              iResultCostumerUpdate.err = sails.__('NOT_PLACE_DATA')
              callback(iResultCostumerUpdate, null)
            }

            ////If exist send Mail with text
            ///Your course estarted at   in
            ///and GMail link with extact adress
            //var initDate = customerData.date
            var mailSubjet = sails.__('MAIL_REGISTERED_CUSTOMER_SUBJECT')

            ///Set systemurladdress in Configuration collection

            ///INTERNACIONALIZATION
            var mailHtmlBody = "<b><h4><a hrf=\"" + sails.config.globals.configsystem.systemurladdress + "\">Formationfinder</a> notify :</h4></b><br />"
            mailHtmlBody += "<b><h3>" + sails.__('DEAR') + "  " + resultObject.name + "</h3></b><br />"
            mailHtmlBody += "<b><h3>" + sails.__("MAIL_CUSTOMER_REGISTERED_HEAD") + "</h3></b><br />"
            mailHtmlBody += "<b><h3>" + sails.__('IN_ADRESS') +" " + resultPlace.address + "</h3></b><br />"
            mailHtmlBody += "<b>Formation Center : " + resultObject.formationCenter.name + "</b><br />"
            mailHtmlBody += "<b>Formation Center (phone number): " + resultObject.formationCenter.phoneNumber + "</b><br />"
            mailHtmlBody += "<b>Formation Center (email): " + resultObject.formationCenter.email + "</b><br />"

            console.log("MAIL SENDED ", mailHtmlBody)
            var config = {}
            config = {
              to: resultObject.email,
              subject: mailSubjet,
              html: mailHtmlBody
            };

            config.costumerid = resultObject.id;

            //console.log("Send Mail ", config)

            result = EmailService.send(config, function (err, result) {
              ///If not error when send mail
              ///0 Ok, 1 Error, 5 all intent
              iResultCostumerUpdate.mailstatus = 5;
              var emailstatus = 5;
              //  console.log("Mail send answer ", result.response)
              if (result.response != "OK") {

                iResultCostumerUpdate.message = result.message
              }

              callback(iResultCostumerUpdate)

            })

          })


        }
      })
    }


  },
  isValidCustomerData: function (data) {
    // body...
    var isValid = _.isObject(data) && _.isString(data.name)
      && _.isString(data.firstName)
      && _.isString(data.phoneNumber)
      && _.isString(data.email)
      && _.isObject(data.driverLicence)
      && _.isString(data.driverLicence.number)
      && _.isString(data.driverLicence.placeOfDeliverance);

    console.log("En la comprobacion isValid es: " + isValid);

    return (isValid === true);

  }

}
