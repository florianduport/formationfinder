/**
 * Created by dionis on 7/21/2016.
 */
module.exports.bootstrap = function (cb) {

  // Ensure we have 2dsphere index on Property so GeoSpatial queries can work!
  sails.models.Place.native(function (err, collection) {
    collection.ensureIndex({ location: '2dsphere' }, function () {

      // It's very important to trigger this callack method when you are finished
      // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
      cb();

    });
  });


};
