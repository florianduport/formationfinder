/**
 * Created by Dionis on 28/06/2016.
 */

/*describe('PayController', function() {
  request = require('supertest'),
    assert = require('assert');
    salis = require('sails');
    var walletid = ""
    var formationcentername = ""


    ///Make test with Internet and not behind Proxy



  describe('#Payment makepayment()', function() {
    it('Create Mangopay user legal for Formation Center', function (done) {
      // var app = sails();


      FormationCenter.findOne({}).exec(function (err, formationCenters) {


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
          .post('/Payment/makepayment')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response,'ERROR')
            done();

          })
      });
    })

  })*/
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
