/**
 * PlaceController
 *
 * @description :: Server-side logic for managing places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  searchallplaces: function(req, res, next){
    Place.find().exec( function(err, resulFormation){
       return res.json(resulFormation)
    });
  },
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
  },


  searchByCities: function (req, res, next) {
    citiesArray = req.param("places");
    if (!citiesArray ) {
      return res.json({
        response: "ERROR",
        msg: "Parameter places not exist"
      })
    }

    if (citiesArray.length == 0) {
      return res.json({
        response: "ERROR",
        msg: "Not exist citi's name for search"
      })
    }

    query = {}
    query.city = {$in:citiesArray}
    /*query = {
     place : {$in:arrayData},
     price: {
     $gte:50
     },
     dates: {
     $elemMatch:{
     date: {
     $gte:new Date("2016-10-04"),
     $lte: new Date("2017-05-03")
     }
     }
     }

     }*/

    console.log("QUERY: " , query)
    Place.native(function(err, collection) {
      if (err) return res.serverError(err);
      //console.log("---")
      ////Transform all arrayData to new ObjectId [new ObjectID (arrayData[0])]
      // {"place":{"$all": [new ObjectID(arrayData[0])] },"price":{"$gte":50},"dates":{"$elemMatch":{"date":{"$gte":new Date("2016-10-04"),"$lte":new Date("2017-05-03")}}}}

      //console.log("******")
      // parameters.place = {$all:[new ObjectID(arrayData[0])]}
      collection.find(query).toArray(function (err, results) {

           console.log("Result name in system",results )
            if (err) return res.serverError(err);


             return res.json(results);
      })
    });
  }
};

