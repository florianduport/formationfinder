/**
 * Created by Dionis on 28/06/2016.
 */

describe('PayController', function () {
  request = require('supertest'),
    assert = require('assert');
  salis = require('sails');
  moment = require('moment');
  var walletid = ""
  var formationcentername = ""

  faker = require('faker');
  ///Make test with Internet and not behind Proxy


  describe('#Payment makepayment()', function () {
    it('Create Mangopaylegal  user  for Formation Center', function (done) {
      // var app = sails();


      FormationCenter.findOne({name: {contains: "a"}}).exec(function (err, formationCenter) {


        //assert.notEqual(formationCenters.length , 0, "Is plus 0");

        iFormationCenter = formationCenter

        var nameFormationCenter = iFormationCenter.name
        formationcentername =  iFormationCenter.name
        var testCurrency = "EUR"
        var mount = 1000
        var config = {
          name: nameFormationCenter,
          currency: testCurrency,
        };
        request(sails.hooks.http.app)
          .post('/Payment/createwallet')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            console.log("MESSAGE", res.body)
            assert.equal(res.body.response, 'OK')
            done();

          })
      });
    })

    it('Make payment from user to Formation Center wallet', function (done) {
      // var app = sails();


      FormationCenter.findOne({name: {"!": formationcentername}}).exec(function (err, formationCenter) {
         userid = faker.finance.account()
         walletid = faker.finance.account()
         FormationCenter.update({id:formationCenter.id},{mangowallet:walletid,mangouser:userid}).exec(function (err, updateObject){
           //assert.notEqual(formationCenters.length , 0, "Is plus 0");

           iFormationCenter = updateObject[0]

           var nameFormationCenter = formationcentername

           var naturalUserData = {
             FirstName: "Dionis", // Required
             LastName: "HugoSI",    // Required
             Birthday: moment('300680', 'DDMMYY').unix(),  // Required,  // Required
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

           cardValueEx = {
             CardNumber: '4706750000000017',
             CardExpirationDate: "1223",  //12-06-2023  moment('0623', 'MMDD').unix()
             CardCvx: '342',
           }
           var testCurrency = "EUR"
           var mount = 1000


           //Validate price


           var config = {
             userdata:naturalUserData,
             formationcentername: nameFormationCenter,
             currency: testCurrency,
             price:12,
             cardata:cardValueEx
           };
           request(sails.hooks.http.app)
             .post('/Payment/mangopayment')
             .send(config)
             .expect(200, function (err, res) {
               if (err) return done(err);
               console.log("MESSAGE", res.body)
               assert.equal(res.body.response, 'OK')
               done();

             })
         });

         })

    })
  })
})
/*
 ///Make test with Internet and not behind Proxy

 describe('#Payment makepayment()', function() {
 it('should´t make makepayment for formation center', function (done) {
 // var app = sails();


 FormationCenter.find({}).exec(function (err, formationCenters) {


 assert.notEqual(formationCenters.length , 0, "Is plus 0");

 iFormationCenter = formationCenters[0]
 var nameFormationCenter = iFormationCenter.name
 var testCurrency = "EUR"
 var mount = 1000
 var config = {
 formationcentername: nameFormationCenter,
 currency: testCurrency,
 price:mount

 };
 request(sails.hooks.http.app)
 .get('/Payment/makepayment')
 .send(config)
 .expect(200, function (err, res) {
 if (err) return done(err);

 assert.equal(res.body.response,'OK')
 assert.notEqual(res.body.formationcetername,nameFormationCenter)
 assert.notEqual(res.body.buyerid,'')
 assert.notEqual(res.body.mangopaytax,'')
 assert.notEqual(res.body.selleramout,'')
 assert.notEqual(res.body.buyeramount,'')

 done();

 })
 });
 })

 })*/


/*});*/
