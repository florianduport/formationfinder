/**
 * Created by dionis on 8/26/2016.
 */

describe('AlertService', function () {
  request = require('supertest'),
    assert = require('assert');
  moment = require("moment")
  faker = require('faker');
  async = require("async");

  var walletid = ""
  var formationcentername = ""
  enumArray = ['New_Costumer', 'Formation_Full', 'Place_Unable']
  testPayVariablesBuyer = {}
  testPayVariablesSeller = {}
  describe('#Alert  test services ', function () {
    it('Create alert with type IsFull (Formation is Full)', function (done) {

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]
        var config = {
          text: faker.lorem.paragraph(),
          formationCenter: firstFormationCenter.name,
          date: new Date()
        }

        AlertService.createAlertIsFull(config.formationCenter, config.text, function (err, result) {
          if (err) return done(err);
          //console.log("LOG", res.body)
          assert.equal(res.body.response, "OK")
          assert.equal(res.body.result.type, enumArray[1])
          done();
        })
      })
    })


    it('Create alert with type CustomerBooked (Client has booked a formation)', function (done) {

      if (err) done(err)

      firstFormationCenter = resultArray[0]
      var config = {
        text: faker.lorem.paragraph(),
        formationCenter: firstFormationCenter.name,
        date: new Date()
      }

      AlertService.createAlertCustomerBooked(config.formationCenter, config.text, function (err, result) {
        if (err) return done(err);
        //console.log("LOG", res.body)
        assert.equal(res.body.response, "OK")
        assert.equal(res.body.result.type, enumArray[0])
        done();
      })
    })

  })
})
