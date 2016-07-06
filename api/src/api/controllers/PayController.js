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
          return res.json({err})
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
    console.log("Validation")
    userValue = req.param("userdata")
    mount = req.param("price")
    formationcenter = req.param("formationcentername")
    currency = req.param("currency")
    console.log("Validation")
   PaymentService.makepayment(userValue, mount, formationcenter, currency, function (err, result){

      return res.json(result)
    })
  }



};

