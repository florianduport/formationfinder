/**
 * PlaceController
 *
 * @description :: Server-side logic for managing places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   *
   * @param req lat: latidude, long: longitude, distance(optional): Max distance in meters
   * @param res
   * @param next
     */
  searchbyposition: function (req, res, next) {

    latitude = req.param("lat");
    longitude = req.param("long")

    if (!latitude ) {
      return res.json({
        response: "ERROR",
        msg: "Parameter lat not exist"
      })
    }

    if (!longitude ) {
      return res.json({
        response: "ERROR",
        msg: "Parameter long not exist"
      })
    }

    distance = 1000; ///1 Km
    ////Exists and is a number
    distancesArray = [1000, 3500, 5000]
    if (req.param("distance") &&  !isNaN(parseInt(req.param("distance")))) {
      distances = req.param("distance") ;
    }

    PlaceService.searchPosition(latitude, longitude, distance, function( PlaceResult){

      if (typeof  PlaceResult == "string" ) {
       return res.json({
          response: "ERROR",
          msg: PlaceResult
        })
      }
      else {
        if (!PlaceResult) {
          return res.json({
            response: "ERROR",
            msg: "Not exits formations near yours selected position"
          })
        }
      }
      ///If result is empty and distance is equal 1 km search for 3,5 km
      ///if empty this distance search for 5km if emtpy return "Not exist formations"
      distArraLength = distancesArray.length
      var iDist = 2
     PlaceService.searchPosition(latitude, longitude, distancesArray[iDist], function(PlacesResult ) {
        if (PlaceResult.length == 0){
          iDist++;
          PlaceService.searchPosition(latitude, longitude, distancesArray[iDist], function(PlacesResult ) {

            if (typeof  PlaceResult == "string" ) {
             return res.json({
                response: "ERROR",
                msg: PlaceResult
              })
            }
            else {
              if (PlaceResult.length == 0) {
                return res.json({
                  response: "ERROR",
                  msg: "Not exits formations near yours selected position"
                })
              }
              else {
                return res.json({
                  response: "OK",
                  result: PlaceResult
                })
              }
            }

          });
        }
       else
          return res.json({
            response:"OK",
            result:PlaceResult
          })
      });
    });
  }
};

