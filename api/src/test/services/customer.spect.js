/**
 * Created by Dionis on 28/06/2016.
 */
/*describe('CustomerServices', function() {
  request = require('supertest'),
   assert = require('assert');
  salis = require('sails');
  var walletid = ""
  var formationcentername = ""
  describe('#CustomerServices searchbyclosedformation()', function() {

    it('should find all customer to send mail ', function (done) {


      CustomerService.searchbyclosedformation(  // var CustomerServices = require('../../api/services/CustomerService')
        function  (result ) {

          listCustomerToSend = result

          ///console.log("Execute test ",  listCustomerToSend)

          assert.notEqual(listCustomerToSend.length, 0, "Is plus 0");
          customerdata = listCustomerToSend[0]
          console.log(customerdata);
          Customer.findOne({id:customerdata.costumerid}).exec( function (err, Customers) {

            if (!Customers )
              assert.fail("Not customers to send messajes")

            if ( Customers.length == 0)
              assert.fail("Not customers to send messajes")
            customerSearch = Customers[0]
            assert.equal(customerdata.costumerid,customerSearch.id )
            assert.equal(customerdata.emailsend,1 )
          })
          done();
        });


    });
  });
  /!*,   ///Test for send mail of
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
   *!/

});*/
