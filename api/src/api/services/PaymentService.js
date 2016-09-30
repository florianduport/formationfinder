/**
 * Created by dionis on 6/23/2016.
 */
module.exports = {

  validateFormatinCenterInformation : function ( formationcenterName, callback) {
    FormationCenter.findOne({name:formationcenter}).exec(function (err, formationCenterData) {



      if (err) {
        callback(err, false)
        return ;

      }

      if (typeof formationCenterData.mangowallet == "undefined" || typeof formationCenterData.mangouser == "undefined") {
        callback("Formation Center make payment", false)
        return;
      }

      callback(null, true);
    })
  },

 findMangoPayConfiguration: function ( callback) {

   var appuser = 'inoid2016';
   var apppassphrase = '7GuneTv8QdsmMxLpfm2yWi0smLPaZ1szas9YZgRd2SeyzG47tG';

   Configuration.find().limit(1).exec(function ConfigurationFounded(err, iConfigurations) {
     console.log("Load configurationsss!!!!!")
     if (err) {
       console.log("Load configurationsss!!!!!", err)
       callback(null, {response: "ERROR",
         message: err})
       return;
     }
     var iConfiguration = iConfigurations[0];
     if (iConfiguration.appmangouser === undefined || iConfiguration.appmangopassphr  === undefined  ) {
       //return next(err);
       ///Create tmp for test

       if (typeof sails.config.globals.configsystem.appuser != "undefined") {
         appuser = sails.config.globals.configsystem.appuser
         console.log("Read config value to configuration file to Mangopay.");
       }
       else {
         console.log("No exist appuser  parameter in config system file set default parameter.");
       }


       if (typeof sails.config.globals.configsystem.apppassphrase != "undefined") {
         apppassphrase= sails.config.globals.configsystem.apppassphrase
         console.log("Read config value to configuration file to Mangopay.");
       }
       else {
         console.log("No exist  apppassphrase  parameter in config system file set default parameter.");

       }

       Configuration.update({},{ appmangouser : appuser, appmangopassphr : apppassphrase}).exec(function (err, Config){
         //configuration = Config[0];
         console.log("Creado el objeto en BD");
       });
       console.log("Se ejecuto el codigo de error");
     }
     else {
       appuser = iConfiguration.appmangouser;
       apppassphrase = iConfiguration.appmangopassphr;
     }

     ///Initialize Mangopay library
     //  version: 'v2.01',
     var mango = require('mangopay')({
       username: appuser,
       password: apppassphrase,
       production: false,
       version: 'v2.01'
     })


     //console.log("Load mango pay" , mango)

     callback(null, mango)
   });
 },

  /**
   * `PayController.createwallet() for legal user`
   *  A wallet is for FormationCenter recibe formation center id
   */
  createwallet: function (config, legalUserValues, callback) {


    //Find data in Configuration document
    if ( typeof config == "undefined") {
      callback(null, {response: "ERROR",
        message: "Config parameter undefined"})
      return;

    }

      if ( typeof legalUserValues == "undefined") {
        callback(null, {response: "ERROR",
          message: "LegalUserValues parameter undefined"})
        return;

      }

    ///Validate stadar in currency see documentation
    if ( typeof config.currency == "undefined" || config.currency == "") {
      callback(null, {response: "ERROR", message: "currecy value  undefined"})
      return;
    }

    var currencyParam = config.currency;

    ///Search by formation center syncronized
     moment  = require("moment")




    //var legalUserData = {
    //          name : 'mycompany.com',
    //          email: 'info@mycompany.com',
    //          legalpersonType: 'BUSINESS',
    //          legalRepresentativeFirstName: 'Inoidssss',
    //          legalRepresentativeLastName: 'Doessss',
    //          legalRepresentativeEmail: 'john_doe@mycompany.es',
    //          headquartersAddress: 'Canal Street, Madrid, Spain',
    //          legalRepresentativeAdress: 'Canal Street, Madrid, Spain',
    //          legalRepresentativeBirthday: moment('300681', 'DDMMYY').unix(),
    //          legalRepresentativeCountryOfResidence: 'ES',
    //          legalRepresentativeNationality: 'ES'
    //
    //    }


        ///Validate user data parameters for developmet parameters
        if (typeof legalUserValues != "undefined") {
          legalUserData = legalUserValues;
        }
        else { //Validate parameters

          ///Required paramenter view Mangopay documentation

          ///Validate estandar
/*          legalRepresentativeNationality
          legalRepresentativeCountryOfResidence
          legalpersonType*/
       }

        console.log("Call form mango services")

    this.findMangoPayConfiguration( function(err, mango) {
        mango.user.createLegal(legalUserData, function(err, user, resD){
           console.log("Answer ''' ");
          if ( err) {
            // console.log('Err', err.message);
            callback(err, {response: "ERROR",
              message: err.message})
            return;
          }



          var userdata = user;

          if ( !userdata ) {
            callback({respose: "Not user data values"})
            return;
          }
          var ownersArray = [];
          ownersArray.push(userdata.Id);

          console.log("Answer 1 ", currencyParam);

          ///Validate currency
          /*
           if ( sails.services.ValidateCurrency(currencyParam) == false) {
           return next ("!!!!Currency not defined!!!!")
           }

           */
          mango.wallet.create({
            Owners: ownersArray, // Required
            Description: "Formationfinder wallet", // Required, default: 'wallet'
            Currency: currencyParam, // Required, default: 'EUR'
            Tag: "Formationfinder wallet"
          }, function(err, wallet, res){

            console.log("Answer 1 ");
            if ( err ) {
              callback({response: "ERROR",
                message: err.message}, null)
               return;
            }

            console.log("Answer '''' ");
            callback(null, {response: "OK",
              wallet: wallet.Id,
              user: user.Id})


            //console.log('err', err);

            ///console.log('wallet', wallet);

            ///console.log('res', res.statusCode);

            ///console.log(iFormationCenter);

            ///console.log("nombre",formationCenterName);

            //Register a bank account for the seller
            //Erase in production mode
          });
      });
    });
  },



  /***
   *   Create a mangonpay user natuarl and his wallet
   *
   *
   */
  createNaturalWallet: function ( config, naturalUserValues, callback) {

    ///Validate user data parameters for developmet parameters
    if (typeof naturalUserValues == "undefined") {
      callback({response: "ERROR",
        message: "NaturalUserValues value  undefined"},null )

    }
    else { //Validate parameters

      naturalUserData = naturalUserValues;

      if (typeof naturalUserData.FirstName == "undefined") {
        callback({response: "ERROR",
          message: "User value firstname undefined"},null )
      }
      else if (typeof naturalUserData.LastName == "undefined") {
        callback({response: "ERROR",
          message: "User value lastname undefined"}, null )
      }
      else if (typeof naturalUserData.FirstName == "undefined") {
        callback({response: "ERROR",
          message: err}, null )
      }
      else if(typeof naturalUserData.Birthday == "undefined") {
        callback( {response: "ERROR",
          message: "User value birthday undefined"}, null)
      }
      else if(typeof naturalUserData.CountryOfResidence == "undefined") {
        callback({response: "ERROR",
          message: "User value country of residence undefined"}, null )
      }
      else if(typeof naturalUserData.Nationality == "undefined") {
        callback({response: "ERROR",
          message: "User value nationality undefined"}, null)
      }
      ///Required paramenter view Mangopay documentation

      ///Validate estandar
      /*          Nationality
       CountryOfResidence
       legalpersonType*/
    }

    //mango.user.signup({
    //  Email: naturalUserData.Email,
    //  FirstName: naturalUserData.FirstName,
    //  LastName: "Lovelace",
    //  Address: naturalUserData.LastName,
    //  Birthday:  naturalUserData.Birthday,
    //  Nationality: naturalUserData.Nationality,
    //  CountryOfResidence: naturalUserData.CountryOfResidence
    this.findMangoPayConfiguration( function(err, mango) {
      if (err)   callback({response: "ERROR",
        message: err}, null);

    console.log("COMUNICATION WINT MANGOPAY");
    mango.user.signup({
      FirstName: naturalUserData.FirstName, // Required
      LastName: naturalUserData.LastName,    // Required
      Birthday: naturalUserData.Birthday,  // Required
      Nationality: naturalUserData.Nationality, // Required, default: 'FR'
      CountryOfResidence:naturalUserData.CountryOfResidence, // Required, default: 'FR'
      Address: naturalUserData.Address,
      Occupation: naturalUserData.Occupation,
      IncomeRange: naturalUserData.IncomeRange,
      ProofOfIdentity: naturalUserData.ProofOfIdentity,
      ProofOfAddress: naturalUserData.ProofOfAddress,
      PersonType: naturalUserData.PersonType,
      Email:naturalUserData.Email,
      Tag: naturalUserData.Tag,
    }, function(err, user, wallet){
      //console.log('err', err);
     // console.log('user', user);
      //console.log('wallet', wallet);
      console.log("RESPONSE WINT MANGOPAY");
      if ( err ) {
        callback( {response: "ERROR",
          message: err.message}, null)
          return;
      }

      callback(null, {response: "OK",
        wallet: wallet.Id,
        user: user.Id})
    });
    });
  },
  /***
   *   Create bank count to mangopay user
   *
   *
   */
  createBankCount: function( bankCountValues, userid,callback) {

    backCountData = {
    }

    if (typeof userid == "undefined"){
      callback( {
        response: "ERROR",
        message: "No exist userid parameter"
      }, null)
      return;
    }
    ///For development porpouses
    if ( typeof bankCountValues  == "undefined") {
      callback({
        response: "ERROR",
        message: "No exist bankCountValues parameter"
      }, null )
      return;
    }
    else
      backCountData = bankCountValues;

    this.findMangoPayConfiguration( function(err, mango) {
    mango.bank.create(backCountData, function(err, bankaccount, res) {

      if (err) {
        console.log(err)
        callback(null, {
          response: "ERROR",
          message: err
        })
      }

      callback(null, {
        response: "OK",
        bankcount: bankaccount.Id
      });
    });
    });
  },
  createCard: function( cardValues,config,  userid,callback) {

    if ( typeof config == "undefined") {
      callback({response: "ERROR",
        message: "Config parameter undefined"},null )
      return;

    }

    ///Validate stadar in currency see documentation
    if ( typeof config.currency == "undefined" || config.currency == "") {
      callback({response: "ERROR", message: "currecy value  undefined"}, null)
      return;
    }

    var currencyParam = config.currency;
    if (typeof userid == "undefined"){
      callback( {
        response: "ERROR",
        message: "No exist userid parameter"
      }, null )
      return;
    }


    if ( cardValues == "undefined"){
      callback({
        response: "ERROR",
        message: "No exist cardValues parameter"
      }, null )
      return;
    }
    if (typeof cardValueEx.CardNumber == "undefined") {
      callback({response: "ERROR",
        message: "User card parameter card number undefined"}, null)
      return;
    }
    else if (typeof cardValueEx.CardExpirationDate == "undefined") {
      callback({response: "ERROR",
        message: "User card parameter card expiration date undefined"}, null)
      return;
    }
    else if (typeof cardValueEx.CardCvx == "undefined") {
      callback( {response: "ERROR",
        message: "User card parameter cardcvx undefined"}, null)
      return;
    }

    this.findMangoPayConfiguration( function(err, mango) {

      console.log("Create CARD registration");
        mango.card.initRegistration({
          UserId: userid
          , Currency: "EUR"
        }, function(err, cardRegistration){
          //debug(arguments)
          //expect(cardRegistration.AccessKey).not.to.be.null

          mango.card.create({
            Tag: "custom meta",
        UserId: userid,
        CardNumber: cardValueEx.CardNumber,
        CardExpirationDate: cardValueEx.CardExpirationDate,
        CardCvx: cardValueEx.CardCvx,
      }, function (err, card, res) {
            //console.log("RESULT", err)
            //console.log("RESULT", res)
            if (err) {
              callback(null, {
                response: "ERROR",
                message: err
              })
              return;
            }

            /*      View documentation
             mango.card.initRegistration({
             UserId: userid,
             Currency: "EUR"
             }, function (err, registration, res) {
             err;
             registration; // mango registration object
             res; // raw 'http' response object => res.statusCode === 200
             })*/

            console.log("IDENTIFICADOR OBJ", card)
            console.log("_____________________________________")
            console.log("IDENTIFICADOR", card.CardId )
            if (!card) {
              callback(null, {
                response: "ERROR",
                message: "Not mangopay card information"
              })
            }
            else {
              callback(null, {
                response: "OK",
                card: card.CardId
              })
            }
          })
      });
    });
  },
/*
*  Withdraw money from a wallet to a bank account:
* */
  withdrawWalletToBank : function( userid, walletid, bankcountid, bic, debitedFunds, fees, callback) {



	  if (typeof userid == "undefined")
      callback( {
        response: "ERROR",
        message: "No exist userid parameter"
      },null )

	   if (typeof walletid == "undefined")
      callback({
        response: "ERROR",
        message: "No exist walletid parameter"
      }, null )

	  if (typeof bankcountid == "undefined")
      callback( {
        response: "ERROR",
        message: "No exist bankcountid parameter"
      }, null )

    if (typeof debitedFunds == "undefined"){
      callback( {
        response: "ERROR",
        message: "No exist debitedFunds parameter"
      }, null)
      return;
    }
	  if (debitedFunds) {
		  debiteFundsEx = debitedFunds
	  }



	   if (typeof debitedFunds.Currency == "undefined"){
      callback({
        response: "ERROR",
        message: "No exist fees.Currency parameter"
      }, null )
       return;
     }
	  if (typeof fees == "undefined"){
      callback( {
        response: "ERROR",
        message: "No exist debitedFunds parameter"
      }, null)
      return;
    }
	   if (fees) {
		  feesEx = fees
	  }

	  if (typeof fees.Currency == "undefined"){
      callback({
        response: "ERROR",
        message: "No exist fees.Currency parameter"
      },  null)
      return;
    }
     if (typeof debitedFunds.Currency == "undefined"){
      callback( {
        response: "ERROR",
        message: "No exist fees.Currency parameter"
      }, null )
       return;
     }
     if (typeof debitedFunds.Currency == "undefined"){
      callback( {
        response: "ERROR",
        message: "No exist fees.Currency parameter"
      },null )
       return;
     }

	   if (typeof fees.Amount != "number"){
      callback({
        response: "ERROR",
        message: "No exist fees.Currency is not a number"
      }, null )
       return;
     }
      if (typeof debitedFunds.Amount != "number"){
      callback({
        response: "ERROR",
        message: "No exist fees.Currency is not a number"
      }, null )
        return;
      }
      if ( debitedFunds.Amount < fees.Amount ){
      callback( {
        response: "ERROR",
        message: "Amount for debited is minus than fees"
      }, null)
        return;
      }

    paydata = {
      Tag :"custom meta",
        AuthorId: userid,
      DebitedFunds: debiteFundsEx,
      Fees: feesEx,
      BankAccountId:bankcountid,
      DebitedWalletId: walletid,
      BankWireRef: "invoice 7282"
    }

    console.log("To Wire", paydata)
	  this.findMangoPayConfiguration( function(err, mango) {
		  mango.bank.wire(paydata, function(err, wire, res){

			  if (err) {
          console.log("ERROR", err)
        callback({
          response: "ERROR",
          message: err
        }, null )
      }

      callback(null, {
        response: "OK",
        wire: wire
      });
});

	  });


  } ,
  /**
   *
   *
     makeBuyToMango: Send payment to user wallet
   */
  makeBuyToMango: function (userbuyer, useridseller, walletidseller, cardidbuyer, debiteFunds, fees, callback) {

    ///10% money for may platform
    // In my case I charge a fee to the buyer so, let’s say that the product costs
    // 100€ and the fee we apply is 10%, I should set the amount debited to 110€ (11000 cents).


    if (typeof useridseller == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist useridseller parameter"
      })
    console.log("==================dddd=========================================")

    if (typeof walletidseller == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist walletidseller parameter"
      })
    console.log("===========================================================")
    if (typeof cardidbuyer == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist cardidbuyer parameter"
      })


    if (debiteFunds) {
      debiteFundsEx = debiteFunds
    }else
      callback(null,  {
        response: "ERROR",
        message: "No exist fees parameter"
      })

    console.log("===========================================================")
    if (typeof debiteFunds == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist debitedFunds parameter"
      })

    if (typeof debiteFunds.Currency == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist fees.Currency parameter"
      })

    if (typeof fees == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist fees parameter"
      })

    if (fees) {
      feesEx = fees
    }

    if (typeof fees.Currency == "undefined")
      callback({
        response: "ERROR",
        message: "No exist fees.Currency parameter"
      }, null )


    if (typeof debiteFunds.Currency == "undefined")
      callback({
        response: "ERROR",
        message: "No exist fees.Currency parameter"
      }, null )

    console.log("MAKE PREPARE")
    if (typeof fees.Amount != "number")
      callback( {
        response: "ERROR",
        message: "No exist fees.Currency is not a number"
      }, null)
    if (typeof debiteFunds.Amount != "number")
      callback({
        response: "ERROR",
        message: "No exist fees.Currency is not a number"
      },  null)

    if ( debiteFunds.Amount < fees.Amount )
      callback({
        response: "ERROR",
        message: "Amount for debited is minus than fees"
      },  null)

    console.log("PAGO ID", cardidbuyer);


    payinData = {
      Tag: "custom meta",
      AuthorId: userbuyer,
      CreditedUserId: useridseller,
      CreditedWalletId: walletidseller,
      DebitedFunds: debiteFundsEx,
      Fees:feesEx ,
      SecureModeReturnURL: "http://www.my-site.com/returnURL",
      CardId: cardidbuyer,
      SecureMode: "DEFAULT",
      StatementDescriptor: "Mar2016"
    }


    this.findMangoPayConfiguration( function(err, mango) {
      console.log("MAKE PREPARE")

      mango.payin.createByToken(payinData, function (err, payin, res) {
        //console.log('err', err);
       // console.log('payin', payin);
        //console.log('res', res.statusCode);
        console.log("MAKE TRANSFERENCE")

        if (err) {
          callback({
            response: "ERROR",
            message: err
          }, null )
          return;
        }

        callback(null, {
          response: "OK",
          payin: payin
        });
      })
    });
},
  transferWalletToWallet: function (buyerUserId, buyerWalletId, sellerUserId, sellerWalletId, debitedFunds, fees, callback ) {
///10% money for may platform
    // In my case I charge a fee to the buyer so, let’s say that the product costs
    // 100€ and the fee we apply is 10%, I should set the amount debited to 110€ (11000 cents).

    debiteFundsEx =  {

    }

    ///10% money for may platform
    feesEx = {

    }
    if (typeof buyerUserId == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist buyerUserId parameter"
      })

    if (typeof buyerWalletId == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist buyerWalletId parameter"
      })

    if (typeof sellerUserId == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist sellerUserId parameter"
      })

    if (typeof sellerWalletId == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist sellerWalletId parameter"
      })

    if (debitedFunds) {
      debiteFundsEx = debitedFunds
    }
    if (typeof debitedFunds == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist debitedFunds parameter"
      })

    if (typeof debitedFunds.Currency == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist fees.Currency parameter"
      })

    if (typeof fees == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist debitedFunds parameter"
      })

    if (fees) {
      feesEx = fees
    }

    if (typeof fees.Currency == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist fees.Currency parameter"
      })

    if (typeof debitedFunds.Currency == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist fees.Currency parameter"
      })

    if (typeof debitedFunds.Currency == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist fees.Currency parameter"
      })

    if (typeof fees.Amount != "number")
      callback(null,  {
        response: "ERROR",
        message: "No exist fees.Currency is not a number"
      })
    if (typeof debitedFunds.Amount != "number")
      callback(null,  {
        response: "ERROR",
        message: "No exist fees.Currency is not a number"
      })

    if ( debitedFunds.Amount < fees.Amount )
      callback(null,  {
        response: "ERROR",
        message: "Amount for debited is minus than fees"
      })


    this.findMangoPayConfiguration( function(err, mango) {
    mango.wallet.transfer({
      AuthorId : buyerUserId,
      DebitedFunds: debiteFundsEx,
      Fees : feesEx,
      DebitedWalletID : buyerWalletId ,
      CreditedWalletID : sellerWalletId,

      Tag : "custom meta"
    }, function(err, transfer, res){
      if (err) {
        console.log("ERROR", err)
        callback({
          response: "ERROR",
          message: err
        }, null )
      }

      callback(null, {
        response: "OK",
        payin: transfer
      });
    });

    });

  },
  /**
   * `create wallet and user data for Formationfinder Formation Center`
   * User data
   */
  makeWalletToFormationCenter: function ( formationcenter, callback) {

   if (!formationcenter || formationcenter == "") {
      callback({response: "Undefined Formation Center´s name"}, null );
      return;
    }



    ///Validate currency

    var formationCenterName = formationcenter;
    var formationCenter = {};


    ///Search by formation center syncronized
    FormationCenter.findOne({name: formationCenterName}).exec(function (err, iFormationCenter) {
      if (err) {
        callback({response: err}, null)
        return;
      }

      if (!iFormationCenter) {
        callback(null, {response: "Not exist Formation Center with name ".formationCenterName})
        return;
      }

      var legalUserData =  {
        Tag: "custom meta",
        HeadquartersAddress: {
          AddressLine1:  iFormationCenter.address,
          AddressLine2: iFormationCenter.address,
          City: iFormationCenter.city,
          Region: iFormationCenter.city,
          PostalCode: iFormationCenter.zipCode,
          Country: "FR"
        },
        LegalPersonType: "BUSINESS",
        Name: iFormationCenter.name,
        LegalRepresentativeAddress: {
          AddressLine1: iFormationCenter.address,
          AddressLine2: iFormationCenter.address,
          City: iFormationCenter.city,
          Region: iFormationCenter.city,
          PostalCode: iFormationCenter.zipCode,
          Country: "FR"
        },
        LegalRepresentativeBirthday: moment('300681', 'DDMMYY').unix(),
        LegalRepresentativeCountryOfResidence: "ES",
        LegalRepresentativeNationality: "FR",
        LegalRepresentativeEmail: iFormationCenter.email,
        LegalRepresentativeFirstName:  iFormationCenter.firstName,
        LegalRepresentativeLastName:  iFormationCenter.firstName,
        Email: iFormationCenter.email,
      }

      console.log("Date to send ",  legalUserData)

      config = {}
      config.currency = "EUR";


      PaymentService.createwallet(config, legalUserData, function (err, result) {
        if (err) {
          callback({
            response: "ERROR",
            message: "Couldn' t create mangopay wallet for Formation Center " + formationCenterName + ": " + err
          }, null)
          return;
        }

        ///Update formation center
        FormationCenter.update({name: formationCenterName}, {
          mangowallet: result.wallet,
          mangouser: result.user
        }).exec(function (err, Config) {
          if (err){ callback({
            response: "ERROR",
            msg: "Couldn' t create mangopay wallet for Formation Center " + formationCenterName + ": " + err
          }, null);
            return;
          }

          callback(null, {response: "OK",  mangowallet: result.wallet, mangouser: result.user, name:formationCenterName })
          return;
        });

      })
    });

  },

  /**
   * `Register bank account to Formation Center
   * User data
   */
  registerBankAccountToFormationCenter: function (bankaccountdata,  formationcenter, callback) {

    if (!formationcenter || formationcenter == "") {
      callback( {  response: "Undefined Formation Center´s name"}, null);
      return;
    }

    if (!bankaccountdata || bankaccountdata == "") {
      callback({  response: "Undefined Bank account data"},null );
      return;
    }

    if (!bankaccountdata.Type || bankaccountdata.Type == "") {
      callback( {  response: "Undefined Bank account type data"}, null);
      return;
    }


    /*
     if (!userValue || userValue == "")
     callback({ response: "Undefined buyer´s data "})
     */
    //if (!mount ||mount == "" || mount <= 0 ) {
    //  callback(null, {response: "Undefined mount"})
    //  return;
    //}
    //
    //if (!currency ||currency == "" ) {
    //  callback(null,{response: "Undefined currency"})
    //  return;
    //}

    ///Validate currency

    var formationCenterName = formationcenter;
    var formationCenter = {};



    ///Search by formation center syncronized
    FormationCenter.findOne({name:formationCenterName}).exec( function (err, iFormationCenter) {
      if (err) {
        callback( {response: err}, null)
        return;
      }

      if (!iFormationCenter) {
        callback({response: "Not exist Formation Center with name ".formationCenterName}, null)
        return;
      }

      if (!iFormationCenter.mangowallet || iFormationCenter.mangowallet == "") {
        callback({  response: "Undefined mangopay wallet for Formation Center " + formationCenterName}, null );
        return;
      }

      if (!iFormationCenter.mangouser ||iFormationCenter.mangouser == "") {
        callback({  response:" Undefined mangopay user for Formation Center " + formationCenterName}, null );
        return;
      }

      backCountData = bankaccountdata

      backCountData.Id = iFormationCenter.mangouser
      backCountData.UserId = iFormationCenter.mangouser


      PaymentService.createBankCount(backCountData, iFormationCenter.mangouser , function (err, result) {
        if (err) callback({
          response: "ERROR",
          msg: "Couldn' t create mangopay wallet for Formation Center " + formationCenterName + ": " + err
        })

        ///Update formation center bankcount: bankaccount
        FormationCenter.update({name: formationCenterName}, {
          mangobankaccount: result.bankcount,

        }).exec(function (err, Config) {
          if (err) callback({
            response: "ERROR",
            msg: "Couldn' t register bank account for Formation Center " + formationCenterName + ": " + err
          })

           callback(null,{response: "OK"})

        });
      })
    });
  },


  buyproduct : function(userNaturalData, userCard, amount, currency,  formationcenter, callback){
      ///Configuration have a variable with our system feeds in %
      ///and have other with mangopay feeds in %
      ////amount it's the product price in unitys not in cents and currency is nacional money unity
      ///for user
      ////amount*100 > ((amount*100)*(mangopayfeeds + sistemfeeds))/100

    if (!mount ||mount == "" || mount <= 0 ) {
      callback(null, {response: "Undefined mount"})
      return;
    }

    if (!currency ||currency == "" ) {
      callback(null,{response: "Undefined currency"})
      return;
    }


    if (!formationcenter ||formationcenter == "" ) {
      callback(null,{response: "Undefined formationcenter name"})
      return;
    }

    if (!userCard ||userCard == "" ) {
      callback(null,{response: "Undefined user CARD"})
      return;
    }

    if (!userNaturalData ||userNaturalData == "" ) {
      callback(null,{response: "Undefined user information"})
      return;
    }

    Configuration.find().limit(1).exec(function ConfigurationFounded(err, iConfigurations) {
      console.log("Load configurationsss!!!!!")
      if (err) {
        console.log("Load configurationsss!!!!!", err)
        callback(null, {
          response: "ERROR",
          message: err
        })
        return;
      }
      var iConfiguration = iConfigurations[0];

      var mangopayfeeds = 0
      var systemfeeds = 0

      if (iConfiguration.mangopayfeeds && !isNaN(parseInt(iConfiguration.mangopayfeeds))){
        mangopayfeeds = iConfiguration.mangopayfeeds
      }

      if (iConfiguration.systemfeeds && !isNaN(parseInt(iConfiguration.systemfeeds))){
        systemfeeds = iConfiguration.systemfeeds
      }

      centsAmount = amount*100; ///We have in perspective national currency and variations (Ex:Libra Esterlina)
      feedsAmount = (centsAmount*(mangopayfeeds + systemfeeds))/100

      if (centsAmount <  feedsAmount){
        callback(null,{response: "Amount to pay is more less than feeds."})
      }

      ///find formationcenter data
      FormationCenter.findOne({name:formationCenterName}).exec( function (err, iFormationCenter) {
        if (err) {
          callback(null, {response: err})
          return;
        }

        if (!iFormationCenter) {
          callback(null, {response: "Not exist Formation Center with name ".formationCenterName})
          return;
        }

        if (!iFormationCenter.mangowallet || iFormationCenter.mangowallet == "") {
          callback(null, {  response: "Undefined mangopay wallet for Formation Center " + formationCenterName});
          return;
        }

        if (!iFormationCenter.mangouser ||iFormationCenter.mangouser == "") {
          callback(null, {  response:" Undefined mangopay user for Formation Center " + formationCenterName});
          return;
        }


        ///use asyn series
        /// Create Natural User and Wallet
        /// Register card bank
        /// Transfer money to user wallet to formationcenter wallet
        /// return ok
        buyerData = {}

        debiteFundsEx =  {
          Currency:currency,
          Amount: String(centsAmount)
        }

        ///10% money for may platform
        feesEx = {
          Currency: currency,
          Amount:  String(feedsAmount)
        }
        async.series({

          registeruserwallet: function(callback) {
              config  = { currency:currency}
              PaymentService.createNaturalWallet( config, userNaturalData,  // var CustomerServices = require('../../api/services/CustomerService')
                function resultServices ( err, result ) {

                  if (err)  callback(err,null)

                  buyerData.wallet = result.wallet
                  buyerData.user = result.user
                  callback(null,buyerData);
                });
            },
            registerusercard: function (callback){
                PaymentService.createCard( userCard,  buyerData.user,  // var CustomerServices = require('../../api/services/CustomerService')
                  function resultServices ( err, result ) {
                    if (err)  callback(err,null)

                    buyerData.card = result.card
                    callback(null,buyerData);
                  })
            },
            //,
            payin: function(callback){


              PaymentService.makeBuyToMango(  buyerData.user, buyerData.wallet, buyerData.card,debiteFundsEx, feesEx,  // var CustomerServices = require('../../api/services/CustomerService')
                function resultServices ( err, result ) {
                  if (err) callback(err,null)

                  callback(null,buyerData);
                });

            },
            transfermoney: function (callback){

              PaymentService.transferWalletToWallet( buyerData.user, buyerData.wallet, iFormationCenter.mangouser , iFormationCenter.mangowallet  ,debiteFundsEx, feesEx,  // var CustomerServices = require('../../api/services/CustomerService')
                function resultServices ( err, result ) {

                  if (err) callback(err,null)

                  callback(null,resultCostumerUpdate);

                });

            }
          },
          function(err, results) {
            // results is now equal to: {one: 1, two: 2}
            if (err)
              return callback({response:"ERROR", msg:err});

            console.log("**** Last commands **** ")
            //var valResult = {resultFormation }
            //return valResult
            callback({response:"OK"});
          });



      })
    })
  }
};
