/**
 * Created by dionis on 6/23/2016.
 */
module.exports = {



  /**
   * `PayController.createwallet()`
   *  A wallet is for FormationCenter recibe formation center id
   */
  createwallet: function (config, legalUserValues, callback) {


    //Find data in Configuration document

    var appuser = 'formationfinder';
    var apppassphrase = '7stCaHPZ9XFMCqteMYvCw99ELtDNCrNVcs3OPVzZLDSZiysTpN';

    Configuration.findOne( ).exec(function ConfigurationFounded(err, iConfiguration) {
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


        var formationCenterName = config.name;
        var currencyParam = config.currency;
        var formationCenter = {};

        if ( !formationCenterName || formationCenterName == "")
          callback( { response: "Undefined Formation Center´s name"});

        ///Search by formation center syncronized
        FormationCenter.findOne({name:formationCenterName}).exec( function (err, iFormationCenters) {
          if (err)
            return  { response:err }
          iFormationCenter = iFormationCenters[0]
          if (!iFormationCenter)
            callback( { response: "No exist Formation Center with name ".formationCenterName })

          formationCenter = iFormationCenter


          moment  = require("moment")

          ///Initialize Mangopay library
          //  version: 'v2.01',
          var mango = require('mangopay')({
            username: appuser,
            password: apppassphrase,
            production: false
          })

        var legalUserData = {
              name : 'mycompany.com',
              email: 'info@mycompany.com',
              legalpersonType: 'BUSINESS',
              legalRepresentativeFirstName: 'Inoid',
              legalRepresentativeLastName: 'Doe',
              legalRepresentativeEmail: 'john_doe@mycompany.es',
              headquartersAddress: 'Canal Street, Madrid, Spain',
              legalRepresentativeAdress: 'Canal Street, Madrid, Spain',
              legalRepresentativeBirthday: moment('300681', 'DDMMYY').unix(),
              legalRepresentativeCountryOfResidence: 'ES',
              legalRepresentativeNationality: 'ES'

        }

        ///Validate user data parameters
        if (legalUserValues) {
          legalUserData = legalUserValues;
        }

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
        }, function(err, user, resD){

          if ( err) {
            console.log('err', err);
            callback( { response: err})
          }

          console.log('user', user);
          console.log('res', resD.statusCode);

          ///Get new user data validate if created
          /*
           { FirstName: 'Ada',
           LastName: 'Lovelace',
           Address: 'C/ Larios, 1, 29015, Málaga',
           Birthday: 1300186358,
           Nationality: 'ES',
           CountryOfResidence: 'ES',
           Occupation: null,
           IncomeRange: null,
           ProofOfIdentity: null,
           ProofOfAddress: null,
           PersonType: 'NATURAL',
           Email: 'ada.lovelace@gmail.com',
           Id: '4317773',
           Tag: null,
           CreationDate: 1415987431 }
           */

          var userdata = user;

          if ( !userdata )
            callback({respose: "Not user data values"})
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

            if ( err )
              return {  response: err }

            console.log('err', err);

            console.log('wallet', wallet);

            console.log('res', res.statusCode);

            console.log(iFormationCenter);

            console.log("nombre",formationCenterName);

            //Register a bank account for the seller
            //Erase in production mode
            backCountData = {
               ownername: "Simone de Beauvoir",
               type: "IBAN",
               ownerAddress: "Gran Vía, Madrid",
              iban: "FR3020041010124530725S03383",
              bic: "CRLYFRPP"
            }

            if (legalUserData.backCountData) {
              backCountData = backCountData;
            }

            mango.bank.create({
              OwnerName: backCountData.ownername,
              UserId: userdata.Id,
              Type: backCountData.type,
              OwnerAddress: backCountData.ownerAddress,
              IBAN: backCountData.iban,
              BIC: backCountData.bic
            }, function(err, bankaccount, res){

              if ( err )
                callback( { response: err})


              FormationCenter.update({id:iFormationCenter.id} , {walletid:wallet.Id, mangouserid: userdata.Id, mangobankid: bankaccount.Id, mangobankbic:backCountData.bic }).exec( function (err, jFormationCenter) {

                if (err)
                  callback( {response: "Error in FormationCenter update data"})

                callback( {
                  response: 'OK',
                  userid: userdata.Id,
                  walletid:wallet.Id,
                  bankaccountid:bankaccount.Id,
                  formationcenter: jFormationCenter.name
                });
              })
            });

        });
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

    if (!formationcenter || formationcenter == "")
      callback({  response: "Undefined Formation Center´s name"});

    /*
    if (!userValue || userValue == "")
      callback({ response: "Undefined buyer´s data "})
   */
    if (!mount ||mount == "" || mount <= 0 )
      callback({ response: "Undefined mount"})

    if (!currency ||currency == "" )
      callback({ response: "Undefined currency"})

    ///Validate currency

  console.log("==========")
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

      console.log("==========")

      ///Search by formation center syncronized
      FormationCenter.findOne({name:formationCenterName}).exec( function (err, iFormationCenter) {
        if (err)
          callback({ response: err})

        if (!iFormationCenter)
          callback(null,  {  response: "Not exist Formation Center with name ".formationCenterName })

        ///If formation center data for make trasference is errr

        if ( !iFormationCenter.walletid || !iFormationCenter.mangouserid || !iFormationCenter.mangobankid || !iFormationCenter.mangobankbic)
          callback( {  response: "Formation Center with name " + formationCenterName +  " not have data for make trasference" })
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
        if (userValue.cardData && userValue.firstName) {
          buyerData = userValue
        }


        ////Create a User and a Wallet for the buyer
        mango.user.signup({
          FirstName: buyerData.firstName , // Required
          LastName:  buyerData.LastName ,    // Required
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
          console.log('err', err);

          if (err)
            callback( { response: err})

          console.log('user', user);

          console.log('wallet', wallet);


          //Register a Card for the buyer
          mango.card.create({
            UserId: user.Id,
            CardNumber:  buyerData.cardData.cardNumber,
            CardExpirationDate: buyerData.cardData.cardExpirationDate,
            CardCvx: buyerData.cardData.cardCvx,
          }, function(err, card, res){

            if ( err )
              callback( { response: err})

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

              if( err)
                callback( { response: err})

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
                if( err)
                  return { response: err}
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
