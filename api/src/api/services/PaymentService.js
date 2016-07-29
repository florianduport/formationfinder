/**
 * Created by dionis on 6/23/2016.
 */
module.exports = {

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
       version: 'v2.0',
       production: false
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


    this.findMangoPayConfiguration( function(err, mango) {



    if ( typeof config == "undefined") {
      callback(null, {response: "ERROR",
        message: "Config parameter undefined"})
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




    var legalUserData = {
              name : 'mycompany.com',
              email: 'info@mycompany.com',
              legalpersonType: 'BUSINESS',
              legalRepresentativeFirstName: 'Inoidssss',
              legalRepresentativeLastName: 'Doessss',
              legalRepresentativeEmail: 'john_doe@mycompany.es',
              headquartersAddress: 'Canal Street, Madrid, Spain',
              legalRepresentativeAdress: 'Canal Street, Madrid, Spain',
              legalRepresentativeBirthday: moment('300681', 'DDMMYY').unix(),
              legalRepresentativeCountryOfResidence: 'ES',
              legalRepresentativeNationality: 'ES'

        }

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
        mango.user.createLegal({
          Name: legalUserData.name,
          Email: legalUserData.email,
          LegalPersonType: legalUserData.legalpersonType,
          LegalRepresentativeFirstName: legalUserData.legalRepresentativeFirstName,
          LegalRepresentativeLastName: legalUserData.legalRepresentativeLastName,
          LegalRepresentativeEmail: legalUserData.legalRepresentativeEmail,
          HeadquartersAddress: legalUserData.headquartersAddress,
          LegalRepresentativeAdress: legalUserData.legalRepresentativeAdress,
          LegalRepresentativeBirthday: legalUserData.legalRepresentativeBirthday,
          LegalRepresentativeCountryOfResidence: legalUserData.legalRepresentativeCountryOfResidence,
          LegalRepresentativeNationality: legalUserData.legalRepresentativeNationality


          //Email: legalUserData.email,
          //LegalPersonType: legalUserData.legalpersonType,
          //"Tag": "custom meta",
          //"HeadquartersAddress": {
          //  "AddressLine1": "1 Mangopay Street",
          //  "AddressLine2": "The Loop",
          //  "City": "Paris",
          //  "Region": "Ile de France",
          //  "PostalCode": "75001",
          //  "Country": "FR"
          //},
          //"Name": "Mangopay Ltd",
          //"LegalRepresentativeAddress": {
          //  "AddressLine1": "1 Mangopay Street",
          //  "AddressLine2": "The Loop",
          //  "City": "Paris",
          //  "Region": "Ile de France",
          //  "PostalCode": "75001",
          //  "Country": "FR"
          //},
          //"LegalRepresentativeBirthday": 1463496101,
          //"LegalRepresentativeCountryOfResidence": "ES",
          //"LegalRepresentativeNationality": "FR",
          //"LegalRepresentativeEmail": "support@mangopay.com",
          //"LegalRepresentativeFirstName": "Joe",
          //"LegalRepresentativeLastName": "Blogs"

        }, function(err, user, resD){

          if ( err) {
            console.log('err', err);
            callback(null, {response: "ERROR",
              message: err})
            return;
          }



          var userdata = user;

          if ( !userdata ) {
            callback({respose: "Not user data values"})
            return;
          }
          var ownersArray = [];
          ownersArray.push(userdata.Id);



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

            if ( err ) {
              callback(null, {response: "ERROR",
                message: err})
              //return;
            }

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

    var naturalUserData = {
      FirstName: "Victor", // Required
      LastName: "Hugo",    // Required
      Birthday: 1300186358,  // Required
      Nationality: "FR", // Required, default: 'FR'
      CountryOfResidence: "FR", // Required, default: 'FR'
      Address: "1 rue des Misérables, Paris",
      Occupation: "Writer",
      IncomeRange: "6",
      ProofOfIdentity: null,
      ProofOfAddress: null,
      PersonType: "NATURAL",
      Email: "victor@hugo.com",
      Tag: "custom tag",

    }

    ///Validate user data parameters for developmet parameters
    if (typeof naturalUserValues != "undefined") {
      naturalUserData = naturalUserValues;
    }
    else { //Validate parameters

      if (typeof naturalUserData.FirstName != "undefined") {
        callback(null, {response: "ERROR",
          message: "User value firstname undefined"})
      }
      else if (typeof naturalUserData.LastName != "undefined") {
        callback(null, {response: "ERROR",
          message: "User value lastname undefined"})
      }
      else if (typeof naturalUserData.FirstName != "undefined") {
        callback(null, {response: "ERROR",
          message: err})
      }
      else if(typeof naturalUserData.Birthday != "undefined") {
        callback(null, {response: "ERROR",
          message: "User value birthday undefined"})
      }
      else if(typeof naturalUserData.CountryOfResidence != "undefined") {
        callback(null, {response: "ERROR",
          message: "User value country of residence undefined"})
      }
      else if(typeof naturalUserData.Nationality != "undefined") {
        callback(null, {response: "ERROR",
          message: "User value nationality undefined"})
      }
      ///Required paramenter view Mangopay documentation

      ///Validate estandar
      /*          Nationality
       CountryOfResidence
       legalpersonType*/
    }
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
      console.log('err', err);
      console.log('user', user);
      console.log('wallet', wallet);

      if ( err ) {
        callback(null, {response: "ERROR",
          message: err})
        //return;
      }

      callback(null, {response: "OK",
        wallet: wallet.Id,
        user: user.Id})
    });

  },
  /***
   *   Create bank count to mangopay user
   *
   *
   */
  createBankCount: function( bankCountValues, userid,callback) {

    backCountData = {
      ownername: "Simone de Beauvoir",
      type: "IBAN",
      ownerAddress: "Gran Vía, Madrid",
      iban: "FR3020041010124530725S03383",
      bic: "CRLYFRPP"
    }

    if (typeof userid == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist userid parameter"
      })
    ///For development porpouses
    if ( bankCountValues ) {
      backCountData = bankCountValues;
    }
    findMangoPayConfiguration( function(err, mango) {
    mango.bank.create({
        OwnerName: backCountData.ownername,
        UserId: userid,
        Type: backCountData.type,
        OwnerAddress: backCountData.ownerAddress,
        IBAN: backCountData.iban,
        BIC: backCountData.bic
      }, function(err, bankaccount, res) {

      if (err) {
        callback(null, {
          response: "ERROR",
          message: err
        })
      }

      callback(null, {
        response: "OK",
        bankcount: bankaccount
      });
    });
    });
  },
  createCard: function( cardValues,config,  userid,callback) {

    if ( typeof config == "undefined") {
      callback(null, {response: "ERROR",
        message: "Config parameter undefined"})
      return;

    }

    ///Validate stadar in currency see documentation
    if ( typeof config.currency == "undefined" || config.currency == "") {
      callback(null, {response: "ERROR", message: "currecy value  undefined"})
      return;
    }

    var currencyParam = config.currency;
    if (typeof userid == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist userid parameter"
      })

    cardValueEx = {
      CardNumber: '4970100000000154',
      CardExpirationDate: '0216',
      CardCvx: '123',
    }

    if ( cardValues) {
      cardValueEx = cardValues
    }

    if (typeof cardValueEx.CardNumber != "undefined") {
      callback(null, {response: "ERROR",
        message: "User card parameter card number undefined"})
    }
    else if (typeof cardValueEx.CardExpirationDate != "undefined") {
      callback(null, {response: "ERROR",
        message: "User card parameter card expiration date undefined"})
    }
    else if (typeof cardValueEx.CardCvx != "undefined") {
      callback(null, {response: "ERROR",
        message: "User card parameter cardcvx undefined"})
    }
    findMangoPayConfiguration( function(err, mango) {
      mango.card.create({
        UserId: userid,
        CardNumber: cardValueEx.CardNumber,
        CardExpirationDate: cardValueEx.CardExpirationDate,
        CardCvx: cardValueEx.CardCvx,
      }, function (err, card, res) {
        if (err) {
          callback(null, {
            response: "ERROR",
            message: err
          })
          //return;
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

        callback(null, {
          response: "OK",
          card: card
        })
      });
    });
  },
/*
*  Withdraw money from a wallet to a bank account:
* */
  withdrawWalletToBank : function( userid, walletid, bankcountid, bic, debitedFunds, fees, callback) {
	   debiteFundsEx = {
        Currency:"EUR",
        Amount:"9000"
    }
	   feesEx = {
        Currency:"EUR",
        Amount:"0"
    }
	   if (typeof bic == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist bic parameter"
      })

	  if (typeof userid == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist userid parameter"
      })

	   if (typeof walletid == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist walletid parameter"
      })

	  if (typeof bankcountid == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist bankcountid parameter"
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



	  findMangoPayConfiguration( function(err, mango) {
		  mango.bank.wire({
			AuthorId: userid,
			DebitedWalletId: walletid,
			DebitedFunds: debiteFundsEx,
			Fees: feesEx,
			BankAccountId:bankcountid,
			BIC: bic
		}, function(err, wire, res){0
			  if (err) {
        callback(null, {
          response: "ERROR",
          message: err
        })
      }

      callback(null, {
        response: "OK",
        bankcount: wire
      });
});

	  });


  } ,
  /**
   *
   *
     makeBuyToMango: Send payment to user wallet


   */
  makeBuyToMango: function (userid, walletid, cardid, debiteFunds, fees) {

    ///10% money for may platform
    // In my case I charge a fee to the buyer so, let’s say that the product costs
    // 100€ and the fee we apply is 10%, I should set the amount debited to 110€ (11000 cents).

    debiteFundsEx =  {
      Currency: "EUR",
      Amount: "11000"
    }

    ///10% money for may platform
    feesEx = {
      Currency: "EUR",
      Amount: "1000"
    }
    if (typeof userid == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist userid parameter"
      })

    if (typeof walletid == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist walletid parameter"
      })

    if (typeof cardid == "undefined")
      callback(null,  {
        response: "ERROR",
        message: "No exist cardid parameter"
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


    findMangoPayConfiguration( function(err, mango) {


      mango.payin.createByToken({
        AuthorId: userid,        // Required (The user ID of the Payin transaction’s author)
        CreditedUserId: userid, // Required (The ID of the owner of the credited wallet)
        DebitedFunds: {             // Required
          Currency: "EUR",
          Amount: 10000
        },
        Fees: {               // Required
          Currency: "EUR",
          Amount: 100
        },
        CreditedWalletId: walletid,  // Required (The ID of the credited wallet)
        CardId: cardid,            // Required
        SecureMode: "DEFAULT",
        SecureModeReturnURL: "",
        Tag: "payin"

      }, function (err, payin, res) {
        console.log('err', err);
        console.log('payin', payin);
        console.log('res', res.statusCode);

        if (err) {
          callback(null, {
            response: "ERROR",
            message: err
          })
        }

        callback(null, {
          response: "OK",
          payin: payin
        });
      })
    });
},
  transferWalletToWallet: function (buyerUserId, buyerWalletId, sellerUserId, sellerWalletId, debitedFunds, fees ) {
///10% money for may platform
    // In my case I charge a fee to the buyer so, let’s say that the product costs
    // 100€ and the fee we apply is 10%, I should set the amount debited to 110€ (11000 cents).

    debiteFundsEx =  {
      Currency: "EUR",
      Amount: "11000"
    }

    ///10% money for may platform
    feesEx = {
      Currency: "EUR",
      Amount: "1000"
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


    findMangoPayConfiguration( function(err, mango) {
    mango.wallet.transfer({
      AuthorId : buyerUserId,
      DebitedFunds: debiteFundsEx,
      Fees : feesEx,
      DebitedWalletID : buyerWalletId,
      CreditedWalletID : sellerWalletId,
      CreditedUserId : sellerUserId,
      Tag : "DefaultTag"
    }, function(err, transfer, res){
      if (err) {
        callback(null, {
          response: "ERROR",
          message: err
        })
      }

      callback(null, {
        response: "OK",
        payin: transfer
      });
    });

    });

  },
  /**
   * `PayController.makepay()`
   * User data
   */
  makepayment: function (userValue, mount, formationcenter, currency, callback) {

    var appuser = 'formationfinder';
    var apppassphrase = '7stCaHPZ9XFMCqteMYvCw99ELtDNCrNVcs3OPVzZLDSZiysTpN';

    if (!formationcenter || formationcenter == "") {
      callback(null, {  response: "Undefined Formation Center´s name"});
      return;
    }

    /*
    if (!userValue || userValue == "")
      callback({ response: "Undefined buyer´s data "})
   */
    if (!mount ||mount == "" || mount <= 0 ) {
      callback(null, {response: "Undefined mount"})
      return;
    }

    if (!currency ||currency == "" ) {
      callback(null,{response: "Undefined currency"})
      return;
    }

    ///Validate currency


    Configuration.findOne( ).exec(function ConfigurationFounded(err, iConfiguration) {
      /*
      if ( !iConfiguration.appmangouser || !iConfiguration.appmangopassphr ) {
        //return next(err);
        ///Create tmp for test
        Configuration.update({},{ appmangouser : appuser, appmangopassphr : apppassphrase}).exec(function (err, Config){
          configuration = Config;
          console.log("Creado el objeto en BD");
        });
        console.log("Se ejecuto el codigo de error");
      }
      else {
        appuser = iConfiguration.appmangouser;
        apppassphrase = iConfiguration.appmangopassphr;
      }

     */
      var formationCenterName = formationcenter;
      var currencyParam = currency;
      var formationCenter = {};



      ///Search by formation center syncronized
      FormationCenter.findOne({name:formationCenterName}).exec( function (err, iFormationCenter) {
        if (err) {
          callback(null,{response: err})
          return;
        }

        if (!iFormationCenter) {
          callback( null, {response: "Not exist Formation Center with name ".formationCenterName})
          return;
        }

        ///If formation center data for make trasference is errr

        if ( !iFormationCenter.walletid || !iFormationCenter.mangouserid || !iFormationCenter.mangobankid || !iFormationCenter.mangobankbic)
          callback( null, {  response: "Formation Center with name " + formationCenterName +  " not have data for make trasference" })
        formationCenter = iFormationCenter


        moment  = require("moment")

        ///Initialize Mangopay library
        //  version: 'v2.01',
        var mango = require('mangopay')({
          username: appuser,
          password: apppassphrase,
          production: false
        })


        buyerData = {
          firstName: "Victor", // Required
          lastName:"Hugo",   // Required
          birthday:  moment('300681', 'DDMMYY').unix(),  // Required
          nationality: "FR", // Required, default: 'FR'
          countryOfResidence: "FR", // Required, default: 'FR'
          address: "1 rue des Misérables, Paris",
          occupation: "Writer",
          incomeRange: "6",
          proofOfIdentity: null,
          proofOfAddress: null,
          personType: "NATURAL",
          email: "victor@hugo.com",
          tag: "custom tag",
          cardData: {
            userId:'2565355',
            cardNumber: '4970100000000154',
            cardExpirationDate:  moment('30062099', 'DDMMYYYY').unix(),
            cardCvx: '123'
          }
        }

        ///Asig userVAlue parameters
        if (userValue !== undefined && (userValue.cardData !== undefined && userValue.firstName !== undefined))
         {
          buyerData = userValue
        }

        ////Create a User and a Wallet for the buyer
        mango.user.signup({
          FirstName: buyerData.firstName , // Required
          LastName:  buyerData.lastName ,    // Required
          Birthday:  buyerData.birthday ,  // Required
          Nationality:buyerData.nationality , // Required, default: 'FR'
          CountryOfResidence: buyerData.countryOfResidence , // Required, default: 'FR'
          Address: buyerData.address,
          Occupation:  buyerData.occupation,
          IncomeRange:  buyerData.incomeRange,
          ProofOfIdentity:buyerData.proofOfIdentity,
          ProofOfAddress: buyerData.proofOfAddress,
          PersonType: buyerData.personType,
          Email: buyerData.email,
          Tag:  buyerData.tag,
        }, function (err, user, wallet) {


          if (err) {
            callback(null, {response: "ERROR",
                            message: err})
            return;
          }

          if ( user ===  undefined) {
            callback( null, {
              response: "ERROR",
             message:"buyer user undefined",
            })
            return;
          }

          console.log('user', user);

          console.log('wallet', wallet);

          if ( wallet ===  undefined) {
            callback( null,  {
              response: "ERROR",
              message:"buyer walletss undefined",
            })
            return;
          }


          //Register a Card for the buyer
          mango.card.create({
            UserId: user.Id,
            CardNumber:  buyerData.cardData.cardNumber,
            CardExpirationDate: buyerData.cardData.cardExpirationDate,
            CardCvx: buyerData.cardData.cardCvx,
          }, function(err, card, res){

            if ( err ) {
              callback(null, {response: "ERROR",
                message: err})
              return;
            }

            // card; // mango card object
            // res; // raw 'http' response object => res.statusCode === 200


            /*

             mango.payin.createByToken({
             AuthorId: user.Id,
             CreditedUserId : user.Id,
             DebitedFunds: {
             Currency: "EUR",
             Amount: "11000"
             },
             Fees: {
             Currency: "EUR",
             Amount: "1000"
             },
             CreditedWalletID: walletId,
             CardId: cardId,
             SecureModeReturnURL:"https://www.myurl.com"

             }
             */

            ///Calculate amount fees set 10%
            var amountFeeds = (( productPrices/10)*100);
            console.log("Transaccion cost ",amountFeeds )

            var amount = productPrice + amountFeeds;
            console.log("Transaccion amount  ",amount )

            /*

            DebitedFunds: amount taken from the buyer credit card. Amounts are defined in cents.
                          In my case I charge a fee to the buyer so, let’s say that the product costs 100€
                          and the fee we apply is 10%, I should set the amount debited to 110€ (11000 cents).

            Fees: your fees taken on the DebitedFunds. In our example, I have said the fees were 10% of
                  the price product, so this field should be set to 10€ (1000 cents).
            */

            ///Make the payment to the buyer wallet (PayIn)
            ///Mangopay save trasference
            mango.payin.createByToken({
              AuthorId: user.Id,
              CreditedUserId : user.Id,
              DebitedFunds: {
                Currency: currency,
                Amount: amount
              },
              Fees: {
                Currency: currency,
                Amount: amountFeeds
              },
              CreditedWalletID: wallet.Id,
              CardId: car.CardId ,
              SecureModeReturnURL:"https://www.myurl.com"

            }, function(err, payin, res){

            //  err;
            //  payin;
            //  res;

              if( err) {
                callback(null, {response: "ERROR",
                  message: err})
                return;
              }

              ///      if ( !iFormationCenter.walletid || !iFormationCenter.mangouserid || !iFormationCenter.mangobankid || !iFormationCenter.mangobankbic
              /*

                mango.bank.wire({
              AuthorId: sellerUserId,
                DebitedWalletId: sellerWalletId,
                DebitedFunds:{
                Currency:"EUR",
                  Amount:"9000"
              },
              Fees:{
                Currency:"EUR",
                  Amount:"0"
              },
              BankAccountId:"12449209",
                BIC: "CRLYFRPP"
            }
              */

              var royalAmountTrasference =amount - amountFeeds;
              console.log("Amount to Formation Center seller ", royalAmountTrasference)

              mango.bank.wire({
                AuthorId: iFormationCenter.mangouserid,
                DebitedWalletId: iFormationCenter.walletid,
                DebitedFunds:{
                  Currency: currency,
                  Amount:royalAmountTrasference
                },
                Fees:{
                  Currency:currency,
                  Amount:"0"
                },
                BankAccountId:iFormationCenter.mangobankid,
                BIC: iFormationCenter.mangobankbic
              }, function(err, wire, res){0
                if( err) {
                  callback(null, {response: "ERROR",
                    message: err})
                  return;
                }

                // wire;
                // res;

                ///Save trasference data buyer, formation center name and mount

                MangoPayTrasference.create( {userwallet:wallet, userdata:user, nameformationcenter:iFormationCenter.name, buyeramount:amount, selleramount:royalAmountTrasference} ).then(function (user){
                  // configuration = user;
                  console.log("MangoPayTrasference objetc created");
                });

                callback( {
                  response: "OK",
                  buyerid:user.Id,
                  formationcetername:iFormationCenter.name,
                  sellerid:iFormationCenter.mangouserid,
                  mangopaytax:amountFeeds,
                  buyeramount:amount,
                  selleramout:royalAmountTrasference
                })
              });
            });
          })
        });


        });
      });
  }

};
