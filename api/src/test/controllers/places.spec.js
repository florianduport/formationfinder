/**
 * Created by dionis on 6/30/2016.
 */


describe('PlaceController', function () {

  ////Shuld be insert data for test
  request = require('supertest'),
    assert = require('assert');
  salis = require('sails');

  describe('#find place by position and radio ==> ', function () {
    it('shoul find by positicion', function (done) {
      // var app = sails();
      var config = {
        lat: 48.090066452554424,
        long: 1.7543940842151642
      };

      request(sails.hooks.http.app)
        .post('/Place/searchbyposition')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);

          assert.equal(res.body.response, "OK")
          resultArray = res.body.result
          assert.notEqual(resultArray.length, 1)

          done();
        })
    })
  })

  describe('#find place by position and radio', function () {
    it('should not find by positicion', function (done) {
      // var app = sails();
      var config = {
        lat: 148.090066452554424,
        long: 10.7543940842151642

      };

      request(sails.hooks.http.app)
        .post('/Place/searchbyposition')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);
          assert.equal(res.body.response, "ERROR")
          done();
        })
    })
  })

  describe('#find place by position and radio', function () {
    it('should not find by positicion by missing parameter lat', function (done) {
      // var app = sails();
      var config = {
        long: 1.7543940842151642

      };

      request(sails.hooks.http.app)
        .post('/Place/searchbyposition')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);
          assert.equal(res.body.response, "ERROR")
          assert.equal(res.body.msg, "Parameter lat not exist")
          done();
        })
    })
  })

  describe('#find place by position and radio', function () {
    it('should not find by positicion by missing  parameter long', function (done) {
      // var app = sails();
      var config = {
        lat: 1.7543940842151642

      };

      request(sails.hooks.http.app)
        .post('/Place/searchbyposition')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);
          assert.equal(res.body.response, "ERROR")
          assert.equal(res.body.msg, "Parameter long not exist")
          done();
        })
    })
  })


  describe('#find place by position and radio', function () {
    it('--should find by positicion', function (done) {
      // var app = sails();
      var config = {
        lat: 48.090066452554424,
        long: 1.7543940842151642,
        distance: 200000

      };

      request(sails.hooks.http.app)
        .post('/Place/searchbyposition')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);

          assert.equal(res.body.response, "OK")
          resultArray = res.body.result
          //assert.notEqual( true, resultArray.length  > 1)
          assert.equal(true, resultArray.length > 1)
          done();
        })
    })
  });

  it('--Create and search find by positicion', function (done) {
    // var app = sails();
    var faker;
    faker = require('faker');

    coordinatesArray = [50.090066452554424, 1.7543940842151645]
    var config = {
      lat: coordinatesArray[0],
      long: coordinatesArray[1],

    };

    Place.create({
        name: faker.internet.userName(),

        email: faker.internet.email(),

        address: faker.address.streetAddress(),

        zipcode: faker.address.zipCode(),

        city: faker.address.city(),

        phoneNumber: faker.phone.phoneNumber(),


        isActivated: faker.random.boolean(),

        agreementNumber: faker.random.words(),

        agreementName: faker.random.words(),

        latitude: coordinatesArray[0],
        longitude: coordinatesArray[1],
        location: {
          type: "Point",
          coordinates: [
            coordinatesArray[1],
            coordinatesArray[0]
          ]
        }

      })
      .exec(function (err, user) {
        if (err) {
          fail("Error: " + err)
          done()
        }
        request(sails.hooks.http.app)
          .post('/Place/searchbyposition')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "OK")
            resultArray = res.body.result
            //assert.notEqual( true, resultArray.length  > 1)
            assert.equal(resultArray.length, 1)
            done();
          })
      });


  })

  it('--Create Place using http', function (done) {
    // var app = sails();
    var faker;
    faker = require('faker');

    coordinatesArray = [51.090066452554424, 1.7543940842151645]
    var config = {
      lat: coordinatesArray[0],
      long: coordinatesArray[1],

    };

    PlaceObject = {
      name: faker.internet.userName(),

      email: faker.internet.email(),

      address: faker.address.streetAddress(),

      zipcode: faker.address.zipCode(),

      city: faker.address.city(),

      phoneNumber: faker.phone.phoneNumber(),


      isActivated: faker.random.boolean(),

      agreementNumber: faker.random.words(),

      agreementName: faker.random.words(),

      latitude: coordinatesArray[0],
      longitude: coordinatesArray[1],
      location: {
        type: "Point",
        coordinates: [
          coordinatesArray[1],
          coordinatesArray[0]
        ]
      }

    }


    request(sails.hooks.http.app)
      .post('/Place/')
      .send(PlaceObject)
      .expect(201, function (err, res) {
        if (err) return done(err);

        ///Returned created Place object
        assert.equal(res.body.latitude, coordinatesArray[0])

        done();
      })


  })

  describe('#Test REST services CRUD', function () {
    it(' Create new place', function (done) {

      var faker;
      faker = require('faker');
      faker.locale = "en"
      coordinatesArray = [51.190066452554424, 1.9543940842151645]
      var config = {
        lat: coordinatesArray[0],
        long: coordinatesArray[1],

      };

      PlaceObject = {
        name: faker.random.words(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        zipcode: faker.address.zipCode(),
        city: faker.address.city(),
        phoneNumber: faker.phone.phoneNumber(),
        isActivated: faker.random.boolean(),
        agreementNumber: faker.random.number(),
        agreementName: faker.random.words(),
        latitude: coordinatesArray[0],
        longitude: coordinatesArray[1],
        location: {
          type: "Point",
          coordinates: [
            coordinatesArray[1],
            coordinatesArray[0]
          ]
        }

      }



      request(sails.hooks.http.app)
        .post('/Place/createPlace')
        .send(PlaceObject)
        .expect(200, function (err, res) {
          if (err) return done(err);

          ///Returned created Place object
          console.log("MENSAJE ",res.body.message )
          assert.equal("OK", res.body.response)
          done();
        })
    })

    it(' Create new place but with name object place in database', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.number(),
          agreementName: faker.random.words(),
          latitude: coordinatesArray[0],
          longitude: coordinatesArray[1],
          location: {
            type: "Point",
            coordinates: [
              coordinatesArray[1],
              coordinatesArray[0]
            ]
          }

        }


        request(sails.hooks.http.app)
          .post('/Place/createPlace')
          .send(PlaceObject)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("ERROR", res.body.response)
            done();
          })

      })
    })

    it(' Create new place but with location object place in database', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.number(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }


        request(sails.hooks.http.app)
          .post('/Place/createPlace')
          .send(PlaceObject)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("ERROR", res.body.response)
            done();
          })

      })
    })


    it(' Delete place by id', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.idplace = resultObject.id
        request(sails.hooks.http.app)
          .post('/Place/deletePlace')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("OK", res.body.response)

            Place.findOne({name: {contains: resultObject.name}}).exec(function (err, resultObjectDelete) {

              if (err) done(err)
              assert.equal(undefined,  resultObjectDelete)
              done();
            })

          })

      })
    })

    it(' Delete place by name', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };
        config.name = resultObject.name
        request(sails.hooks.http.app)
          .post('/Place/deletePlace')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
           // console.log("MESSAGE" , res.body.message)
            assert.equal("OK", res.body.response)

            Place.findOne({name: {contains: resultObject.name}}).exec(function (err, resultObjectDelete) {

              if (err) done(err)
              assert.equal(undefined, resultObjectDelete)
              done();
            })

          })

      })
    })

    it(' Delete place undefined', function (done) {

      var faker;
      faker = require('faker');


      config.name = "111111111111"
      request(sails.hooks.http.app)
        .post('/Place/deletePlace')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);

          ///Returned created Place object
          assert.equal("ERROR", res.body.response)
          done();

        })


    })

    it(' Delete place witout parameters', function (done) {

      var faker;
      faker = require('faker');


      coordinatesArray = [51.190066452554424, 1.9543940842151645]
      var config = {
        lat: coordinatesArray[0],
        long: coordinatesArray[1],

      };


      request(sails.hooks.http.app)
        .post('/Place/deletePlace')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);

          ///Returned created Place object
          assert.equal("ERROR", res.body.response)
          done();

        })


    })

    it(' Advacend search by address', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }

        config.address =  resultObject.address
        config.city =  resultObject.city
        request(sails.hooks.http.app)
          .post('/Place/searchByCityMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(true, res.body.length > 0)
            requestResult = res.body[0]
            assert.equal(resultObject.address, requestResult.address)
            done();
          })

      })
    })


    it(' Advacend search by city', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        config.city =  resultObject.city
        request(sails.hooks.http.app)
          .post('/Place/searchByCityMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(true, res.body.length > 0)
            requestResult =  res.body[0];
            assert.equal(resultObject.city, requestResult.city)
            done();
          })

      })
    })

    it(' Advacend search pagination', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 1;
        config.len = 5;

        config.city = ""
        request(sails.hooks.http.app)
          .post('/Place/searchByCityMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(config.len, res.body.length)
            requestResult =  res.body[0];

            done();
          })

      })
    })

    it(' Advacend search by agreementNumber', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }
        config.city =  resultObject.city
        config.agreementNumber =  resultObject.agreementNumber
        request(sails.hooks.http.app)
          .post('/Place/searchByCityMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(true, res.body.length > 0)
            requestResult = res.body[0]

            done();
          })

      })
    })


    it(' Advacend search all', function (done) {

      var faker;
      faker = require('faker');

      Place.find({name: {contains: "a"}}).exec(function (err, resultObjectArray) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        config.city = ""
        request(sails.hooks.http.app)
          .post('/Place/searchByCityMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(config.len, res.body.length )
            requestResult = res.body[0]

            done();
          })

      })
    })


    it(' Advacend search by agreementNumber and city', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }

        config.agreementNumber =  resultObject.agreementNumber
        config.city =  resultObject.city
        request(sails.hooks.http.app)
          .post('/Place/searchByCityMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(true, res.body.length > 0)
            requestResult = res.body[0]

            done();
          })

      })
    })


    it(' Advacend search by address and city', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }

        config.address =  resultObject.address
        config.city =  resultObject.city
        request(sails.hooks.http.app)
          .post('/Place/searchByCityMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(true, res.body.length > 0)
            requestResult = res.body[0]

            done();
          })

      })
    })


    it(' Advacend search by agreementNumber,city and address', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }

        config.agreementNumber =  resultObject.agreementNumber
        config.city =  resultObject.city
        config.address =  resultObject.address
        request(sails.hooks.http.app)
          .post('/Place/searchByCityMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(true, res.body.length > 0)
            requestResult = res.body[0]

            done();
          })

      })
    })


    it(' Update place', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          id : resultObject.id,
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.number(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }

        config.address =  resultObject.address
        config.city =  resultObject.city
        config.idplace = resultObject.id
        request(sails.hooks.http.app)
          .post('/Place/updatePlace')
          .send(PlaceObject)
          .expect(200, function (err, res) {
            if (err) return done(err);

            //console.log("ERROR", res.body.message)
            assert.equal("OK", res.body.response )
            requestResult = res.body.result
            assert.equal(PlaceObject.address, requestResult.address)
            assert.equal(PlaceObject.city, requestResult.city)
            done();
          })

      })
    })


    it(' Update place without id', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {

          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }

        config.address =  resultObject.address
        config.city =  resultObject.city
        request(sails.hooks.http.app)
          .post('/Place/updatePlace')
          .send(PlaceObject)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("ERROR", res.body.response )
            assert.equal("Place´s id undefined", res.body.message)
            done();
          })

      })
    })


    it(' Update place without address parameter', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          id : resultObject.id,
          name: resultObject.name,
          email: faker.internet.email(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }

        config.address =  resultObject.address
        config.city =  resultObject.city
        request(sails.hooks.http.app)
          .post('/Place/updatePlace')
          .send(PlaceObject)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("ERROR", res.body.response )
            assert.equal("Place´s address undefined", res.body.message)
            done();
          })

      })
    })

    it(' Modified activated value', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;


        config.activate =  !resultObject.isActivated
        config.name =  resultObject.name
        request(sails.hooks.http.app)
          .post('/Place/activatePlace')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            console.log("ERROR", res.body.message)
            assert.equal("OK", res.body.response)
            requestResult = res.body.result
            assert.equal( config.activate, requestResult.isActivated)
            done();
          })

      })
    })

    it(' Update updateLocationPlace ', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [52.190066452554424, 2.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          idplace : resultObject.id,
          name: resultObject.name,
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }


        request(sails.hooks.http.app)
          .post('/Place/updateLocationPlace')
          .send(PlaceObject)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("OK", res.body.response )
            requestResult = res.body.result
            assert.equal( PlaceObject.latitude, requestResult.latitude)
            assert.equal( PlaceObject.longitude, requestResult.longitude)
            done();
          })

      })
    })

    it(' Update updateLocationPlace  without correct  parameter', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [52.190066452554424, 2.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          idplace : resultObject.id,
          name: resultObject.name,
          latitude: resultObject.latitude

        }


        request(sails.hooks.http.app)
          .post('/Place/updateLocationPlace')
          .send(PlaceObject)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("ERROR", res.body.response )
            assert.equal( "Place´s longitude undefined", res.body.message)
            done();
          })

      })
    })


    it(' Update updateLocationPlace  without correct  parameter (latitude not number)', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [52.190066452554424, 2.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          idplace : resultObject.id,
          name: resultObject.name,
          latitude: "dfsdfsfsdfsdfs"

        }


        request(sails.hooks.http.app)
          .post('/Place/updateLocationPlace')
          .send(PlaceObject)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("ERROR", res.body.response )
            assert.equal( "Place´s latitude an invalid string number", res.body.message)
            done();
          })

      })
    })

    it(' Update updateLocationPlace  without correct  parameter ( Place not exits)', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [52.190066452554424, 2.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          idplace : resultObject.id,
          name: "sdfsfsfsfs"

        }


        request(sails.hooks.http.app)
          .post('/Place/updateLocationPlace')
          .send(PlaceObject)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("ERROR", res.body.response )
            assert.equal( "Not exist place with name " + PlaceObject.name, res.body.message)
            done();
          })

      })
    })


    it(' Update updateLocationPlace  without correct  parameter ( Place not exits)', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [52.190066452554424, 2.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          idplace : resultObject.id,
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
          type: "Point",
            coordinates: [
            resultObject.longitude,
            resultObject.latitude
          ]
        }

        }


        request(sails.hooks.http.app)
          .post('/Place/updateLocationPlace')
          .send(PlaceObject)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("ERROR", res.body.response )
            assert.equal( "Place´s name undefined", res.body.message)
            done();
          })

      })
    })

