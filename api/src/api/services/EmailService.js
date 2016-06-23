/**
 * Created by dionis on 6/14/2016.
 */
//require('sails-service-mailer')

module.exports  = {
  /**
   * `EmailController.send()`
   * Send email with Sails services
   * receive to , cc´list, subject, text, idcostumer in option´s object
   */
  send: function (options) {
    /*
     return res.json({
     todo: 'send() is not implemented yet!'
     });
     */

    var toEmail = options.to;
    var ccEmail =  options.cc;  //Comma separated list or an array of recipients e-mail addresses that will appear on the Cc: field
    var subjectEmail =   options.subject;
    var textEmail =   options.text;
    var htmlEmail =  options.html;

    var MailerService = require ('sails-service-mailer');
    console.log("1 Enviando notificacion")
    if (!toEmail || toEmail == "")
      return {err:"Not sender data"};
    console.log("2 Enviando notificacion")
    if (!textEmail && textEmail == "" && !htmlEmail && htmlEmail == "")
      return {err:"Not text data"};


    console.log("3 Enviando notificacion")

    //var smtp = MailerService('smtp', mailconfig );

    var mailElement = { to: toEmail,
      cc: ccEmail,
      text: textEmail,
      subject:subjectEmail
      /*, // Subject line
       html: "<b>"+textEmail+"</b>" // html body
       */
    };

    ///If exist parament text set
    if ( htmlEmail) {
      mailElement.html = htmlEmail;
      console.log("<= To send mail ==>");
      console.log( mailElement );
    }
    ///Read in Configuration´s Colecction data about email server configuration
    ///Get in Database email´s confguration data.

    var ConfigurationObject = "";

    console.log("Enviando notificacion")

    Configuration.find({ type:"smtp"} ).exec(function userConfiguration(err, configuration) {
      if (!configuration || err || configuration == "") {
        //return next(err);
        ///Create tmp for test

         Configuration.create( {
         name:"mail",
         type:"smtp",
         emailsystemadress:"formationfinder@localhost.com",
         emailport:"25",
         emailhost:"127.0.0.1",
         emailuser:"dionis@localhost.com",
         emailpassword:"",
         emailsecure:false
         }).then(function (err, user){
         configuration = user;
         console.log("Creado el objeto en BD");
         });

        console.log("Se ejecuto el codigo de error");
      }

      console.log("Cuerpo de la funcion de busqueda");
      if (!configuration)
        return next();
      ConfigurationObject = configuration;

      console.log("Variable configuracion");
      console.log(ConfigurationObject);
      var emailport = ConfigurationObject.emailport;
      var emailhost = ConfigurationObject.emailhost;
      var emailuser = ConfigurationObject.emailuser;
      var emailpass = ConfigurationObject.emailpassword;
      var emailsecure = ConfigurationObject.emailsecure;
      var emailsystem = ConfigurationObject.emailsecure;

      //  var mailcomposer = require("mailcomposer");

      var MailerService = require ('sails-service-mailer');
      /*

       },
       */
      ///Autentication validation
      ///Test with google project
      ///Create config object

      /* SMTP config example

       MailerService('smtp', {
       from: 'no-reply@ghaiklor.com',
       provider: {
       port: 25, // The port to connect to
       host: 'localhost', // The hostname to connect to
       secure: false, // Defines if the connection should use SSL
       auth: { // Defines authentication data
       user: '', // Username
       pass: '', // Password
       xoauth2: '' // OAuth2 access token
       },
       ignoreTLS: false, // Turns off STARTTLS support if true
       name: '', // Options hostname of the client
       localAddress: '', // Local interface to bind to for network connections
       connectionTimeout: 2000, // How many ms to wait for the connection to establish
       greetingTimeout: 2000, // How many ms to wait for the greeting after connection
       socketTimeout: 2000, // How many ms of inactivity to allow
       debug: false, // If true, the connection emits all traffic between client and server as `log` events
       authMethod: 'PLAIN', // Defines preferred authentication method
       tls: {} // Defines additional options to be passed to the socket constructor
       }
       });


       */

      var mailconfig = {
        from: emailsystem,
        provider: {
          port: emailport, // The port to connect to
          host: emailhost, // The hostname to connect to
          name: emailhost, // Options hostname of the client
          localAddress: emailhost, // Local interface to bind to for network connections
          connectionTimeout: 2000, // How many ms to wait for the connection to establish
          greetingTimeout: 2000, // How many ms to wait for the greeting after connection
          socketTimeout: 2000, // How many ms of inactivity to allow
          debug: true // If true, the connection emits all traffic between client and server as `log` events
        }
      };


      if (!emailpass && !emailuser ) {
        var type = "PLAIN"
        if (!emailsecure)
          type = emailsecure;
        mailconfig.secure = true; // Defines if the connection should use SSL
        mailconfig.auth = { // Defines authentication data
          user: emailuser, // Username
          pass: emailpass, // Password

        }

        if ( emailsecure == "xoauth2") {
          ///Find in Colection Configuration (Document) token
          //xoauth2: '' // OAuth2 access token
          mailconfig.auth.xoauth2 = ConfigurationObject.keytoken;
        }
        else if ( emailsecure == "plain") {

        }
      }

      /*
       if (!emailpass && !emailuser) {

       ///Learn how add new atributtes to javascript object
       config.add(
       secure: false, // Defines if the connection should use SSL
       auth: { // Defines authentication data
       user: '', // Username
       pass: '', // Password
       xoauth2: '' // OAuth2 access token
       }
       );
       }
       */
      var smtp = MailerService('smtp', mailconfig );

      console.log("Enviando correo con datos");
      smtp.send({
          mailElement
        })
        .then( function () {
          ///Update Costumer´s mailstatus atributes with 5 (sended)
          console.log("Enviado el correo");
          if (options.costumerid) {

            Costumer.update({id:options.costumerid},{emailsend:5}).exec(function(err, Costumers){
              if (err) {
                console.log("Error ocurred when update costumer emailsend " + err )
                return {
                  response: err
                }
              }

            })
          }
          return{
            response: 'OK'
          };
        })
        .catch(function (errSend) {
          ///Update Costumer´s mailstatus atributes with increment one  (sended)
          console.log("Enviado el correo ocurrio un error " + errSend);
          Costumer.update({id: options.costumerid}, {emailsend: Costumer.emailsend + 1}).exec(function (err, Costumers) {
            if (err) {
              console.log("Error ocurred when update costumer emailstatus " + err)
              return {
                response:err,
                error: errSend
              }
            }
            console.log("Error" + err)
            return{
              response:err,
              error: errSend
            };
          })
        });

      /*
       var nodemailer = require('nodemailer');
       var smtpTransport = require('nodemailer-smtp-transport');
       var transporter = nodemailer.createTransport(smtpTransport({
       host:  emailhost,
       port: 25,
       auth: {
       user: 'dionis',
       pass: 'cibernetico'
       }
       }));

       var mailOptions = {
       from: 'no-reply@ghaiklor.com', // sender address
       to: toEmail, // list of receivers
       subject: 'Hello ✔', // Subject line
       text: 'Hello world 🐴', // plaintext body
       html: '<b>Hello world 🐴</b>' // html body
       };

       // send mail with defined transport object
       transporter.sendMail(mailOptions, function(error, info){
       if(error){
       return console.log(error);
       }
       console.log('Message sent: ' + info.response);
       });
       */
    })


  },

  /**
   * `EmailController.send()`
   * Send email with Sails services
   * receive to , cc´list, subject, text, document´name list in Attachment Collection
   */
  sendattachment: function (req, res) {
    ///Is above function same but atributte attachment with array type
    /*

     var attachmentEmail = req.param("attachment");
     Attachments

     Attachment object consists of the following properties:

     filename - filename to be reported as the name of the attached file, use of unicode is allowed
     cid - optional content id for using inline images in HTML message source
     content - String, Buffer or a Stream contents for the attachment
     encoding - If set and content is string, then encodes the content to a Buffer using the specified encoding. Example values: base64, hex, 'binary' etc. Useful if you want to use binary attachments in a JSON formatted e-mail object.
     path - path to a file or an URL (data uris are allowed as well) if you want to stream the file instead of including it (better for larger attachments)
     contentType - optional content type for the attachment, if not set will be derived from the filename property
     contentDisposition - optional content disposition type for the attachment, defaults to 'attachment'

     Attachments can be added as many as you want.

     var mailOptions = {
     ...
     attachments: [
     {   // utf-8 string as an attachment
     filename: 'text1.txt',
     content: 'hello world!'
     },
     {   // binary buffer as an attachment
     filename: 'text2.txt',
     content: new Buffer('hello world!','utf-8')
     },
     {   // file on disk as an attachment
     filename: 'text3.txt',
     path: '/path/to/file.txt' // stream this file
     },
     {   // filename and content type is derived from path
     path: '/path/to/file.txt'
     },
     {   // stream as an attachment
     filename: 'text4.txt',
     content: fs.createReadStream('file.txt')
     },
     {   // define custom content type for the attachment
     filename: 'text.bin',
     content: 'hello world!',
     contentType: 'text/plain'
     },
     {   // use URL as an attachment
     filename: 'license.txt',
     path: 'https://raw.github.com/andris9/Nodemailer/master/LICENSE'
     },
     {   // encoded string as an attachment
     filename: 'text1.txt',
     content: 'aGVsbG8gd29ybGQh',
     encoding: 'base64'
     },
     {   // data uri as an attachment
     path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
     }
     ]
     }


     smtp.send({
     to: toEmail,
     cc: ccEmail,
     text: textEmail,
     subject: subjectEmail, // Subject line
     html: "<b>" + textEmail + "</b>" // html body
     attachments:attachmentEmail
     })
     .then(function () {
     return res.json({
     response: 'OK'
     });
     })
     .catch(res.negotiate)
     */

    return res.json({
      todo: 'send() is not implemented yet!'
    });
  }
}
