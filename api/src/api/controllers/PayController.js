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
         return res.json({response:"ERROR", message:err})

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
    cardValue = req.param("cardata")

    ///Validate cardValue

    mount = req.param("price")


    //Validate price

    formationcenter = req.param("formationcentername")

    ///Validate formationcenter name


    currency = req.param("currency")

    //Validate currency

    ///Find walletid and userid in Formationcenter register
    console.log("REALICE PAY")
    PaymentService.valudateFormatinCenterInformation (formationcenter, function (err, result) {
    //FormationCenter.findOne({name:formationcenter}).exec(function (err, formationCenterData){

      //console.log("INFO", formationCenterData)
      //return res.json({response:"ERROR"})
      //if (err) {
      //  return res.json({response: "ERROR", message: err})
      //}
      //
      //if ( typeof formationCenterData.walletid == "undefined" || typeof formationCenterData.walletid == "undefined"){
      //  return res.json({response:"ERROR", message:"Formation Center make payment"})

      if (result == false) {
         return res.json({response:"ERROR", message:"Formation Center make payment"})
      }
      else {
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

      }

      });

  }





};

