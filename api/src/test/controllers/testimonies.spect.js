/**
 * Created by dionis on 8/10/2016.
 */
request = require('supertest'),
  assert = require('assert');
salis = require('sails');

describe('TestimonyController', function() {

  describe('#Testimony controller requests()', function() {
    it('find Testimonys', function (done) {
      // var app = sails();
      var config = {
      };

      config.page = 0
      config.len = 5

      Testimony.findOne({text:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
        config.question = resultFaq.text
        request(sails.hooks.http.app)
          .post('/Testimony/findTestimonies', config)
          .send(config)
          .expect(200, function(err, res){
            if (err) return done(err);

            console.log("ANSWER", res.body);
            assert.equal(1, res.body.length);
            resBodyFaq = res.body[0]
            assert.equal(true, resultFaq.question == resBodyFaq.question);
            assert.equal(true, "" != resBodyFaq.answer);
            done();
          })


      })


    });

    it('find Testimonys in page 3', function (done) {
      // var app = sails();
      var config = {
      };

      config.page = 3
      config.len = 5


        request(sails.hooks.http.app)
          .post('/Testimony/findTestimonies', config)
          .send(config)
          .expect(200, function(err, res){
            if (err) return done(err);

            //console.log("ANSWER", res.body);
            assert.equal(5, res.body.length);
            resBodyFaq = res.body[0]
            assert.equal(true, "" != resBodyFaq.answer);
            done();
          })





    });

    it('find Testimonys whitout page', function (done) {
      // var app = sails();
      var config = {
      };

      Testimony.findOne({text:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
        config.question = resultFaq.text
        request(sails.hooks.http.app)
          .post('/Testimony/findTestimonies', config)
          .send(config)
          .expect(200, function(err, res){
            if (err) return done(err);

            assert.equal('The page parameter is an invalid string number', res.body.err);
            done();
          })


      })
    });
    it('find Testimonys whitout len', function (done) {
        // var app = sails();
        var config = {
        };

        config.page = 1
      Testimony.findOne({text:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
          config.question = resultFaq.text
          request(sails.hooks.http.app)
            .post('/Testimony/findTestimonies', config)
            .send(config)
            .expect(200, function(err, res){
              if (err) return done(err);

              //console.log("Answer",res.body )
              assert.equal('The len parameter is an invalid string number', res.body.err);
              done();
            })


        })


    });

    it('find Testimonys whit len not number ', function (done) {
      // var app = sails();
      var config = {
      };

      config.page = 1
      config.len ="SDFSFSDF"
      Testimony.findOne({text:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
        config.question = resultFaq.text
        request(sails.hooks.http.app)
          .post('/Testimony/findTestimonies', config)
          .send(config)
          .expect(200, function(err, res){
            if (err) return done(err);

           // console.log("Answer",res.body )
            assert.equal('The len parameter is an invalid string number', res.body.err);
            done();
          })
       })
    });

    it('find Testimonys whit page not number', function (done) {
      // var app = sails();

      var config = {
      };

      config.page ="sdfsesde"
      Testimony.findOne({text:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
        config.question = resultFaq.text
        request(sails.hooks.http.app)
          .post('/Testimony/findTestimonies', config)
          .send(config)
          .expect(200, function(err, res){
            if (err) return done(err);

            //console.log("Answer",res.body )
            assert.equal('The page parameter is an invalid string number', res.body.err);
            done();
          })
       })
    });
    it('count Testimonys', function (done) {
      request(sails.hooks.http.app)
        .post('/Testimony/countAllTestimonies')
        .expect(200, function(err, res){
          if (err) return done(err);

          assert.equal(true, res.body.size > 3);
          done();
        })

    });

    it('count Testimonys existed', function (done) {
      // var app = sails();
      var config = {
      };

      Testimony.findOne({text:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
        config.question = resultFaq.text
        request(sails.hooks.http.app)
          .post('/Testimony/countAllTestimonies', config)
          .send(config)
          .expect(200, function(err, res){
            if (err) return done(err);

            assert.equal(1, res.body.size);
            done();
          })


      })


    });

  })
});
