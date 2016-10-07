/**
 * Created by dionis on 7/24/2016.
 */

module.exports   = {

  searchPosition: function  ( latitude, longitude, distance, callback) {
  ///Search al place and return
  Place.native(function(err, collection) {

    if (err) return res.serverError(err);


   // console.log( "Call search in MogoDB")
   //Include pagination
    var page = 0;
    var len = 10;

    ///Read if exist parament pagination
    skip = page * len
    collection.find({
          location:
        { $near :
        {
          $geometry: { type: "Point",  coordinates: [ longitude, latitude] }, $maxDistance: distance}
        }

      }).limit(len).skip(skip).toArray(function (err, results) {
     // console.log("Get data in DB -- ", (err))
      if (err) {
        console.log("Error -- ", (err))
        callback(results);

      }
      else {            //console.log("Get data in DB ", (results))
            callback(results);
          }
    });
  });
},

  isExistPlaceName: function ( placeName, callback) {

    if ( placeName == "" || typeof  placeName == "undefined") {
      callback(null, false)
      return false
    }

    Place.findOne({name:placeName}).exec(function (err, resultData){
      if (err) {
        callback(err, false)
        return;
      }

      if (typeof  resultData  == "undefined") {
        console.log("Return false")
        callback(null, false)
        return;
      }
      callback(null, true)

    })
  },


  isExistSameLocation: function ( latitude, longitude, callback) {
    if ( latitude == "" || typeof  latitude == "undefined" ||  longitude == "" || typeof  longitude == "undefined") {
      callback(null, false)
      return;
    }

    Place.findOne({latitude:latitude, longitude:longitude}).exec(function( err, resultObject){
      if (err) {
        callback(err, false)
        return;
      }

      if (typeof  resultData  == "undefined") {
        callback(null, false)
        return;
      }

      callback(null, true)
    })
  }
}

