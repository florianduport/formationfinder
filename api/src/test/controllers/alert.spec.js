/**
 * Created by dionis on 8/20/2016.
 */


describe('AlertController', function () {
  var faker;
  faker = require('faker');
  enumArray = ['New_Costumer', 'Formation_Full', 'Place_Unable']
  describe('#Alert CRUD Rest service test suite  ==> ', function () {
    //it("Validate Mail Configuration ", function (done) {
    //
    //
    //  Configuration.find({type: "smtp"}).exec(function userFounded(err, configuration) {
    //    if (err || configuration.length == 0) {
    //      //Configuration.create({
    //      //  name: "mail",
    //      //  type: "smtp",
    //      //  emailsystemadress: "formationfinder@localhost.com",
    //      //  emailport: "25",
    //      //  emailhost: "127.0.0.1",
    //      //  emailuser: "dionis@localhost.com",
    //      //  emailpassword: "",
    //      //  emailsecure: false
    //      //}).then(function (Configurations) {
    //      //  configuration = Configurations[0];
    //      //  //console.log("Creado el objeto en BD");
    //      //});
    //      // GMail configuration
    //
    //      emailconfig = {
    //        name: "mail",
    //        type: "smtp"
    //      }
    //      if (typeof sails.config.globals.configsystem != "undefined") {
    //
    //        if (typeof sails.config.globals.configsystem.emailsystemadress != "undefined") {
    //          emailconfig.emailsystemadress = sails.config.globals.configsystem.emailsystemadress
    //          console.log("Read config value to configuration file.");
    //        }
    //        else {
    //          console.log("No exist emailsystemadress  parameter in config system file set default parameter.");
    //          emailconfig.emailsystemadress = "formationfinder@localhost.com"
    //
    //        }
    //
    //
    //        if (typeof sails.config.globals.configsystem.emailport != "undefined") {
    //          emailconfig.emailport = sails.config.globals.configsystem.emailport
    //          console.log("Read config value to configuration file.");
    //        }
    //        else {
    //          console.log("No exist  emailport  parameter in config system file set default parameter.");
    //          emailconfig.emailport = "25"
    //
    //        }
    //
    //        if (typeof sails.config.globals.configsystem.emailhost != "undefined") {
    //          emailconfig.emailhost = sails.config.globals.configsystem.emailhost
    //          console.log("Read config value to configuration file.");
    //        }
    //        else {
    //          console.log("No exist  emailhost  parameter in config system file set default parameter.");
    //          emailconfig.emailhost = "127.0.0.1"
    //        }
    //
    //        if (typeof sails.config.globals.configsystem.emailuser != "undefined") {
    //          emailconfig.emailuser = sails.config.globals.configsystem.emailuser
    //          console.log("Read config value to configuration file.");
    //        }
    //        else {
    //          console.log("No exist  emailuser  parameter in config system file set default parameter.");
    //          emailconfig.emailuser = "formationfinder@localhost.com"
    //        }
    //
    //        if (typeof sails.config.globals.configsystem.emailpassword != "undefined") {
    //          emailconfig.emailpassword = sails.config.globals.configsystem.emailpassword
    //          console.log("Read config value to configuration file.");
    //        }
    //        else {
    //          console.log("No exist  emailuser  parameter in config system file set default parameter.");
    //          emailconfig.emailpassword = ""
    //        }
    //
    //        if (typeof sails.config.globals.configsystem.emailsecure != "undefined") {
    //          emailconfig.emailsecure = sails.config.globals.configsystem.emailsecure
    //          console.log("Read config value to configuration file.");
    //        }
    //        else {
    //          console.log("No exist  emailsecure  parameter in config system file set default parameter.");
    //          emailconfig.emailsecure = false
    //        }
    //      }
    //
    //      //Configuration.create({
    //      //name: "mail",
    //      //type: "smtp",
    //      //emailsystemadress: "formationfinder@localhost.com",
    //      //emailport: "587",
    //      //emailhost: "smtp.gmail.com",
    //      //emailuser: "inoid2007@gmail.com",
    //      //emailpassword: "cibercubano",
    //      //emailsecure: false
    //      //}).then(function (Configurations) {
    //      //configuration = Configurations[0];
    //      ////console.log("Creado el objeto en BD");
    //      //});
    //
    //
    //      Configuration.create({
    //        emailconfig
    //      }).then(function (err, Configurations) {
    //        console.log("DATABASE CONFIGURATION " , Configurations)
    //         done();
    //      })
    //    }
    //  })
    //})
    it('Create alert', function (done) {

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        console.log("Array type ", enumArray[faker.random.number(enumArray.length) - 1])
        var config = {
          text: faker.lorem.paragraph(),
          type: enumArray[faker.random.number(enumArray.length) - 1],
          formationCenter: firstFormationCenter.id,
          date: new Date()
        }


        config.nameformation = firstFormationCenter.name;
        request(sails.hooks.http.app)
          .post('/Alert/createAlertToFormationCenter')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
             console.log("LOG", res.body)
            assert.equal(res.body.response, "OK")
            done();
          })
      })
    })

    it('Create alert with type IsFull (Formation is Full)', function (done) {

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        var config = {
          text: faker.lorem.paragraph(),
          formationCenter: firstFormationCenter.id,
          date: new Date()
        }


        config.nameformation = firstFormationCenter.name;
        request(sails.hooks.http.app)
          .post('/Alert/createAlertIsFull')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            console.log("LOG", res.body)
            assert.equal(res.body.response, "OK")
            assert.equal(res.body.result.type, enumArray[1])
            done();
          })
      })
    })

    it('Create alert with type CustomerBooked (Client has booked a formation)', function (done) {

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        var config = {
          text: faker.lorem.paragraph(),
          formationCenter: firstFormationCenter.id,
          date: new Date()
        }


        config.nameformation = firstFormationCenter.name;
        request(sails.hooks.http.app)
          .post('/Alert/createAlertCustomerBooked')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            console.log("LOG", res.body)
            assert.equal(res.body.response, "OK")
            assert.equal(res.body.result.type, enumArray[0])
            done();
          })
      })
    })

    it('Create alert whitout paremeter text ', function (done) {
      // var app = sails();
      var config = {
        type: enumArray[faker.random.number(enumArray.length)],
        formationCenter: firstFormationCenter.id,
        date: new Date()
      }


      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;

        request(sails.hooks.http.app)
          .post('/Alert/createAlertToFormationCenter')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "ERROR")
            assert.equal("Not defined text parameter", res.body.message)
            done();
          })
      })
    })


    it('Create alert whitout paremeter type  ', function (done) {
      // var app = sails();
      var config = {
        text: faker.lorem.paragraph(),
        formationCenter: firstFormationCenter.id,
        date: new Date()
      }


      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        request(sails.hooks.http.app)
          .post('/Alert/createAlertToFormationCenter')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "ERROR")
            assert.equal("Not defined type parameter", res.body.message)
            done();
          })
      })
    })

    it('Create alert whitout paremeter nameformation ', function (done) {
      // var app = sails();
      var config = {
        text: faker.lorem.paragraph(),
        type: enumArray[faker.random.number(enumArray.length)],
        formationCenter: firstFormationCenter.id,
        date: new Date()
      }


      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]


        config.amount = 50;
        request(sails.hooks.http.app)
          .post('/Alert/createAlertToFormationCenter')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "ERROR")
            assert.equal("Not defined Formation´s name", res.body.message)
            done();
          })
      })
    })

    it('Create alert whit Formation Center not exist ', function (done) {
      // var app = sails();
      var config = {
        text: faker.lorem.paragraph(),
        type: enumArray[faker.random.number(enumArray.length)],
        formationCenter: firstFormationCenter.id,
        date: new Date()
      }

      config.nameformation = "__________________";

      request(sails.hooks.http.app)
        .post('/Alert/createAlertToFormationCenter')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);

          assert.equal(res.body.response, "ERROR")
          assert.equal("Not exist Formation´s name", res.body.message)
          done();
        })

    })


    it('Delete alert ', function (done) {
      // var app = sails();
      var config = {};

      Alert.findOne({text: {contains: "a"}}).exec(function (err, resultObject) {

        if (err) done(err)
        config.id = resultObject.id;

        FormationCenter.find().exec(function (err, resultArray) {

          if (err) done(err)

          firstFormationCenter = resultArray[0]
          config.nameformation = firstFormationCenter.name;

          request(sails.hooks.http.app)
            .post('/Alert/deleteAlertByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(res.body.response, "OK")
              Alert.findOne({id: resultObject.id}).exec(function (err, resultObject) {
                if (err) done(err)

                assert.equal(undefined, resultObject)
                done();
              })
            })

        })
      })

    })


    it('Delete alert without id ', function (done) {
      // var app = sails();
      var config = {};

      Alert.findOne({text: {contains: "a"}}).exec(function (err, resultObject) {

        if (err) done(err)


        FormationCenter.find().exec(function (err, resultArray) {

          if (err) done(err)

          firstFormationCenter = resultArray[0]
          config.nameformation = firstFormationCenter.name;

          request(sails.hooks.http.app)
            .post('/Alert/deleteAlertByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(res.body.response, "ERROR")
              assert.equal(res.body.message, "Not defined alert id")
              done();
            })

        })
      })

    })


    it('Delete alert with not correct id ', function (done) {
      // var app = sails();
      var config = {};

      Alert.findOne({text: {contains: "a"}}).exec(function (err, resultObject) {

        if (err) done(err)
        config.id = "sfsfsfsfsfs";

        FormationCenter.find().exec(function (err, resultArray) {

          if (err) done(err)

          firstFormationCenter = resultArray[0]
          config.nameformation = firstFormationCenter.name;

          request(sails.hooks.http.app)
            .post('/Alert/deleteAlertByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(res.body.response, "ERROR")
              assert.equal(res.body.message, "Alert id parameter is an invalid string number")
              done();
            })

        })
      })

    })

    it('Search alert with text ', function (done) {
      // var app = sails();
      var config = {};

      Alert.findOne({text: {contains: "a"}}).exec(function (err, resultObject) {

        if (err) done(err)
        config.text = resultObject.text;

        FormationCenter.find().exec(function (err, resultArray) {

          if (err) done(err)

          firstFormationCenter = resultArray[0]
          config.nameformation = firstFormationCenter.name;

          request(sails.hooks.http.app)
            .post('/Alert/searchAlertByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(res.body.response, "OK")
              assert.equal(true, res.body.result.length == 1)
              responseObject = res.body.result[0]
              assert.equal(responseObject.text, resultObject.text)
              done();
            })

        })
      })

    })


    it('Search alert with initialDate ', function (done) {
      // var app = sails();
      var config = {};


      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]
        config.nameformation = firstFormationCenter.name;

        config.initialDate = "2014/07/02"
        request(sails.hooks.http.app)
          .post('/Alert/searchAlertByFormationCenter')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);
            assert.equal(res.body.response, "OK")
            assert.equal(true, res.body.result.length > 1)
            done();
          })
      })

    })


    it('Search alert with finalDate ', function (done) {
      // var app = sails();
      var config = {};


      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]
        config.nameformation = firstFormationCenter.name;
        config.finalDate = "2025/07/02"
        request(sails.hooks.http.app)
          .post('/Alert/searchAlertByFormationCenter')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "OK")
            assert.equal(true, res.body.result.length > 1)
            done();
          })
      })

    })


    it('Search alert with initial and  final Date ', function (done) {
      // var app = sails();
      var config = {};


      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]
        config.nameformation = firstFormationCenter.name;
        config.initialDate = "2014/07/02"
        config.finalDate = "2025/07/02"
        request(sails.hooks.http.app)
          .post('/Alert/searchAlertByFormationCenter')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "OK")
            assert.equal(true, res.body.result.length > 1)
            done();
          })
      })

    })


    ///------------------------------------

    it('Search alert with  FormationCenter name pagination', function (done) {
      // var app = sails();
      var config = {};


      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]
        config.nameformation = firstFormationCenter.name;
        config.page = 1;
        config.len = 5;
        request(sails.hooks.http.app)
          .post('/Alert/searchAlertByFormationCenter')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "OK")
            assert.equal(true, res.body.result.length > 1)
            done();
          })
      })

    })


    it('Search alert with FormationCenter name pagination (One result)', function (done) {
      // var app = sails();
      var config = {};


      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]
        config.nameformation = firstFormationCenter.name;
        config.page = 1;
        config.len = 1;
        request(sails.hooks.http.app)
          .post('/Alert/searchAlertByFormationCenter')
          .send(config)
          .expect(200, function (err, res) {
            if (err) return done(err);

            assert.equal(res.body.response, "OK")
            assert.equal(true, res.body.result.length == 1)
            done();
          })
      })

    })


    ///------------------------------


    it('Count all alert FormationCenter name ', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {
        Alert.find().exec(function (err, resultObjectArray) {

          if (err) done(err)

          firstFormationCenter = resultArray[0]

          config.nameformation = firstFormationCenter.name;

          request(sails.hooks.http.app)
            .post('/Alert/countAlertByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(resultObjectArray.length, res.body.size)
              done();
            })
        })
      })

    })

    it('Count alert with initialDate FormationCenter name', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        Alert.findOne({text: {contains: "a"}}).exec(function (err, resultObject) {

          if (err) done(err)

          //config.amount = resultObject.amount;
          config.initialDate = "2014/07/02"
          request(sails.hooks.http.app)
            .post('/Alert/countAlertByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(true, res.body.size > 1)
              done();
            })
        })

      })

    })


    it('Count alert with initialDate FormationCenter name pagination', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        config.page = 1;
        config.len = 1;
        Alert.find().exec(function (err, resultObject) {

          if (err) done(err)

          config.ammount = 50;
          request(sails.hooks.http.app)
            .post('/Alert/countAlertByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(resultObject.length, res.body.size)
              done();
            })
        })

      })

    })


    it('Count alert with finalDate  FormationCenter name', function (done) {
      // var app = sails();
      var config = {};

      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;
        Alert.findOne({text: {contains: "a"}}).exec(function (err, resultObject) {
          if (err) done(err)

          //config.amount = resultObject.amount;
          //config.initialDate = "2014/07/02"
          config.finalDate = "2025/07/02"
          request(sails.hooks.http.app)
            .post('/Alert/countAlertByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(true, res.body.size > 1)
              done();
            })
        })
      })

    })


    it('Count alert with initial and  final Date FormationCenter name ', function (done) {
      // var app = sails();
      var config = {};
      FormationCenter.find().exec(function (err, resultArray) {

        if (err) done(err)

        firstFormationCenter = resultArray[0]

        config.nameformation = firstFormationCenter.name;

        Alert.findOne({text: {contains: "a"}}).exec(function (err, resultObject) {

          if (err) done(err)

          // config.amount = resultObject.amount;
          config.initialDate = "2014/07/02"
          config.finalDate = "2025/07/02"
          request(sails.hooks.http.app)
            .post('/Alert/countAlertByFormationCenter')
            .send(config)
            .expect(200, function (err, res) {
              if (err) return done(err);

              assert.equal(true, res.body.size > 1)
              done();
            })
        })

      })
    })

    it('Find alert type  ', function (done) {
      // var app = sails();
      var config = {};
      config.language = "en"
      config.type = 'New_Costumer'
      request(sails.hooks.http.app)
        .post('/Alert/getAlertType')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);

          assert.equal(res.body.response, "New costumer")

          done();
        })


    })

    it('Find alert type ERROR  ', function (done) {
      // var app = sails();
      var config = {};
      config.language = "en"
      config.type = '_____'
      request(sails.hooks.http.app)
        .post('/Alert/getAlertType')
        .send(config)
        .expect(200, function (err, res) {
          if (err) return done(err);
          assert.equal(res.body.response, "ERROR")
          assert.equal(res.body.message, "Invalid parameter.")

          done();
        })


    })


  })
})
