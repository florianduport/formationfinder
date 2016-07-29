/**
 * Created by dionis on 7/24/2016.
 */

module.exports   = {

  searchPosition: function  ( latitude, longitude, distance, callback) {
  ///Search al place and return
  Place.native(function(err, collection) {

    if (err) return res.serverError(err);


   // console.log( "Call search in MogoDB")
    collection.find({
          location:
        { $near :
        {
          $geometry: { type: "Point",  coordinates: [ longitude, latitude] }, $maxDistance: distance}
        }

      }).toArray(function (err, results) {
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
}
}

