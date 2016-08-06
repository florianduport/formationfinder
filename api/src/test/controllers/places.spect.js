/**
 * Created by dionis on 6/30/2016.
 */


describe('PlaceController', function() {

  ////Shuld be insert data for test
  request = require('supertest'),
  assert = require('assert');
  salis = require('sails');

 describe('#find place by position and radio ==> ', function() {
      it('shoul find by positicion', function (done) {
        // var app = sails();
        var config = {
          lat:  48.090066452554424,
          long: 1.7543940842151642
        };

        request(sails.hooks.http.app)
          .post('/Place/searchbyposition')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal( res.body.response, "OK")
            resultArray = res.body.result
            assert.notEqual(resultArray.length, 1)

            done();
          })
      })
    })

    describe('#find place by position and radio', function() {
        it('should not find by positicion', function (done) {
          // var app = sails();
          var config = {
            lat:  148.090066452554424,
            long: 10.7543940842151642

          };

          request(sails.hooks.http.app)
            .post('/Place/searchbyposition')
            .send(config)
            .expect(200, function(err, res){
              if (err) return done(err);
              assert.equal(res.body.response,"ERROR")
              done();
            })
          })
        })

  describe('#find place by position and radio', function() {
    it('should not find by positicion by missing parameter lat', function (done) {
      // var app = sails();
      var config = {
        long: 1.7543940842151642

      };

      request(sails.hooks.http.app)
        .post('/Place/searchbyposition')
        .send(config)
        .expect(200, function(err, res){
          if (err) return done(err);
          assert.equal(res.body.response,"ERROR")
          assert.equal(res.body.msg ,"Parameter lat not exist")
          done();
        })
    })
  })

  describe('#find place by position and radio', function() {
    it('should not find by positicion by missing  parameter long', function (done) {
      // var app = sails();
      var config = {
        lat: 1.7543940842151642

      };

      request(sails.hooks.http.app)
        .post('/Place/searchbyposition')
        .send(config)
        .expect(200, function(err, res){
          if (err) return done(err);
          assert.equal(res.body.response,"ERROR")
          assert.equal(res.body.msg ,"Parameter long not exist")
          done();
        })
    })
  })


  describe('#find place by position and radio', function() {
            it('--should find by positicion', function (done) {
              // var app = sails();
              var config = {
                lat:  48.090066452554424,
                long: 1.7543940842151642,
                distance: 200000

              };

              request(sails.hooks.http.app)
                .post('/Place/searchbyposition')
                .send(config)
                .expect(200, function(err, res){
                  if (err) return done(err);

                  assert.equal( res.body.response, "OK")
                  resultArray = res.body.result
                  //assert.notEqual( true, resultArray.length  > 1)
                  assert.equal( true, resultArray.length  > 1)
                  done();
                })
            })
          });

      it('--Create and search find by positicion', function (done) {
        // var app = sails();
        var faker;
        faker = require('faker');

        coordinatesArray = [50.090066452554424, 1.7543940842151645 ]
        var config = {
          lat: coordinatesArray[0] ,
          long: coordinatesArray[1],

        };

        Place.create({
            name: faker.internet.userName(),

            email: faker.internet.email(),

            address: faker.address.streetAddress(),

            zipcode:faker.address.zipCode(),

            city:faker.address.city(),

            phoneNumber:faker.phone.phoneNumber(),


            isActivated: faker.random.boolean(),

            agreementNumber:faker.random.words(),

            agreementName:faker.random.words(),

            latitude: coordinatesArray[0],
            longitude  :coordinatesArray[1],
            location:{
              type: "Point",
              coordinates: [
                coordinatesArray[1],
                coordinatesArray[0]
              ]
            }

          })
          .exec(function(err, user) {
            if (err) {
              fail("Error: " + err)
              done()
            }
            request(sails.hooks.http.app)
              .post('/Place/searchbyposition')
              .send(config)
              .expect(200, function(err, res){
                if (err) return done(err);

                assert.equal( res.body.response, "OK")
                resultArray = res.body.result
                //assert.notEqual( true, resultArray.length  > 1)
                assert.equal( resultArray.length,  1)
                done();
              })
          });


      })

  it('--Create Place using http', function (done) {
    // var app = sails();
    var faker;
    faker = require('faker');

    coordinatesArray = [51.090066452554424, 1.7543940842151645 ]
    var config = {
      lat: coordinatesArray[0] ,
      long: coordinatesArray[1],

    };

    PlaceObject = {
        name: faker.internet.userName(),

        email: faker.internet.email(),

        address: faker.address.streetAddress(),

        zipcode:faker.address.zipCode(),

        city:faker.address.city(),

        phoneNumber:faker.phone.phoneNumber(),


        isActivated: faker.random.boolean(),

        agreementNumber:faker.random.words(),

        agreementName:faker.random.words(),

        latitude: coordinatesArray[0],
        longitude  :coordinatesArray[1],
        location:{
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
          .expect(201, function(err, res){
            if (err) return done(err);

            ///Returned created Place object
            assert.equal(res.body.latitude,coordinatesArray[0])

            done();
          })



  })

  });
