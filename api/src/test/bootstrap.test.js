/**
 * Created by dionis on 6/18/2016.
 */
var sails = require('sails');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.

  this.timeout(50000);

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
    done(err, sails);
  });



});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
