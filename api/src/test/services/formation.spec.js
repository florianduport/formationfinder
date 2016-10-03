/**
 * Created by dionis on 8/26/2016.
 */


describe('FormationService', function () {
  request = require('supertest'),
    assert = require('assert');
  moment = require("moment")
  var walletid = ""
  var formationcentername = ""
  enumArray = ['New_Costumer', 'Formation_Full', 'Place_Unable']
  testPayVariablesBuyer = {}
  testPayVariablesSeller = {}
  describe('#Formation  test services ', function () {
    it('Create alert with type IsFull (Formation is Full)', function (done) {

      Place.findOne({name:{contains:"a"}}).populate("formations").exec(function (err, resultObject) {
       resultObject = resultObject.formations[0]
        Formation.findOne({id:resultObject.id}).populate("place").exec(function(err, resultObject) {
          if (err) done(err)

          isFullTmp = resultObject.isFull
          resultObject.isFull = true
          Formation.update({id: resultObject.id}, {isFull: true}).exec(function (err, result) {
            console.log("Calling")
            FormationService.isFormationFull(resultObject, function (err, resultData) {
              if (err) done(err)
              assert.equal(resultData.response, "OK")
              assert.equal(resultData.responseObject.result.type, enumArray[1])
              done();

            })
          })
        })
      })
    })


    it('Create alert with type IsFull (Formation not  Full)', function (done) {

      Place.findOne({name:{contains:"a"}}).populate("formations").exec(function (err, resultObject) {
        resultObject = resultObject.formations[0]
        Formation.findOne({id:resultObject.id}).populate("place").exec(function(err, resultObject){
        if (err) done(err)

        isFullTmp  = resultObject.isFull
        resultObject.isFull = false
        Formation.update({id:resultObject.id},{isFull:false}).exec(function(err, result){
          ///console.log("Calling")

          FormationService.isFormationFull(resultObject, function (err, resultData) {
            if (err) done (err)
            assert.equal(resultData.response, "OK")
            assert.equal(resultData.result, "Not full")
            done();

          })
        })
        })
      })
    })


    it('Create alert with type CustomerBooked (Client has booked a formation)', function (done) {

      Formation.find({}).exec(function (err, resultObjectArray) {
        resultObject = resultObjectArray[0]

        if (err) done(err)

        isFullTmp  = resultObject.isFull

        Formation.update({id:resultObject.id},{isFull:!resultObject.isFull}).exec(function(err, result){
          FormationService.costumerBooked(resultObject, function (err, result) {
            assert.equal(result.response, "OK")
            assert.equal(result.responseObject.result.type, enumArray[0])

            Formation.update({id:resultObject.id},{isFull:isFullTmp}).exec(function(err, result) {
              done();
            });
          })
        })

      })
    })
    //
    //
    //
    //it('Send payment stimulus (Client has booked a formation)', function (done) {
    //
    //  Customer.find({}).exec(function (err, resultObjectArray) {
    //    resultObject = resultObjectArray[0]
    //    if (err) done (err)
    //    Formation.findOne({id:resultObject.formation}).exec(function (err, resultObjectFormation) {
    //
    //      if (err) done(err)
    //
    //
    //        FormationService.sendMailPayStimulus(resultObject,resultObjectFormation, function (err, result) {
    //          assert.equal(result.response, "OK")
    //
    //          done();
    //        })
    //      })
    //    })
    //  })
    })
})
