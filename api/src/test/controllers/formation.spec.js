/**
 * Created by dionis on 6/30/2016.
 */


describe('FormationController', function() {

  describe('#find formation by date', function() {
    it(' should find formation with date ', function (done) {
      // var app = sails();
      var config = {
        name:"",
        initialDate:"2013/01/05",
        finalDate:"2023/01/05",
        page:0,
        len:5
      };

      request(sails.hooks.http.app)
        .post('/Formation/searchbydate')
        .send(config)
        .expect(200, function(err, res){
          if (err) return done(err);

          listValue =  res.body;
         // console.log("Answer", listValue)
          assert.equal(listValue.length,5)
          done();
        })
    });


    it(' should not search any date', function (done) {
      // var app = sails();
      var config = {
        name:"",
        initialDate:"2023/01/05",
        finalDate:"2023/01/05",
        page:0,
        len:5
      };

      request(sails.hooks.http.app)
        .post('/Formation/searchbydate')
        .send(config)
        .expect(200, function(err, res){
          if (err) return done(err);

          listValue =  res.body;
          assert.equal(listValue.length,0)
          done();
        })
    });


    it('should find formation with price ', function (done) {
      // var app = sails();
      var config = {
        name:"",
        initialDate:"2013/01/05",
        finalDate:"2023/01/05",
        price:50,
        page:0,
        len:5
      };

      request(sails.hooks.http.app)
        .post('/Formation/searchbydate')
        .send(config)
        .expect(200, function(err, res){
          if (err) return done(err);

          listValue =  res.body;
          assert.equal(listValue.length,5)
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
  describe('#find place by city ==> ', function() {
    it('--should find by first formation with initDate and endDate', function (done) {
      // var app = sails();
      Place.find({}).exec(function (err, Places) {
        iPlace = Places[0]
       // console.log("Data of place ", iPlace)
        var config = {
          city: iPlace.city,
          page: 0,
          len: 5,
          initDate: "2023/01/05",
          endDate: "2023/01/05"
        }

        request(sails.hooks.http.app)
          .post('/Formation/searchbycity')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            assert.equal(res.body.length, 1)
            done();
          })
      });
    });


    it('should find by first formation with price', function (done) {
      // var app = sails();
      Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {
        var config = {
          city: iPlace.city,
          page: 0,
          len:5,
          price:100000
        }

        request(sails.hooks.http.app)
          .post('/Formation/searchbycity')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            assert.equal(res.body.length, 0)
            done();
          })
      });
    });
    it('should find by first formation with price and return data', function (done) {
      // var app = sails();
      Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {

        var config = {
          city: iPlace.city,
          page: 0,
          len:5,
          price:10
        }

        request(sails.hooks.http.app)
          .post('/Formation/searchbycity')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            assert.equal(res.body.length, 1)
            done();
          })
      });
    });

    it('should find by first formation by zipcode with initDate and endDate', function (done) {
      // var app = sails();
      Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {

        var config = {
          zipcode: iPlace.zipcode,
          page: 0,
          len:5
        }

        request(sails.hooks.http.app)
          .post('/Formation/searchbyzipcode')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            assert.equal(res.body.length, 1)
            done();
          })
      });
    });

  });

  describe('#find place by city, zipcode', function() {

    it('should show error menssage', function (done) {
      // var app = sails();
      Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {
        //console.log("Data of place ", iPlace)
        var config = {
          name: iPlace.city,
          page: 0,
          len: 5,
          initDate: "2013/01/05",
          endDate: "2023/01/05"
        }

        request(sails.hooks.http.app)
          .post('/Formation/searchbycity')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            //console.log("Respuesta ",res.body )
            assert.equal('No city provided', res.body.err )
            done();
          })
      });
    });
    it('-should find by first formation with initDate and endDate', function (done) {
      // var app = sails();
      Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {
        //console.log("Data of place ", iPlace)
        var config = {
          city: iPlace.city,
          page: 0,
          len: 5,
          initDate: "2013/01/05",
          endDate: "2023/01/05"
        }

        request(sails.hooks.http.app)
          .post('/Formation/searchbycity')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            //console.log("Respuesta ",res.body.length )
            assert.equal(true, res.body.length > 0)
            done();
          })
      });
    });

    it('should find by first formation', function (done) {
      // var app = sails();
      Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {

        var config = {
          city: iPlace.city,
          page: 0,
          limit:5
        }

        request(sails.hooks.http.app)
          .post('/Formation/searchbycity')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            assert.equal(res.body.length, 1)
            done();
          })
      });
    });

    it('should find by first formation by zipcode', function (done) {
      // var app = sails();
      Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {

        var config = {
          zipcode: iPlace.zipcode,
          page: 0,
          limit:5
        }


        request(sails.hooks.http.app)
          .post('/Formation/searchbyzipcode')
          .send(config)
          .expect(200, function (err, res) {

            if (err) return done(err);
            assert.equal(res.body.length, 1)
            done();
          })
      });
    });
    it('should zipcode message error', function (done) {
      // var app = sails();
      Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {
        var config = {
          name: "a",
          page: 0,
          limit:5
        }

        request(sails.hooks.http.app)
          .post('/Formation/searchbyzipcode')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            assert.equal('No zipcode provided', res.body.err )
            done();
          })
      });
    }),
    it('should find by formation return all contain', function (done) {
        // var app = sails();
        Place.findOne().exec(function (err, iPlace) {

          var config = {
            city: "",
            page: 1,
            len:5
          }

          request(sails.hooks.http.app)
            .post('/Formation/searchbycity')
            .send(config)
            .expect(200, function (err, res) {
              //console.log("Respuesta", res.body)
              if (err) return done(err);
              assert.equal(res.body.length, 5)
              done();
            })
        });
      })

    it('should find by formation return all contain', function (done) {
      // var app = sails();
      Place.findOne().exec(function (err, iPlace) {

        var config = {
          city: "",
          page: 2,
          len:5
        }

        request(sails.hooks.http.app)
          .post('/Formation/searchbycity')
          .send(config)
          .expect(200, function (err, res) {
            //console.log("Respuesta", res.body)
            if (err) return done(err);
            assert.equal(res.body.length, 2)
            done();
          })
      });
    })
  });

  describe('#count formation by city, zipcode ==> ', function() {
    it('-- Count by city', function (done) {
      // var app = sails();
      Place.find({}).exec(function (err, Places) {
        iPlace = Places[0]
        // console.log("Data of place ", iPlace)
        var config = {
          city: iPlace.city,
        }

        request(sails.hooks.http.app)
          .post('/Formation/countbycity')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            assert.equal(res.body.res, "OK")
            assert.equal(res.body.size, 1)
            done();
          })
      });
    });

    it('-- Count by city with name contain a character', function (done) {
      // var app = sails();
      Place.find({city:{'contains' : 'a'}}).exec(function (err, Places) {
        iPlace = Places[0]
        // console.log("Data of place ", iPlace)
        var config = {
          city: iPlace.city,
        }

        request(sails.hooks.http.app)
          .post('/Formation/countbycity')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            assert.equal(res.body.res, "OK")
            assert.equal(res.body.size,  1)
            done();
          })
      });
    });

    it('-- Count by city with name contain a character', function (done) {
      // var app = sails();

        // console.log("Data of place ", iPlace)
        var config = {
          city: "a",
        }

        request(sails.hooks.http.app)
          .post('/Formation/countbycity')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            assert.equal(res.body.res, "OK")
            assert.equal(true,  res.body.size > 1)
            done();
          })

    });

    it('-- Count by city with  empty', function (done) {
      // var app = sails();
        // console.log("Data of place ", iPlace)
        var config = {
          city: ""
        }

        request(sails.hooks.http.app)
          .post('/Formation/countbycity')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            assert.equal(res.body.res, "OK")
            assert.equal(res.body.size, 12)
            done();
          })

    });

    it('-- Count by zipcode empty', function (done) {
      // var app = sails();
      // console.log("Data of place ", iPlace)
      var config = {
        zipcode: ""
      }

      request(sails.hooks.http.app)
        .post('/Formation/countbyzipcode')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);
          assert.equal('No zipcode provided', res.body.err )
          done();
        })

    });

    it('-- Count by zipcode', function (done) {
      // var app = sails();
      Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {

        var config = {
          zipcode: iPlace.zipcode,
          page: 0,
          limit:5
        }


        request(sails.hooks.http.app)
          .post('/Formation/countbyzipcode')
          .send(config)
          .expect(200, function (err, res) {

            if (err) return done(err);
            assert.equal(res.body.res, "OK")
            assert.equal(res.body.size, 1)
            done();
          })
      });
    });

    it('-- Count by zipcode error', function (done) {
      // var app = sails();


        var config = {
          zipcode: 3452323,
          page: 0,
          limit:5
        }


        request(sails.hooks.http.app)
          .post('/Formation/countbyzipcode')
          .send(config)
          .expect(200, function (err, res) {

            if (err) return done(err);
            assert.equal(res.body.res, "OK")
            assert.equal(res.body.size, 0)
            done();
          })

    });
  });



  describe('#Test find advaced search ==> ', function() {
    //it('--Advaced Search', function (done) {
    //  // var app = sails();
    //
    //    // console.log("Data of place ", iPlace)
    //    var config = {
    //      city: "a",
    //    }
    //
    //    request(sails.hooks.http.app)
    //      .post('/Formation/searchByCityMongoEx')
    //      .send(config)
    //      .expect(200, function (err, res) {
    //        if (err) return done(err);
    //
    //       // console.log("Resultado ", res.body);
    //
    //        assert.equal(true, res.body.length > 1)
    //        done();
    //      })
    //
    //});

    it('-should find by first formation with initDate and endDate in native Mongo', function (done) {
      // var app = sails();
      Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {
        //console.log("Data of place ", iPlace)
        var config = {
          zipcode: iPlace.zipcode,
          page: 0,
          len: 5,
          initialDate: "2016-10-04",
          finalDate: "2017-05-03"
        }

        request(sails.hooks.http.app)
          .post('/Formation/searchByZipcodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            //console.log("Respuesta ",res.body.length )
            assert.equal( res.body.length,1)
            done();
          })
      });
    });

    it('-should count  by first formation with initDate and endDate in native Mongo', function (done) {
      // var app = sails();
      Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {
        //console.log("Data of place ", iPlace)
        var config = {
          zipcode: iPlace.zipcode,
          page: 0,
          len: 5,
          initialDate: "2016-10-04",
          finalDate: "2017-05-03"
        }

        request(sails.hooks.http.app)
          .post('/Formation/countByZipcodeMongoEx')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            //console.log("Respuesta ",res.body.length )
            assert.equal( res.body,1)
            done();
          })
      });
    });


    it('-should find by first formation with initDate, endDate and price in native Mongo', function (done) {
      // var app = sails();

      // console.log("Data of place ", iPlace)
      var config = {
        city: "a",
        page: 0,
        price: 100,
        len: 5,
        initialDate: "2016-10-04",
        finalDate: "2017-05-03"
      }

      request(sails.hooks.http.app)
        .post('/Formation/searchByCityMongoEx')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);

          // console.log("Resultado ", res.body);

          assert.equal(true, res.body.length > 1)
          done();
        })

    });

    it('-should count by first formation with initDate, endDate and price in native Mongo', function (done) {
      // var app = sails();

      // console.log("Data of place ", iPlace)
      var config = {
        city: "a",
        page: 0,
        price: 100,
        len: 5,
        initialDate: "2016-10-04",
        finalDate: "2017-05-03"
      }

      request(sails.hooks.http.app)
        .post('/Formation/countByCityMongoEx')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);

          // console.log("Resultado ", res.body);

          assert.equal(true, res.body > 1)
          done();
        })

    });

    //it('should find by first formation in native Mongo', function (done) {
    //  // var app = sails();
    //  Place.findOne({city:{'contains' : 'a'}}).exec(function (err, iPlace) {
    //
    //    var config = {
    //      city: iPlace.city,
    //      page: 0,
    //      limit:5
    //    }
    //
    //    request(sails.hooks.http.app)
    //      .post('/Formation/searchByCityMongoEx')
    //      .send(config)
    //      .expect(200, function (err, res) {
    //        if (err) return done(err);
    //        assert.equal(res.body.length, 1)
    //        done();
    //      })
    //  });
    //});
  });




});
