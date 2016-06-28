var EmailController = require('../../api/controllers/EmailController'),
  request = require('supertest'),
  assert = require('assert');
salis = require('sails');

describe('EmailController', function() {

  describe('#send bad mail()', function() {
    it('should´t send mail to adress', function (done) {
      // var app = sails();
      var config = {
        to:"dionis@localhost.com",
        cc:"test@localhost.com",
        text:"Verificando efectividad",
        subject:"Mi primer test",
        html:"<b>Verificando efectividad</b>"
      };

      request(sails.hooks.http.app)
        .post('/Email/send')
        .send(config)
        .expect(500, function(err, res){
          if (err) return done(err);
          done();
        })
    });
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
