/**
 * Created by dionis on 8/20/2016.
 */


describe('BillController', function (){
  var faker;
  faker = require('faker');
  describe('#Bill CRUD Rest service test suite  ==> ', function () {
    it('Create bill', function (done) {

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        // var app = sails();
        var config = {
          date: faker.date.past(),
          amount: faker.commerce.price(50, 250),
          billNumber: faker.finance.account(),
          billState: faker.random.boolean()
        };


        config.nameformation = firstFormationCenter.name;
        request(sails.hooks.http.app)
          .post('/Bill/createBill')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
           //console.log("LOG" , res.body)
            assert.equal(res.body.response, "OK")
            done();
          })
      })
    })

    it('Create bill whitout paremeter amount ', function (done) {
      // var app = sails();
      var config = {
        date: faker.date.past(),
        amount: "fssfdfsfsdf",
        billNumber: faker.finance.account(),
        billState: faker.random.boolean(),
      };

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;

        request(sails.hooks.http.app)
          .post('/Bill/createBill')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "ERROR")
            assert.equal("Bill amount it´s not a string number", res.body.message)
            done();
          })
      })
    })


    it('Create bill whitout paremeter amount correct ', function (done) {
      // var app = sails();
      var config = {
        date: faker.date.past(),
        billNumber: faker.finance.account(),
        billState:  faker.random.boolean()
      };

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        request(sails.hooks.http.app)
          .post('/Bill/createBill')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "ERROR")
            assert.equal("Not defined bill amount", res.body.message)
            done();
          })
      })
    })

    it('Create bill whitout paremeter billState ', function (done) {
      // var app = sails();
      var config = {
        date: faker.date.past(),
        billNumber: faker.finance.account(),
        amount: 45
      };

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        config.amount = 50;
        request(sails.hooks.http.app)
          .post('/Bill/createBill')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "ERROR")
            assert.equal("Not defined bill state", res.body.message)
            done();
          })
      })
    })

    it('Create bill whitout paremeter nameformation ', function (done) {
      // var app = sails();
      var config = {
        date: faker.date.past(),
        billNumber: faker.finance.account(),
        billState:faker.random.boolean(),
        amount:56
      };


        request(sails.hooks.http.app)
          .post('/Bill/createBill')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "ERROR")
            assert.equal("Not defined Formation´s name", res.body.message)
            done();
          })

    })


    it('Delete bill ', function (done) {
      // var app = sails();
      var config = {};

      Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {

        if (err) done(err)
        config.idparam = resultObject.id;

        request(sails.hooks.http.app)
          .post('/Bill/deleteBill')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "OK")
            Bill.findOne({id: resultObject.id}).exec(function (err, resultObject) {
              if (err) done(err)

              assert.equal(undefined, resultObject)
              done();
            })
          })


      })

    })


    it('Delete bill without idparam ', function (done) {
      // var app = sails();
      var config = {};

      Bill.findOne({amoumt: {gte: 50}}).exec(function (err, resultObject) {

        if (err) done(err)


        request(sails.hooks.http.app)
          .post('/Bill/deleteBill')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "ERROR")
            assert.equal(res.body.message, "Not defined bill id")
            done();
          })


      })

    })


    it('Delete bill with not correct idparam ', function (done) {
      // var app = sails();
      var config = {};

      Bill.findOne({amoumt: {gte: 50}}).exec(function (err, resultObject) {

        if (err) done(err)

        config.idparam = "fsfsfsdfs"
        request(sails.hooks.http.app)
          .post('/Bill/deleteBill')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "ERROR")
            assert.equal(res.body.message, "Bill id it´s not a string number")
            done();
          })


      })

    })

    it('Search bill with amount ', function (done) {
      // var app = sails();
      var config = {};

      Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {

        if (err) done(err)

        config.amount = resultObject.amount;
        request(sails.hooks.http.app)
          .post('/Bill/searchBills')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(true, res.body.length > 1)
            done();
          })
      })

    })


    it('Search all bill ', function (done) {
      // var app = sails();
      var config = {};

      Bill.find().exec(function (err, resultObjectArray) {

        if (err) done(err)


        request(sails.hooks.http.app)
          .post('/Bill/searchBills')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(resultObjectArray.length, res.body.length)
            done();
          })
      })

    })


    it('Search all bill  searchAllBills()', function (done) {
      // var app = sails();
      var config = {};

      Bill.find().exec(function (err, resultObjectArray) {

        if (err) done(err)


        request(sails.hooks.http.app)
          .post('/Bill/searchAllBills')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(resultObjectArray.length, res.body.length)
            done();
          })
      })

    })


    it('Search bill with initialDate ', function (done) {
      // var app = sails();
      var config = {};


      Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {

        if (err) done(err)

        config.amount = resultObject.amount;
        config.initialDate = "2014/07/02"
        request(sails.hooks.http.app)
          .post('/Bill/searchBills')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(true, res.body.length > 1)
            done();
          })
      })

    })


    it('Search bill with finalDate ', function (done) {
      // var app = sails();
      var config = {};


      Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {
        if (err) done(err)

        config.amount = resultObject.amount;
        config.finalDate = "2025/07/02"
        request(sails.hooks.http.app)
          .post('/Bill/searchBills')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(true, res.body.length > 1)
            done();
          })
      })

    })


    it('Search bill with initial and  final Date ', function (done) {
      // var app = sails();
      var config = {};


      Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {

        if (err) done(err)

        config.amount = resultObject.amount;
        config.initialDate = "2014/07/02"
        config.finalDate = "2025/07/02"
        request(sails.hooks.http.app)
          .post('/Bill/searchBills')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(true, res.body.length > 1)
            done();
          })
      })

    })


    ///------------------------------------

    /*

     Preconditions: First Formation Center must be Bill relations

     */

    it('Search all bill FormationCenter name error (without name) ', function (done) {
      // var app = sails();
      var config = {};

      Bill.find().exec(function (err, resultObjectArray) {

        if (err) done(err)


        request(sails.hooks.http.app)
          .post('/Bill/searchBillByFormationCenter')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal("ERROR", res.body.response)
            assert.equal("Not defined Formation´s name", res.body.message)
            done();
          })
      })

    })


    it('Search all bill FormationCenter name ', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {
        Bill.find().exec(function (err, resultObjectArray) {

          if (err) done(err)

          firstFormationCenter = resultArray[0]

          config.nameformation = firstFormationCenter.name;
          config.len = 0;
          request(sails.hooks.http.app)
            .post('/Bill/searchBillByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(resultObjectArray.length, res.body.length)
              done();
            })
        })
      })

    })

    it('Search bill with initialDate FormationCenter name', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {

          if (err) done(err)

          config.amount = resultObject.amount;
          config.initialDate = "2014/07/02"
          request(sails.hooks.http.app)
            .post('/Bill/searchBillByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(true, res.body.length >= 1)
              done();
            })
        })

      })

    })


    it('Search bill with  FormationCenter name pagination', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        config.page = 1;
        config.len = 5;
        Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {

          if (err) done(err)

          request(sails.hooks.http.app)
            .post('/Bill/searchBillByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);
              console.log("RESULTADO ",res.body.length )
              assert.equal(true, res.body.length == 5)
              done();
            })
        })

      })

    })


    it('Search bill with FormationCenter name pagination (One result)', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        config.page = 1;
        config.len = 1;
        Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {

          if (err) done(err)

          request(sails.hooks.http.app)
            .post('/Bill/searchBillByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);
              console.log("RESULTADO ",res.body.length )
              assert.equal(true, res.body.length == 1)
              done();
            })
        })

      })

    })


    it('Search bill with finalDate  FormationCenter name', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {
          if (err) done(err)


          config.initialDate = "2014/07/02"
          config.finalDate = "2025/07/02"
          request(sails.hooks.http.app)
            .post('/Bill/searchBillByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(true, res.body.length > 1)
              done();
            })
        })
      })

    })


    it('Search bill with initial and  final Date FormationCenter name (0 result) ', function (done) {
      // var app = sails();
      var config = {};
      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;

        Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {

          if (err) done(err)

          config.amount = resultObject.amount;
          config.initialDate = "2025/07/02"
          request(sails.hooks.http.app)
            .post('/Bill/searchBillByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(true, res.body.length < 1)
              done();
            })
        })

      })
    })

    ///------------------------------

    it('Count all bill FormationCenter name error (without name) ', function (done) {
      // var app = sails();
      var config = {};

      Bill.find().exec(function (err, resultObjectArray) {

        if (err) done(err)


        request(sails.hooks.http.app)
          .post('/Bill/countBillByFormationCenter')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal("ERROR", res.body.response)
            assert.equal("Not defined Formation´s name", res.body.message)
            done();
          })
      })

    })


    it('Count all bill FormationCenter name ', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {
        Bill.find().exec(function (err, resultObjectArray) {

          if (err) done(err)

          firstFormationCenter = resultArray[0]

          config.nameformation = firstFormationCenter.name;

          request(sails.hooks.http.app)
            .post('/Bill/countBillByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(resultObjectArray.length, res.body.size)
              done();
            })
        })
      })

    })

    it('Count bill with initialDate FormationCenter name', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {

          if (err) done(err)

          //config.amount = resultObject.amount;
          config.initialDate = "2014/07/02"
          request(sails.hooks.http.app)
            .post('/Bill/countBillByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(true, res.body.size > 1)
              done();
            })
        })

      })

    })


    it('Count bill with initialDate FormationCenter name pagination', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        config.page = 1;
        config.len = 1;
        Bill.find({amount: {gte: 50}}).exec(function (err, resultObject) {

          if (err) done(err)

          config.ammount = 50;
          request(sails.hooks.http.app)
            .post('/Bill/countBillByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(resultObject.length, res.body.size)
              done();
            })
        })

      })

    })


    it('Count bill with finalDate  FormationCenter name', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {
          if (err) done(err)

          //config.amount = resultObject.amount;
          //config.initialDate = "2014/07/02"
          config.finalDate = "2025/07/02"
          request(sails.hooks.http.app)
            .post('/Bill/countBillByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(true, res.body.size > 1)
              done();
            })
        })
      })

    })


    it('Count bill with initial and  final Date FormationCenter name ', function (done) {
      // var app = sails();
      var config = {};
      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;

        Bill.findOne({amount: {gte: 50}}).exec(function (err, resultObject) {

          if (err) done(err)

         // config.amount = resultObject.amount;
          config.initialDate = "2014/07/02"
          config.finalDate = "2025/07/02"
          request(sails.hooks.http.app)
            .post('/Bill/countBillByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(true, res.body.size > 1)
              done();
            })
        })

      })
    })


  })
})
