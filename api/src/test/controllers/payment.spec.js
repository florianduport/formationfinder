/**
 * Created by Dionis on 28/06/2016.
 */

describe('PayController', function() {
  request = require('supertest'),
    assert = require('assert');
    salis = require('sails');
    var walletid = ""
    var formationcentername = ""
  describe('#Payment createwallet()', function() {
    it('should´t create wallet for formation center', function (done) {
      // var app = sails();


      FormationCenter.find({}).exec(function (err, formationCenters) {


        assert.notEqual(formationCenters.length , 0, "Is plus 0");

        iFormationCenter = formationCenters[0]
        var nameFormationCenter = iFormationCenter.name
        var testCurrency = "EUR"

        var config = {
          name: nameFormationCenter,
          currency: testCurrency,

        };
        request(sails.hooks.http.app)
          .post('/Payment/createwallet')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            console.log(res)
            assert.equal(res.body.response,'OK')
            assert.notEqual(res.body.userid,'')
            assert.notEqual(res.body.walletid,'')
            walletid = res.body.walletid
            assert.notEqual(res.body.formationcenter,'')
            formationcentername = res.body.formationcenter
            done();

          })
      });
    })

  })
  /*,   ///Test for send mail of
   describe('#send ok mail()', function() {
   it('should send mail to adress', function (done) {
   // var app = sails();
   var config = {
   to:"dionis@localhost.com",
   cc:"test@localhost.com",
   text:"Verificando efectividad",
   subject:"Mi primer test"
   };

   request(sails.hooks.http.app)
   .post('/Email/send')
   .send(config)
   .expect(200,function(err, res){

   console.log(err);
   if (err) return done(err);

   console.log(res.body.response);
   assert.equal(res.body.response, "OK");
   done();
   });
   });
   })

   ,   ///Test for send mail to Gmail or mail serv with autenticate
   ///set password configuration in Configuration document in Mongo
   ///make call
   */

});
