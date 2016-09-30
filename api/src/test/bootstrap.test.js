/**
 * Created by dionis on 6/18/2016.
 */
var sails = require('sails');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.

  this.timeout(500000);

  //var fs = require('fs');


  sails.lift({
    // configuration for testing purposes
    environment:"test",
    models  : {
         migrate: 'drop'
    }


  }, function(err, server) {
    if (err) return done(err);
    // here you can load fixtures, etc.
   /// server.environment= "test"

    var fs = require('node-properties-parser');

    try {
      try {
        var config = fs.readSync('etc/config.properties');
        console.log("JSON FILE READED", config)
        sails.config.globals.configsystem = config;
      }catch (err) {
        console.log("ERROR: ", err)
      }

    }
    catch (err) {

      console.error(err);
    }
    done(err, sails);
  });



});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