//----
    it(' Advacend search by zipcode', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        config.zipcode =  resultObject.zipcode
        request(sails.hooks.http.app)
          .post('/Place/searchByZipcodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(true, res.body.length > 0)
            requestResult =  res.body[0];

            done();
          })

      })
    })

    it(' Advacend search by zipcode error', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;


        request(sails.hooks.http.app)
          .post('/Place/searchByZipcodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("ERROR", res.body.response)
            assert.equal("No zipcode provided", res.body.message)

            done();
          })

      })
    })

    it(' Advacend search by zipcode pagination', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        config.zipcode =  resultObject.zipcode
        request(sails.hooks.http.app)
          .post('/Place/searchByZipcodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(1, res.body.length)
            done();
          })

      })
    })

    it(' Advacend search by zipcode pagination (second page)', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 1;
        config.len = 5;

        config.zipcode =  resultObject.zipcode
        request(sails.hooks.http.app)
          .post('/Place/searchByZipcodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(0, res.body.length)
            done();
          })

      })
    })
    it(' Advacend search by zipcode and  agreementNumber', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }

        config.agreementNumber =  resultObject.agreementNumber
        config.zipcode =  resultObject.zipcode
        request(sails.hooks.http.app)
          .post('/Place/searchByZipcodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(true, res.body.length > 0)
            requestResult = res.body[0]

            done();
          })

      })
    })



    it(' Advacend search by zipcode , agreementNumber and city', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }
        config.zipcode =  resultObject.zipcode
        config.agreementNumber =  resultObject.agreementNumber
        config.city =  resultObject.city
        request(sails.hooks.http.app)
          .post('/Place/searchByZipcodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(true, res.body.length > 0)
            requestResult = res.body[0]

            done();
          })

      })
    })


    it(' Advacend search by zipcode, address and city', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }

        config.address =  resultObject.address
        config.city =  resultObject.city
        config.zipcode =  resultObject.zipcode
        request(sails.hooks.http.app)
          .post('/Place/searchByZipcodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(true, res.body.length > 0)
            requestResult = res.body[0]
            assert.equal(resultObject.address, requestResult.address)
            assert.equal(resultObject.city, requestResult.city)
            done();
          })

      })
    })


    it(' Advacend search by zipcode, agreementNumber,city and address', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }

        config.agreementNumber =  resultObject.agreementNumber
        config.city =  resultObject.city
        config.address =  resultObject.address
        config.zipcode =  resultObject.zipcode
        request(sails.hooks.http.app)
          .post('/Place/searchByZipcodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(true, res.body.length > 0)
            requestResult = res.body[0]
            assert.equal(resultObject.agreementNumber, requestResult.agreementNumber)
            assert.equal(resultObject.city, requestResult.city)
            assert.equal(resultObject.address, requestResult.address)
            done();
          })

      })
    })


    it('Count by zipcode', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 1;
        config.len = 5;

        config.zipcode =  resultObject.zipcode
        request(sails.hooks.http.app)
          .post('/Place/countByZipCodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("OK", res.body.res)
            assert.equal(1, res.body.size)
            done();
          })

      })
    })

    it(' Count by zipcode and  agreementNumber', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }

        }

        config.agreementNumber =  resultObject.agreementNumber
        config.zipcode =  resultObject.zipcode
        request(sails.hooks.http.app)
          .post('/Place/countByZipCodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("OK", res.body.res)
            assert.equal(1, res.body.size)
            done();
          })

      })
    })
 //---

    it(' Count  search all', function (done) {

      var faker;
      faker = require('faker');

      Place.find({name: {contains: ""}}).exec(function (err, resultObjectArray) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        config.city = ""
        request(sails.hooks.http.app)
          .post('/Place/countByCityMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("OK", res.body.res)
            assert.equal(resultObjectArray.length, res.body.size)
            done();
          })

      })
    })


    it(' Count  search by agreementNumber and city', function (done) {

      var faker;
      faker = require('faker');

      Place.findOne({name: {contains: "a"}}).exec(function (err, resultObject) {
        if (err) done(err)
        coordinatesArray = [51.190066452554424, 1.9543940842151645]
        var config = {
          lat: coordinatesArray[0],
          long: coordinatesArray[1],

        };

        config.page = 0;
        config.len = 5;

        PlaceObject = {
          name: resultObject.name,
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          zipcode: faker.address.zipCode(),
          city: faker.address.city(),
          phoneNumber: faker.phone.phoneNumber(),
          isActivated: faker.random.boolean(),
          agreementNumber: faker.random.words(),
          agreementName: faker.random.words(),
          latitude: resultObject.latitude,
          longitude: resultObject.longitude,
          location: {
            type: "Point",
            coordinates: [
              resultObject.longitude,
              resultObject.latitude
            ]
          }
        }

        config.address = resultObject.address
        config.city = resultObject.city
        request(sails.hooks.http.app)
          .post('/Place/countByCityMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            ///Returned created Place object
            assert.equal("OK", res.body.res)
            assert.equal(true, res.body.size == 1)
            done();
          })

      })
    })


  });
});
