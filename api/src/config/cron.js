/**
 * Created by dionis on 6/16/2016.
 */
module.exports.cron = {

  firstJob: {
    schedule: '00 01 00 1 * *',
    onTick: function () {
      console.log('I am triggering mountly for send Bills');
      var faker;
      faker = require('faker');
      ///Find all Formation Center
      var endAllTask = true
      FormationCenter.find().exec(function (err, arrayResult) {
        if (err) { ///End function
          console.log("Error ", err)
          return;
        }
        async.forEach(arrayResult, function (iFormationCenter, callback) {

          ////Calculate current date - 1 and built date first day in mounth
          daySegmentContainer = 30
          ///For each Formation Center create mountly bill for our system Paid
          newDate = new Date();
         // initDate = new Date( newDate.getDay() - 30  ) ///Date for search all Bill
          initDate = new Date()
          initDate.setDate(initDate.getDate() - daySegmentContainer);
          Configuration.findOne({systempaid: {ne: undefined}}).exec(function (err, configObject) {

            if (err) { ///End function
              console.log("Error ", err)
              callback();
            }
            paidValue = 120; ///System default Paid Value
            paidValueDefault = 125
            if (typeof configObject == "undefined") {
              ///Use defaul paid value
              paidValue = paidValueDefault
            }
            else
              paidValue = configObject.systempaid


            Bill.create({
              formationCenter: iFormationCenter.id,
              date: newDate,
              amount: paidValue,
              billNumber: faker.finance.account(),
              billState: false
            }).exec(function (err, iBillObject) {
              if (err) { ///End function
                console.log("Error create  Formation Center´payment bill ", err)
                callback();
              }

              console.log("Created Bill for Formation Center mountly with name " +  iBillObject.billNumber )

              ///For each Formation Center read all bill not paid and save in array
              query = {}
              query.formationCenter = iFormationCenter.id
              query.sort = 'date ASC'
              query.billState = false
              query.date= { '<=' : newDate,
                            '>=': initDate}

              console.log("Query", query)

              ////OJOOOOO
              //OJJOOOOOOOOOO  It must compare with today and 30 day before

              Bill.find(query).exec(function (err, resultBillArray) {
                if (err) { ///End function
                  console.log("Error find all bill ", err)
                  callback();
                }
                // console.log("RESULT", query)
                if (typeof resultBillArray == "undefined" || resultBillArray.length == 0) {
                  console.log("Not exits Bill for FormationCenter :", iFormationCenter.name)
                  callback();
                }


                ///Mail  subject

                subjetToEmail = "Mountly bill´s payment"
                ///For array of bill built html table and with Formation Center´s email send email for paid notification
                FormationCenterServices.sendBillMailToFormationCenter(resultBillArray, iFormationCenter, subjetToEmail)
                console.log( "SEND REPORT TO email  " + iFormationCenter.email  +  " Formation Center " + iFormationCenter.name  )
                callback();

              })




            })
          })


        }, function (err) {
          if (err)
            return next(err);
          console.log("**********  End FormationCenter Bill analyces **********************************")
          //console.log(resultCostumerUpdate)
           //callback(null, endAllTask);
        });


      });


    },
    onComplete: function () {
      console.log('End triggering mountly for send Bills');
    },
    start: true // Start task immediately
  },

  secondJob: {
    schedule: '*/60 * * * * *',
    onTick: function () {
      console.log('I am triggering every second');

      resultCostumerUpdate = [];
      var UserToSendMails = []
      ////Find the costumer to notified
      ///Find all register user  if your course almost init
      ///5 hours before
      // var EmailServices = require('../api/services/EmailService')
      var CustomerServices = require('../api/services/CustomerService')

      ///Validate asociations

      console.log("****************** Validate asociations ****************************")
      SeedTmpServices.validateaAssociationsTMP()
      console.log("****************** End validate asociations ****************************")
      var findData = ["buscar"]
      CustomerServices.searchbyclosedformation(function (result) {

        ///Consumer to received mailed set status in 2 indicated mail in process
        UserToSendMails = result;
        console.log("------- Obteniendo datos -----------");

        console.log(UserToSendMails)

        console.log("------- ************* -----------");
        console.log("------" )

        async.series({
            sendmail: function (callback) {
              ///Get all user to send mailed
              async.forEach(UserToSendMails, function (Customerdata, callback) {
                console.log("Send mail to user")
                CustomerServices.sendMailToCostumer(Customerdata, function (result) {
                  ///resultCostumerUpdate.push(iResultCostumerUpdate)
                  callback();
                })

              }, function (err) {
                if (err)
                  return next(err);
                console.log("********************************************")
                console.log(resultCostumerUpdate)
                callback(null, resultCostumerUpdate);
              });
            }
          },
          function (err, results) {
            if (err)
              return next(err);

            console.log("**** Ejecucion de la ultima instruccion**** ")

          });

      })


      /* UserToSendMails = CustomerController.searchbyclosedformation();

       for ( iCostumer in UserToSendMails) {
       var Customerdata = UserToSendMails[iCostumer];
       resultCostumerUpdate.costumerid = Customerdata.costumerid
       if (Customerdata.email) {
       ///Update all costumer like the started formation´s mail will send


       ////If exist send Mail with text
       ///Your course estarted at   in
       ///and GMail link with extact adress
       var mailSubjet = "Your formation almost started  ";
       var mailHtmlBody = "<b>Formationfinde notify you your coruse in Formation Center in adress almas started " + date + "</b>"
       var config = {
       to: Customerdata.email,
       subject: mailSubjet,
       html: mailHtmlBody
       };
       result = EmailController.send(config);
       ///If not error when send mail
       ///0 Ok, 1 Error, 3 all intent
       resultCostumerUpdate.mailstatus = 0;
       if (result.response != "OK") {

       resultCostumerUpdate.mailstatus = 1;
       ///Update all costumer like the started formation´s mail is sended if not error
       }
       }
       }*/

    },
    onComplete: function () {
      console.log('I am triggering when job is complete');
    },
    start: true // Start task immediately

  }
};
