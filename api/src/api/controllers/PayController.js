/**
 * PayController
 *
 * @description :: Server-side logic for managing pays
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `PayController.createwallet()`
   *  A wallet is for FormationCenter recibe formation center id
   */
  createwallet: function (req, result) {

    var testname = 'formationfinder';
    var testpassphrase = '7stCaHPZ9XFMCqteMYvCw99ELtDNCrNVcs3OPVzZLDSZiysTpN';


    var formationCenterName = req.param("name");
    var currencyParam = req.param("currency");
    var formationCenter = {};
    if ( !formationCenterName || formationCenterName == "")
       return next ("Undefined Formation Center´s name");

    ///Search by formation center syncronized
    FormationCenter.findOne({name:formationCenterName}).exec( function (err, iFormationCenter) {
      if (err)
        return next (err)

      if (!iFormationCenter)
        return next ("No exist Formation Center with name " + formationCenterName )
      formationCenter = iFormationCenter
      moment  = require("moment")
      var mango = require('mangopay')({
        username: testname,
        password: testpassphrase,
        production: false
      })

      console.log("Create walletid")

      //  version: 'v2.01',
      mango.user.createLegal({
        Name: 'mycompany.com',
        Email: 'info@mycompany.com',
        LegalPersonType: 'BUSINESS',
        LegalRepresentativeFirstName: 'John',
        LegalRepresentativeLastName: 'Doe',
        LegalRepresentativeEmail: 'john_doe@mycompany.es',
        HeadquartersAddress: 'Canal Street, Madrid, Spain',
        LegalRepresentativeAdress: 'Canal Street, Madrid, Spain',
        LegalRepresentativeBirthday: moment('300681', 'DDMMYY').unix(),
        LegalRepresentativeCountryOfResidence: 'ES',
        LegalRepresentativeNationality: 'ES',
      }, function(err, user, resD){
        if ( err) {
          console.log('err', err);
          return res.json(err)
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
          return next ("!!Not user data values")
        var ownersArray = [];
        ownersArray.push(userdata.Id);

        /*
        mango.wallet.create({
          Owners: ["1167492"], // Required
          Description: "A very cool wallet", // Required, default: 'wallet'
          Currency: "EUR", // Required, default: 'EUR'
          Tag: "your custom tag"
        }, function(err, wallet, res){
          console.log('err', err);
          console.log('wallet', wallet);
          console.log('res', res.statusCode);
        });
        */

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
          console.log('err', err);
          console.log('wallet', wallet);
          console.log('res', res.statusCode);

          ////Update data  in  FormationFinder
          console.log(iFormationCenter);
          console.log("nombre",formationCenterName);
          FormationCenter.update({id:iFormationCenter.id} , {"walletid":wallet.Id, "mangouserid": userdata.Id }).exec( function (err, jFormationCenter) {

            if (err)
              return next ("Error in FormationCenter update data !!!!")

            formationData = jFormationCenter[0]
            return result.json({
              response: 'OK',
              userid: userdata.Id,
              walletid:wallet.Id,
              formationcenter: formationData.name

            });
          })
        });
      });
    });

  },
  /**
   * `PayController.makepay()`
   * User data
   */
  createwalletex: function (req, res) {
    var formationcenter = req.param("formationcentername")
    var currencyReq = req.param("currency")
    var legalUserValues = req.param("formationdata")
    var config = {
      name: formationcenter,
      currency:currencyReq
    }


     PaymentService.createwallet(config, legalUserValues ,function (err, result){

      return res.json(result)
    })
  },
  /**
   * `PayController.makepay()`
   * User data
   */
  makepaymentex: function (req, res) {
    userValue = req.param("userdata")
    mount = req.param("price")
    formationcenter = req.param("formationcentername")
    currency = req.param("currency")
    //console.log("sasda "  +  formationcenter);
    /*PaymentService.makepayment(userValue, mount, formationcenter, currency, function (err, result){

     return res.json(result)
     })*/
    return res.json({
      value: 'ok',
      info: 'Payment result: satisfactory'
    });
  },

  /**
   * `PayController.makepay()`
   * User data
   */
  makepayment: function (req, res) {
    userValue = req.param("userdata")
    cardValue = req.param("cardata")

    ///Validate cardValue

    mount = req.param("price")


    //Validate price

    formationcenter = req.param("formationcentername")

    ///Validate formationcenter name


    currency = req.param("currency")

    //Validate currency

    ///Find walletid and userid in Formationcenter register

    FormationCenter.findOne({name:formationcenter}).exec(function formationResult(err, formationCenterData){
      if (err)
         return res.json({response:"ERROR", message:err})
      if ( typeof formationCenterData.walletid == "undefined" || typeof formationCenterData.walletid == "undefined")
        return res.json({response:"ERROR", message:"Formation Center " + formationcenter + " don't have data for make payment"})

      var naturalUserData = {
      FirstName: "Dionis", // Required
      LastName: "HugoSI",    // Required
      Birthday:  moment('300680', 'DDMMYY').unix(),  // Required,  // Required
      Nationality: "FR", // Required, default: 'FR'
      CountryOfResidence: "FR", // Required, default: 'FR'
      Address: {
        AddressLine1: "1 Mangopay Street",
        AddressLine2: "The Loop",
        City: "Paris",
        Region: "Ile de France",
        PostalCode: "75001",
        Country: "FR"

      },
      Occupation: "Writer",
      IncomeRange: "6",
      ProofOfIdentity: null,
      ProofOfAddress: null,
      PersonType: "NATURAL",
      Email: "victor@hugo.com",
      Tag: "custom tag"

    }

    //Blog workflow
    //var naturalUserData = {
    //  Email: "ada.lovelace@gmail.com",
    //  FirstName: "Ada",
    //  LastName: "Lovelace",
    //  Address: "C/ Larios, 1, 29015, Málaga",
    //  Birthday: 1300186358,
    //  Nationality: "ES",
    //  CountryOfResidence: "ES"
    //}


    config = {currency: "EUR"}
    config.currency = currency;

    ///Create natural user and wallet
    PaymentService.createNaturalWallet(config, userValue,  // var CustomerServices = require('../../api/services/CustomerService')
      function resultServices(err, result) {
        if (err) {
          console.log(err)
            return res.json({response:"ERROR", message:err })
        }



        ///Register user card to mangopay

        cardValueEx = {
          CardNumber: '4706750000000017',
          CardExpirationDate: "1223",  //12-06-2023  moment('0623', 'MMDD').unix()
          CardCvx: '342',
        }

        console.log("CALL FUNCTION")

        PaymentService.createCard( cardValue, config,  result.user,  // var CustomerServices = require('../../api/services/CustomerService')
          function resultServices ( err, resultCard ) {
           if (err) {
              console.log(err)
              return res.json({response:"ERROR", message:err })
            }
            //User card parameter card number undefined

            //console.log("=======" +  result.card)

            ///Remmeber money count is in cents 1100 centes
            testAmount = 12; //It's 120 euro
            debiteFundsEx =  {
              Currency: "EUR",
              Amount: mount
            }


            ///10% money for may platform

            ///Get data about money pay to our marketplace
            ourMarketPlacePrice = 0
            feesEx = {
              Currency: "EUR",
              Amount:  ourMarketPlacePrice
            }

            ///Payin to Mango
            PaymentService.makeBuyToMango( result.user, result.user, result.wallet  , resultCard.card ,debiteFundsEx, feesEx,  // var CustomerServices = require('../../api/services/CustomerService')
              function resultServices ( err, result ) {
                if (err) {
                  console.log(err)
                  return res.json({response:"ERROR", message:err })
                }


                ///Transfer the user walletid to Formationcenter Wallet id.
                PaymentService.transferWalletToWallet( result.user, result.wallet, formationCenterData.mangouser, formationCenter.mangowallet ,debiteFundsEx, feesEx,  // var CustomerServices = require('../../api/services/CustomerService')
                  function resultServices ( err, result ) {
                    if (err) {
                      console.log(err)
                      return res.json({response:"ERROR", message:err })
                    }

                    return res.json({response:"OK", walleid : user.wallet, userid:result.id, carid:resultCard.card})


                  });



              });


          })

       });



      });



    ///Save idwallet and user Mangopay






    //console.log("sasda "  +  formationcenter);
    /*PaymentService.makepayment(userValue, mount, formationcenter, currency, function (err, result){

     return res.json(result)
     })*/
    return res.json({
      value: 'ok',
      info: 'Payment result: satisfactory'
    });
  },


  /**
   * `PayController.makepay()`
   * User data
   */
  //createwalletToFormationcenter: function (req, res) {
  //  userValue = req.param("userdata")
  //  mount = req.param("price")
  //  formationcenter = req.param("formationcentername")
  //
  //  ///Find formationCenter with name
  //  Formationcenter.findOne({name:formationcenter}).exec( function formName ( err, results)
  //  {
  //    if (err) return res.json({response:"ERROR", msg: err.message})
  //
  //    formationCenterData = results;
  //
  //    var legalUserData =  {
  //      Tag: "custom meta",
  //      HeadquartersAddress: {
  //        AddressLine1: formationCenterData.address,
  //        AddressLine2: formationCenterData.address,
  //        City: formationCenterData.city,
  //        Region: formationCenterData.city,
  //        PostalCode: formationCenterData.zipCode,
  //        Country: "FR"
  //      },
  //      LegalPersonType: "BUSINESS",
  //      Name: formationCenterData.name,
  //      LegalRepresentativeAddress: {
  //        AddressLine1: formationCenterData.address,
  //        AddressLine2: formationCenterData.address,
  //        City: formationCenterData.city,
  //        Region: formationCenterData.city,
  //        PostalCode: formationCenterData.zipCode,
  //        Country: "FR"
  //      },
  //      LegalRepresentativeBirthday: new Date().getTime(),
  //      LegalRepresentativeCountryOfResidence: "ES",
  //      LegalRepresentativeNationality: "FR",
  //      LegalRepresentativeEmail: formationCenterData.email,
  //      LegalRepresentativeFirstName: formationCenterData.name,
  //      LegalRepresentativeLastName: formationCenterData.name,
  //      Email: formationCenterData.email
  //  }
  //
  //    currency = req.param("currency")
  //    PaymentService.createwallet( config,legalUserData,   // var CustomerServices = require('../../api/services/CustomerService')
  //      function resultServices ( err, result ) {
  //
  //        if (err) return res.json({response:"ERROR", msg: err.message})
  //        console.log("Mangopay results", result)
  //        console.log("Update formation center")
  //        Formationcenter.update({name:formationcenter},{mangowallet:result.wallet,mangouser:result.user }).exec( function formName ( err, results)
  //        {
  //
  //          if (err) return res.json({response:"ERROR", msg: err.message})
  //
  //          return res.json({
  //            response: 'OK',
  //            wallet: result.wallet,
  //            user:result.user,
  //            formationcener:formationCenterData.id
  //          });
  //        })
  //      });
  //  }
  //})
  //
  //
  //
  ///**
  // * `PayController.makepay()`
  // * User data
  // */
  //makebuyer: function (req, res) {
  //  userValue = req.param("userdata")
  //  creditCardData = req.param("creditCardData")
  //  formationID = req.param("formationidentifier")
  //
  //  ///-----------------------------------------
  //
  //
  //  //Search the formation.
  //  Formation.findOne(formationID).populate("formationcenter").
  //    .exec(function (err, formationFounded) {
  //      // body...
  //      if(err){
  //        return res.json({response:"ERROR", message:err});
  //      }
  //      ///Verify if formationcenter have walletid and userid mangopay information
  //
  //      //If the formation does'nt exist or is full send an error.
  //      if(formationFounded === undefined){
  //        return res.json({err: 'No formation match that id: ' + formationID.toString()});
  //      }
  //
  //      if(formationFounded.isFull == true){
  //        return res.json({err: 'The formation is full.'});
  //      }
  //
  //      if ( typeof formationFounded.formationcenter.mangowallet  == "undefined" || typeof formationFounded.formationcenter.mangouser  == "undefined")
  //        return res.json({response:"ERROR", message:"Formation center don´t have Mangopay information"})
  //
  //      ////Crear usuario legal y obtener un wallet para el
  //
  //      var naturalUserData = {
  //        FirstName: userValue.firstName, // Required
  //        LastName: userValue.name",    // Required
  //        Birthday:  userValue.birthDate,  // Required,  // Required
  //        Nationality: "FR", // Required, default: 'FR'
  //        CountryOfResidence: "FR", // Required, default: 'FR'
  //        Address: {
  //          AddressLine1: userValue.address,
  //          AddressLine2: userValue.address,
  //          City: userValue.city,
  //          Region: userValue.city,
  //          PostalCode: userValue.zipCode,
  //          Country: "FR"
  //
  //        },
  //        Occupation: "",
  //        IncomeRange: "6",
  //        ProofOfIdentity: null,
  //        ProofOfAddress: null,
  //        PersonType: "NATURAL",
  //        Email: userValue.email,
  //        Tag: "custom tag"
  //
  //      }
  //
  //
  //  ////Register Cards
  //
  //  ///Remmeber money count is in cents 1100 centes
  //
  //
  //      config  = { currency:"EUR"}
  //      PaymentService.createNaturalWallet( config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
  //        function resultServices ( err, result ) {
  //          if ( err) return res.json({
  //            response: "ERROR",
  //            msg: err.message
  //          })
  //
  //          uservalueWalletId = result.wallet
  //          uservalueMangoUser = result.user
  //
  //
  //          ////With price create objet for payin
  //          ///Remenber in Euro cents
  //
  //          testAmount = 1200; //It's 120 euro
  //          debiteFundsEx =  {
  //            Currency: "EUR",
  //            Amount: (formationFounded.price*100)
  //          }
  //
  //          ///10% money for may platform
  //          feesEx = {
  //            Currency: "EUR",
  //            Amount:  (0)
  //          }
  //
  //
  //          ///View home convert timestamp to corret date in tarjet
  //          cardValueEx = {
  //            CardNumber: creditCardData.number,
  //            CardExpirationDate: "0623",  //12-06-2023  moment('0623', 'MMDD').unix()
  //            CardCvx: '342',
  //          }
  //
  //          console.log("CALL FUNCTION")
  //
  //          PaymentService.createCard( cardValueEx, config, result.user,  // var CustomerServices = require('../../api/services/CustomerService')
  //            function resultServices ( err, result ) {
  //              if (err) return res.json({response:"ERROR", message:err})
  //              //User card parameter card number undefined
  //
  //
  //             carddata = result.card.Id
  //
  //              PaymentService.makeBuyToMango( uservalueMangoUser, uservalueWalletId,  formationFounded.formationcenter.mangowallet  , carddata ,debiteFundsEx, feesEx,  // var CustomerServices = require('../../api/services/CustomerService')
  //                function resultServices ( err, result ) {
  //                  if (err) return res.json({response:"ERROR", message:err})
  //
  //                    return res.json({response:"OK", data:result})
  //
  //                });
  //              })
  //           });
  //         });
  //}



};

