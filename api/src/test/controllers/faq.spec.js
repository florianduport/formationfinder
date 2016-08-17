/**
 * Created by dionis on 8/10/2016.
 */
request = require('supertest'),
  assert = require('assert');
salis = require('sails');

describe('FAQController', function() {

  describe('#FAQ controller requests()', function() {
    it('find FAQs', function (done) {
      // var app = sails();
      var config = {
      };

      config.page = 0
      config.len = 5

      Faq.findOne({question:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
        config.question = resultFaq.question
        request(sails.hooks.http.app)
          .post('/Faq/findFaq', config)
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

    it('find FAQs in page 3', function (done) {
      // var app = sails();
      var config = {
      };

      config.page = 3
      config.len = 5


        request(sails.hooks.http.app)
          .post('/Faq/findFaq', config)
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

    it('find FAQs whitout page', function (done) {
      // var app = sails();
      var config = {
      };

      Faq.findOne({question:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
        config.question = resultFaq.question
        request(sails.hooks.http.app)
          .post('/Faq/findFaq', config)
          .send(config)
          .expect(200, function(err, res){
            if (err) return done(err);

            assert.equal('The page parameter is an invalid string number', res.body.err);
            done();
          })


      })
    });
    it('find FAQs whitout len', function (done) {
        // var app = sails();
        var config = {
        };

        config.page = 1
        Faq.findOne({question:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
          config.question = resultFaq.question
          request(sails.hooks.http.app)
            .post('/Faq/findFaq', config)
            .send(config)
            .expect(200, function(err, res){
              if (err) return done(err);

              //console.log("Answer",res.body )
              assert.equal('The len parameter is an invalid string number', res.body.err);
              done();
            })


        })


    });

    it('find FAQs whit len not number ', function (done) {
      // var app = sails();
      var config = {
      };

      config.page = 1
      config.len ="SDFSFSDF"
      Faq.findOne({question:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
        config.question = resultFaq.question
        request(sails.hooks.http.app)
          .post('/Faq/findFaq', config)
          .send(config)
          .expect(200, function(err, res){
            if (err) return done(err);

           // console.log("Answer",res.body )
            assert.equal('The len parameter is an invalid string number', res.body.err);
            done();
          })
       })
    });

    it('find FAQs whit page not number', function (done) {
      // var app = sails();

      var config = {
      };

      config.page ="sdfsesde"
      Faq.findOne({question:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
        config.question = resultFaq.question
        request(sails.hooks.http.app)
          .post('/Faq/findFaq', config)
          .send(config)
          .expect(200, function(err, res){
            if (err) return done(err);

            //console.log("Answer",res.body )
            assert.equal('The page parameter is an invalid string number', res.body.err);
            done();
          })
       })
    });
    it('count FAQS', function (done) {
      request(sails.hooks.http.app)
        .post('/Faq/countFaq')
        .expect(200, function(err, res){
          if (err) return done(err);

          assert.equal(true, res.body.size > 3);
          done();
        })

    });

    it('count FAQs existed', function (done) {
      // var app = sails();
      var config = {
      };

      Faq.findOne({question:{contains:"a"}}).exec( function faqRequest(err, resultFaq){
        config.question = resultFaq.question
        request(sails.hooks.http.app)
          .post('/Faq/countFaq', config)
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
