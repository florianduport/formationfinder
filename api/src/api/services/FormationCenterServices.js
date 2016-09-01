module.exports = {

  isValidCustomerData: function (data) {
    // body...

    var isValid = _.isObject(data) && _.isString(data.name)
      && _.isString(data.firstName)
      && _.isString(data.phoneNumber)
      && _.isString(data.email);

    if (isValid === true)
      return true;

    return false;
  },

  getReadableDate : function (dateParmt) {
    weekDay = ["Sunday", "Monday", "Tuesday", "Wensday", "Thuesday", "Fryday", "Saturday"]
    value = new Date(dateParmt);
    resultDate = weekDay[value.getDay()] + ": " + value.getDate() + "-" + value.getMonth() + "-" + value.getFullYear();

    return resultDate

  },

  isValidDriverLicenceData: function (data) {
    // body...

    var isValid = _.isObject(data) && _.isString(data.number)
      && _.isString(data.placeOfDeliverance);

    if (isValid === true)
      return true;

    return false;
  },
  /*
    ///For  built´s array of bill  html table and with Formation Center´s email send email for paid notification
  */
  sendBillMailToFormationCenter: function (resultBillArray, iFormationCenter, mailSubjet ) {

    ///Built html table
      tableHead = "<thead><tr><th><strong>Amount</strong></th><th><strong>Date</strong></th> <th><strong>Bill Number</strong></th></tr></thead>"
      tableBody = ""

      resultBillArray.forEach(function (iBill, index) {
        tableBody =  tableBody +  "<tr>"

        tableBody =  tableBody + "<td>" + iBill.amount + "</td>"
        tableBody = tableBody + "<td>" + FormationCenterServices.getReadableDate(iBill.date) + "</td>"
        tableBody = tableBody + "<td>" + iBill.billNumber + "</td>"
        tableBody =  tableBody +  "</tr>"

      });

      tableCode = "<table>" + tableHead + tableBody + "</table>"

      var config = {}
      config = {
        to: iFormationCenter.email,
        subject: mailSubjet,
        html: tableCode
      };

      console.log("Sended Mail to Formation Center " ,config )

      result = EmailService.send(config, function (err, result) {
        ///If not error when send mail
        ///0 Ok, 1 Error, 5 all intent

        console.log("Mail send answer ", result.response)
        if (result.response != "OK") {
              ////Create Log and Alert for formationCenter

        }

      });
    },

  /*
   ///For  built´s array of bill  html table and with Formation Center´s email send email for paid notification
   */
  sendAlertMailToFormationCenter: function (type, text, iFormationCenter, mailSubjet ) {

    ///Built html table
    tableBody = "<h5>" + text + "</h5>";
    tableHead = "<h3>"  + mailSubjet + "</h3>";

    tableCode = "<div>" + tableHead + tableBody + "</div>"

    var config = {}
    config = {
      to: iFormationCenter.email,
      subject: mailSubjet,
      html: tableCode
    };

    console.log("Sended Mail to Formation Center " ,config )

    result = EmailService.send(config, function (err, result) {
      ///If not error when send mail
      ///0 Ok, 1 Error, 5 all intent

      console.log("Mail send answer ", result.response)
      if (result.response != "OK") {
        ////Create Log and Alert for formationCenter

      }

    });
  }
};
