/**
 * Created by dionis on 6/16/2016.
 */
module.exports.cron = {
  /*
  firstJob: {
    schedule: '* * * * * *',
    onTick: function() {
      console.log('I am triggering every second');
    }
  },
 */
  secondJob: {
    schedule: '*/60 * * * * *',
    onTick: function() {
      console.log('I am triggering every five seconds');

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
      CustomerServices.searchbyclosedformation( function ( result ){

        ///Consumer to received mailed set status in 2 indicated mail in process
        UserToSendMails = result;
        console.log("------- Obteniendo datos -----------");

        console.log(UserToSendMails)

        console.log("------- ************* -----------");

        async.series({


            sendmail: function(callback) {

              ///Get all user to send mailed


              async.each(UserToSendMails, function (Customerdata, callback) {
                var iResultCostumerUpdate = {}
                iResultCostumerUpdate.costumerid = Customerdata.costumerid
                if (Customerdata.email) {
                  ///Update all costumer like the started formation´s mail will send


                  ////If exist send Mail with text
                  ///Your course estarted at   in
                  ///and GMail link with extact adress
                  var initDate = Customerdata.date
                  var mailSubjet = "Your formation almost started  ";
                  var mailHtmlBody = "<b>Formationfinde notify you your coruse in Formation Center in adress almas started " + initDate + "</b>"
                  var config ={}
                  config = {
                    to: Customerdata.email,
                    subject: mailSubjet,
                    html: mailHtmlBody
                  };

                  config.costumerid =  Customerdata.id;

                  result = EmailService.send(config, function ( err, result ) {
                    ///If not error when send mail
                    ///0 Ok, 1 Error, 5 all intent
                    iResultCostumerUpdate.mailstatus = 5;
                    var emailstatus = 5;
                    console.log("Mail send answer ", result.response)
                    if (result.response != "OK") {

                      iResultCostumerUpdate.mailstatus = 1;
                      emailstatus = 1;
                      ///Update  costumer like the started formation´s mail is sended if not error
                      Costumer.update({id:options.costumerid},{emailsend:emailsend + emailstatus}).exec(function(err, Costumers){})
                    }
                    else
                      Costumer.update({id:options.costumerid},{emailsend:mailstatus}).exec(function(err, Costumers){})

                    resultCostumerUpdate.push(iResultCostumerUpdate)

                    callback();
                  });
                }

              }, function ( err) {
                if (err)
                  return next(err);
                console.log("********************************************")
                console.log(resultCostumerUpdate)
                callback(null,resultCostumerUpdate);
              });
            }
          //,

          /*  updatemaileSatatus: function(callback){
              console.log("----- Actualizando valores de mensajes enviados -----");
              CustomerServices.updatemailnotify(resultCostumerUpdate);
              callback(null,"updatemaileSatatus");
            }*/
          },
          function(err, results) {
            // results is now equal to: {one: 1, two: 2}
            if (err)
              return next(err);

            console.log("**** Ejecucion de la ultima instruccion**** ")
            //var valResult = {resultFormation }
            //return valResult
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
    onComplete: function() {
      console.log('I am triggering when job is complete');
    },
    start: true // Start task immediately

  }
};
