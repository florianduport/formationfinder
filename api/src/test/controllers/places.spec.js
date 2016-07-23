/**
 * Created by dionis on 6/30/2016.
 */


describe('PlaceController', function() {

  ////Shuld be insert data for test
  request = require('supertest'),
  assert = require('assert');
  salis = require('sails');

/*  describe('#find place by position and radio', function() {
      it('shoul find by positicion', function (done) {
        // var app = sails();
        var config = {
          latitude: "dionis@localhost.com",
          longitude: "test@localhost.com",
          radio: "Verificando efectividad",
          page: 10
        };

        request(sails.hooks.http.app)
          .post('/Place/searchbyposition')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal( res.body.response, "OK")

            resultArray = res.body.result

            assert.notEqual(resultArray.length, 0)

            done();
          })
      })
    })

    describe('#find place by position and radio', function() {
        it('shoul find by positicion', function (done) {
          // var app = sails();
          var config = {
            latitude:"dionis@localhost.com",
            radio:"Verificando efectividad"

          };

          request(sails.hooks.http.app)
            .post('/Place/searchbyposition')
            .send(config)
            .expect(200, function(err, res){
              if (err) return done(err);
              assert.equal(res.body.response,"ERROR")
              assert.equal(res.body.message ,"Not exist longitude data")
              done();
            })
          })
        })

      describe('#find place by position and radio', function() {
            it('shoul find by positicion', function (done) {
              // var app = sails();
              var config = {
                longitude:"test@localhost.com",
                radio:"Verificando efectividad"

              };

              request(sails.hooks.http.app)
                .post('/Place/searchbyposition')
                .send(config)
                .expect(200, function(err, res){
                  if (err) return done(err);
                  assert.equal(res.body.response,"ERROR")
                  assert.equal(res.body.message ,"Not exist latitude data")
                  done();
                })
            })
          });*/





  });
