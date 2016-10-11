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
  createwallet: function (req, res, next) {

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
     PaymentService.makeWalletToFormationCenter(formationCenterName, function(err, result) {

       if (err)
         return res.json({response:"ERROR", message:err.message})

       return res.json(result)
     })
    });

  },
  /**
   * `PayController.makepay()`
   * Create
   */
  createnaturalwallet: function (req, res) {
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
  mangopayment: function (req, res, next) {





    userValue = req.param("userdata")

    if ( typeof userValue == "undefine")
      return res.json({response:"ERROR", message:"Parameter userValue undefined"})

    cardValue = req.param("cardata")

    if ( typeof cardValue == "undefine")
      return res.json({response:"ERROR", message:"Parameter cardValue undefined"})

    ///Validate cardValue

    mount = req.param("price")

    if ( typeof mount == "undefine")
      return res.json({response:"ERROR", message:"Parameter mount undefined"})
    //Validate price

    formationcenter = req.param("formationcentername")

    if ( typeof formationcenter == "undefine")
      return res.json({response:"ERROR", message:"Parameter formationcenter undefined"})

    ///Validate formationcenter name


    currency = req.param("currency")

    if ( typeof currency == "undefine")
      currency = "EUR"


    //Validate currency

    ///Find walletid and userid in Formationcenter register
    console.log("REALICE PAY")
    PaymentService.validateFormatinCenterInformation (formationcenter, function (err, result) {
    //FormationCenter.findOne({name:formationcenter}).exec(function (err, formationCenterData){



      if (result == false) {
         return res.json({response:"ERROR", message:"Formation Center make payment"})
      }
      else {
    config = {currency: "EUR"}
    config.currency = currency;

        var naturalUserData = {
          FirstName: userValue.firstName, // Required
          LastName: userValue.name,    // Required
          Birthday:userValue.birthDate,  // Required,  // Required
          Nationality: userValue.nacionality, // Required, default: 'FR'
          CountryOfResidence: userValue.country, // Required, default: 'FR'
          Address: {
            AddressLine1: userValue.address,
            AddressLine2: userValue.address,
            City: userValue.city,
            Region: userValue.city,
            PostalCode:userValue.zipCode,
            Country: userValue.country

          },
          Occupation: "Management",
          IncomeRange: "6",
          ProofOfIdentity: null,
          ProofOfAddress: null,
          PersonType: "NATURAL",
          Email: userValue.email,
          Tag: "Formationfinder tag"

        }

    ///Create natural user and wallet
        console.log("User to Register ",  naturalUserData);
    PaymentService.createNaturalWallet(config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
      function resultServices(err, result) {
        if (err) {
          console.log(err)
            return res.json({response:"ERROR", message:err.message })
        }



        ///Register user card to mangopay


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
            console.log("PAY TO MANGO")
            PaymentService.makeBuyToMango( result.user, result.user, result.wallet  , resultCard.card ,debiteFundsEx, feesEx,  // var CustomerServices = require('../../api/services/CustomerService')
              function resultServices ( err, resultObject ) {
                if (err) {
                  console.log(err)
                  return res.json({response:"ERROR", message:err })
                }


                ///Transfer the user walletid to Formationcenter Wallet id.

                FormationCenter.findOne({name:formationcenter}).exec(function (err, formationCenterData) {
                  if (err) {
                    console.log("Paso algo grave", err)
                    return res.json({response:"ERROR", message:err.message})
                  }

                  console.log("Formation Center", formationCenterData)
                  PaymentService.transferWalletToWallet( result.user, result.wallet, formationCenterData.mangouser, formationCenterData.mangowallet ,debiteFundsEx, feesEx,
                    function resultServices ( err, resultData ) {
                      if (err) {
                        console.log("Paso algo", err)
                        return res.json({response:"ERROR", message:err })
                      }
                      resultObject =  {walleid : result.wallet, userid:result.user, carid:resultCard.card}
                       return res.json({response:"OK",resultObject})


                    });

                })




              });


          })

       });

      }

      });

  },


  /**
   * `PayController.makepay()`
   * User data
   */
  mangopaymentex: function (req, res, next) {

    console.log("********************** Estoy en mangopaymentex **********************");

    userValue = req.param("userdata")

    if ( typeof userValue == "undefined")
      return res.json({response:"ERROR", message:"Parameter userdata undefined"})

    cardValue = req.param("creditCardData")

    if ( typeof cardValue == "undefined")
      return res.json({response:"ERROR", message:"Parameter creditCardData undefined"})

    ///Validate cardValue

    mount = req.param("price")

    //if ( typeof mount == "undefined")
    //  return res.json({response:"ERROR", message:"Parameter price undefined"})
    //Validate price

    formationcenter = req.param("formationidentifier")
    console.log("FORMATION IDENTIFIER ",req.param("formationidentifier") )
    if ( typeof formationcenter == "undefined")
      return res.json({response:"ERROR", message:"Parameter formationidentifier undefined"})

    ///Validate formationcenter name


    currency = req.param("currency")

    if ( typeof currency == "undefined")
      currency = "EUR"


    //Validate currency
    ///Find FormationCenter Data and amout
    console.log("FORMATION IDENTIFIER ",formationcenter )
    Formation.findOne({id:formationcenter}).populate("formationCenter").exec( function (err, resultObject) {

      if (err) {
        return res.json({response:"ERROR", message:err.message})
      }

      if ( typeof  resultObject == "undefined") {
        return res.json({response:"ERROR", message: sails.__("ERROR_FORMATION_NODATA")})
      }

      mount = resultObject.price
      formationcenter  = resultObject.formationCenter.name

      ///Find walletid and userid in Formationcenter register
      console.log("REALICE PAY")
      PaymentService.validateFormatinCenterInformation (formationcenter, function (err, result) {
        //FormationCenter.findOne({name:formationcenter}).exec(function (err, formationCenterData){



        if (result == false) {
          return res.json({response:"ERROR", message:"Formation Center make payment"})
        }
        else {
          config = {currency: "EUR"}
          config.currency = currency;

          var naturalUserData = {
            FirstName: userValue.firstName, // Required
            LastName: userValue.name,    // Required
            Birthday:userValue.birthDate,  // Required,  // Required
            Nationality: userValue.nacionality, // Required, default: 'FR'
            CountryOfResidence: userValue.country, // Required, default: 'FR'
            Address: {
              AddressLine1: userValue.address,
              AddressLine2: userValue.address,
              City: userValue.city,
              Region: userValue.city,
              PostalCode:userValue.zipCode,
              Country: userValue.country

            },
            Occupation: "Management",
            IncomeRange: "6",
            ProofOfIdentity: null,
            ProofOfAddress: null,
            PersonType: "NATURAL",
            Email: userValue.email,
            Tag: "Formationfinder tag"

          }

          ///Create natural user and wallet
          PaymentService.createNaturalWallet(config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
            function resultServices(err, result) {
              if (err) {
                console.log(err)
                return res.json({response:"ERROR", message:err.message })
              }



              ///Register user card to mangopay


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
                  console.log("PAY TO MANGO")
                  PaymentService.makeBuyToMango( result.user, result.user, result.wallet  , resultCard.card ,debiteFundsEx, feesEx,  // var CustomerServices = require('../../api/services/CustomerService')
                    function resultServices ( err, resultObject ) {
                      if (err) {
                        console.log(err)
                        return res.json({response:"ERROR", message:err })
                      }


                      ///Transfer the user walletid to Formationcenter Wallet id.

                      FormationCenter.findOne({name:formationcenter}).exec(function (err, formationCenterData) {
                        if (err) {
                          console.log("Paso algo grave", err)
                          return res.json({response:"ERROR", message:err.message})
                        }

                        console.log("Formation Center", formationCenterData)
                        PaymentService.transferWalletToWallet( result.user, result.wallet, formationCenterData.mangouser, formationCenterData.mangowallet ,debiteFundsEx, feesEx,
                          function resultServices ( err, resultData ) {
                            if (err) {
                              console.log("Paso algo", err)
                              return res.json({response:"ERROR", message:err })
                            }
                            resultObject =  {walleid : result.wallet, userid:result.user, carid:resultCard.card}
                            return res.json({response:"OK",result:resultObject})


                          });

                      })

                    });
                })
            });
        }
      });
    })


  }


};

