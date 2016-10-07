/**
 * PlaceController
 *
 * @description :: Server-side logic for managing places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  searchallplaces: function (req, res, next) {
    Place.find({}).exec(function (err, resulFormation) {
      //console.log("Result ",resulFormation )
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

    if (!latitude) {
      return res.json({
        response: "ERROR",
        msg: "Parameter lat not exist"
      })
    }

    if (!longitude) {
      return res.json({
        response: "ERROR",
        msg: "Parameter long not exist"
      })
    }

    distance = 1000; ///1 Km
    ////Exists and is a number
    distancesArray = [1000, 3500, 5000]
    if (req.param("distance") && !isNaN(parseInt(req.param("distance")))) {
      distances = req.param("distance");
    }

    console.log("Find information")
    PlaceService.searchPosition(latitude, longitude, distance, function (PlaceResult) {

      if (typeof  PlaceResult == "string") {
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
      PlaceService.searchPosition(latitude, longitude, distancesArray[iDist], function (PlacesResult) {
        if (PlaceResult.length == 0) {
          iDist++;
          PlaceService.searchPosition(latitude, longitude, distancesArray[iDist], function (PlacesResult) {

            if (typeof  PlaceResult == "string") {
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
            response: "OK",
            result: PlaceResult
          })
      });
    });
  },

  countbyposition: function (req, res, next) {

    latitude = req.param("lat");
    longitude = req.param("long")

    if (!latitude) {
      return res.json({
        response: "ERROR",
        msg: "Parameter lat not exist"
      })
    }

    if (!longitude) {
      return res.json({
        response: "ERROR",
        msg: "Parameter long not exist"
      })
    }

    distance = 1000; ///1 Km
    ////Exists and is a number
    distancesArray = [1000, 3500, 5000]
    if (req.param("distance") && !isNaN(parseInt(req.param("distance")))) {
      distances = req.param("distance");
    }

    console.log("Find information")
    PlaceService.searchPosition(latitude, longitude, distance, function (PlaceResult) {

      if (typeof  PlaceResult == "string") {
        return res.json({
          response: "ERROR",
          message: PlaceResult
        })
      }
      else {
        if (!PlaceResult) {
          return res.json({
            response: "ERROR",
            message: "Not exits formations near yours selected position"
          })
        }
      }
      ///If result is empty and distance is equal 1 km search for 3,5 km
      ///if empty this distance search for 5km if emtpy return "Not exist formations"
      distArraLength = distancesArray.length
      var iDist = 2
      PlaceService.searchPosition(latitude, longitude, distancesArray[iDist], function (PlacesResult) {
        if (PlaceResult.length == 0) {
          iDist++;
          PlaceService.searchPosition(latitude, longitude, distancesArray[iDist], function (PlacesResult) {

            if (typeof  PlaceResult == "string") {
              return res.json({
                response: "ERROR",
                message: PlaceResult
              })
            }
            else {
              if (PlaceResult.length == 0) {
                return res.json({
                  response: "ERROR",
                  message: "Not exits formations near yours selected position"
                })
              }
              else {
                return res.json({
                  response: "OK",
                  size: PlaceResult.length
                })
              }
            }

          });
        }
        else
          return res.json({
            response: "OK",
            size: PlaceResult.length
          })
      });
    });
  },


  searchByCities: function (req, res, next) {
    citiesArray = req.param("places");
    if (!citiesArray) {
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
    query.city = {$in: citiesArray}
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

   /// console.log("QUERY: ", query)
    Place.native(function (err, collection) {
      if (err) return res.serverError(err);
      //console.log("---")
      ////Transform all arrayData to new ObjectId [new ObjectID (arrayData[0])]
      // {"place":{"$all": [new ObjectID(arrayData[0])] },"price":{"$gte":50},"dates":{"$elemMatch":{"date":{"$gte":new Date("2016-10-04"),"$lte":new Date("2017-05-03")}}}}

      //console.log("******")
      // parameters.place = {$all:[new ObjectID(arrayData[0])]}
      collection.find(query).toArray(function (err, results) {

        console.log("Result name in system", results)
        if (err) return res.serverError(err);


        return res.json(results);
      })
    });
  },

  createPlace: function (req, res, next) {
    ///Parameter validation

    namePlace = "";
    namePlace = req.param("name");
   // console.log("PARAMETERS", req.param)
    if (namePlace == "" || typeof namePlace == "undefined")
      return res.json({response: "ERROR", message: "Place´s name undefined"})

    PlaceService.isExistPlaceName(namePlace, function (err, result) {
      if (result == true) {

        return res.json({response: "ERROR", message: "Exist Place with same name"})
      }


      adressPlace = "";
      adressPlace = req.param("address");
      if (adressPlace == "" || typeof adressPlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s address undefined"})

      citysPlace = "";
      citysPlace = req.param("address");
      if (citysPlace == "" || typeof citysPlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s city undefined"})


      zipcodePlace = "";
      zipcodePlace = req.param("zipcode");
      if (zipcodePlace == "" || typeof zipcodePlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s zipcode undefined"})

      if (isNaN(parseInt(zipcodePlace))) {
        return res.json({response: "ERROR", message: "Place´s zipcode is an invalid string number"})
      }

      latitudePlace = "";
      latitudePlace = req.param("latitude");
      if (latitudePlace == "" || typeof latitudePlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s latitude undefined"})
      console.log("La cadena convertida a float ", parseFloat(latitudePlace) , latitudePlace)
      if (isNaN(parseFloat(latitudePlace))) {
        return res.json({response: "ERROR", message: "Place´s latitude is invalid string number"})
      }
      longitudePlace = "";
      longitudePlace = req.param("longitude");
      if (longitudePlace == "" || typeof longitudePlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s longitude undefined"})

      if (isNaN(parseFloat(longitudePlace))) {
        return res.json({response: "ERROR", message: "Place´s longitude is invalid string number"})
      }

      PlaceService.isExistSameLocation(latitudePlace, longitudePlace, function (err, result) {
        if (result == true)
          return res.json({response: "ERROR", message: "Exist Place with same latitude and logitude"})

        agreementNumberPlace = "";
        agreementNumberPlace = req.param("agreementNumber");
        if (agreementNumberPlace == "" || typeof agreementNumberPlace == "undefined")
          return res.json({response: "ERROR", message: "Place´s agreementNumber undefined"})

        if (isNaN(parseInt(agreementNumberPlace))) {
          return res.json({response: "ERROR", message: "Place´s agreementNumber an invalid string number"})
        }

        agreementNamePlace = "";
        agreementNamePlace = req.param("agreementName");
        if (agreementNamePlace == "" || typeof agreementNamePlace == "undefined")
          return res.json({response: "ERROR", message: "Place´s agreementNames undefined"})

        isActivatedP = req.param("isActivated");
        if (isActivatedP == "" || typeof isActivatedP == "undefined")
          return res.json({response: "ERROR", message: "Place´s isActivated undefined"})

        ///create GJSON object


        createObject = {
          name: namePlace,
          address: adressPlace,
          latitude: latitudePlace,
          longitude: longitudePlace,
          city: citysPlace,
          zipcode: zipcodePlace,
          agreementNumber: agreementNumberPlace,
          agreementName: agreementNamePlace,
          isActivated: isActivatedP,
          location: {
            type: "Point",
            coordinates: [
              parseFloat(longitudePlace),
              parseFloat(latitudePlace)
            ]
          }

        }

        formationCenterExt = req.param("formationCenter");
        if (formationCenterExt == "" || typeof formationCenterExt == "undefined") {
          if (!isNaN(parseInt(formationCenterExt))) {
            createObject.formationCenter = formationCenterExt
          }
        }

        Place.create(createObject).exec(function (err, createObject) {
          if (err) {
            return res.json({response: "ERROR", message: "Can´t created place " + err.message})
          }

          return res.json({response: "OK", result: createObject})
        })

      });
    });

  },

  updatePlace: function (req, res, next) {
    ///Parameter validation

    idnamePlace = "";
    idnamePlace = req.param("id");
    if (idnamePlace == "" || typeof idnamePlace == "undefined")
      return res.json({response: "ERROR", message: "Place´s id undefined"})

    Place.findOne({id: idnamePlace}).exec(function (err, resultObject) {

      if (err) {
        return res.json({response: "ERROR", message: err.message})
      }

      if (typeof resultObject == "undefined") {
        return res.json({response: "ERROR", message: " Not exist place with name " + namePlace})
      }


      namePlace = "";
      namePlace = req.param("name");
      if (namePlace == "" || typeof namePlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s name undefined"})

      adressPlace = "";
      adressPlace = req.param("address");
      if (adressPlace == "" || typeof adressPlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s address undefined"})

      citysPlace = "";
      citysPlace = req.param("city");
      if (citysPlace == "" || typeof citysPlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s city undefined"})


      zipcodePlace = "";
      zipcodePlace = req.param("zipcode");
      if (zipcodePlace == "" || typeof zipcodePlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s zipcode undefined"})

      if (isNaN(parseInt(zipcodePlace))) {
        return res.json({response: "ERROR", message: "Place´s zipcodeis an invalid string number"})
      }

      latitudePlace = "";
      latitudePlace = req.param("latitude");
      if (latitudePlace == "" || typeof latitudePlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s latitude undefined"})

      if (isNaN(parseFloat(latitudePlace))) {
        return res.json({response: "ERROR", message: "Place´s latitude an invalid string number"})
      }
      longitudePlace = "";
      longitudePlace = req.param("latitude");
      if (longitudePlace == "" || typeof longitudePlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s longitude undefined"})

      if (isNaN(parseFloat(longitudePlace))) {
        return res.json({response: "ERROR", message: "Place´s longitude an invalid string number"})
      }

      agreementNumberPlace = "";
      agreementNumberPlace = req.param("agreementNumber");
      if (agreementNumberPlace == "" || typeof agreementNumberPlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s agreementNumber undefined"})

      if (isNaN(parseInt(agreementNumberPlace))) {
        return res.json({response: "ERROR", message: "Place´s agreementNumber an invalid string number"})
      }

      locationValue = {
        type: "Point",
        coordinates: [
          longitudePlace,
          latitudePlace
        ]
      }
      agreementNamePlace = "";
      agreementNamePlace = req.param("agreementName");
      if (agreementNamePlace == "" || typeof agreementNamePlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s agreementNames undefined"})


      updateObject = {
        name: namePlace,
        address: adressPlace,
        latitude: latitudePlace,
        longitude: longitudePlace,
        location: locationValue,
        city: citysPlace,
        zipcode: zipcodePlace,
        agreementNumber: agreementNumberPlace,
        agreementName: agreementNamePlace,
        location: {
          type: "Point",
          coordinates: [
            parseFloat(longitudePlace),
            parseFloat(latitudePlace)
          ]
        }

      }

      formationCenterExt = req.param("formationCenter");
      if (formationCenterExt == "" || typeof formationCenterExt == "undefined") {
        if (!isNaN(parseInt(formationCenterExt))) {
          updateObject.formationCenter = formationCenterExt
        }
      }

      activePlace = req.param("isActivated");
      if (agreementNamePlace != "" && typeof agreementNamePlace != "undefined" && typeof activatePlace == "boolean") {
        updateObject.isActivated = activePlace
      }

      Place.update({id: idnamePlace}, updateObject).exec(function (err, resultObject) {

        if (err) {
          return res.json({response: "ERROR", message: err.message})
        }

        if (typeof resultObject == "undefined" || resultObject.length == 0) {
          return res.json({response: "ERROR", message: "Not update places"})
        }

        objectResult = resultObject[0]
        return res.json({response: "OK", result: objectResult})
      })
    });

  },


  activatePlace: function (req, res, next) {

    activatePlace = false;
    activatePlace = req.param("activate");
    if (activatePlace != false && activatePlace != true) {
      return res.json({response: "ERROR", message: "Place´s activate value undefined"})
    }
    namePlace = "";
    namePlace = req.param("name");
    if (namePlace == "" || typeof namePlace == "undefined")
      return res.json({response: "ERROR", message: "Place´s name undefined"})
    Place.findOne({name: namePlace}).exec(function (err, resultObject) {

      if (err) {
        return res.json({response: "ERROR", message: err.message})
      }

      if (typeof resultObject == "undefined") {
        return res.json({response: "ERROR", message: " Not exist place with name " + namePlace})
      }

      Place.update({name: namePlace}, {isActivated: activatePlace}).exec(function (err, resultObjects) {

        if (err) {
          return res.json({response: "ERROR", message: err.message})
        }

        if (typeof resultObjects == "undefined" || resultObjects.length > 1) {
          return res.json({response: "ERROR", message: "Update more then one places"})
        }

        objectUpdate = resultObjects[0]
        return res.json({response: "OK", result: objectUpdate})
      })

    })


  },

  updateLocationPlace: function (req, res, next) {

    namePlace = "";
    namePlace = req.param("name");
    if (namePlace == "" || typeof namePlace == "undefined")
      return res.json({response: "ERROR", message: "Place´s name undefined"})

    Place.findOne({name: namePlace}).exec(function (err, resultObject) {

      if (err) {
        return res.json({response: "ERROR", message: err.message})
      }

      if (typeof resultObject == "undefined") {
        return res.json({response: "ERROR", message: "Not exist place with name " + namePlace})
      }

      latitudePlace = "";
      latitudePlace = req.param("latitude");
      if (latitudePlace == "" || typeof latitudePlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s latitude undefined"})

      if (isNaN(parseFloat(latitudePlace))) {
        return res.json({response: "ERROR", message: "Place´s latitude an invalid string number"})
      }
      longitudePlace = "";
      longitudePlace = req.param("longitude");
      if (longitudePlace == "" || typeof longitudePlace == "undefined")
        return res.json({response: "ERROR", message: "Place´s longitude undefined"})

      if (isNaN(parseFloat(longitudePlace))) {
        return res.json({response: "ERROR", message: "Place´s longitude an invalid string number"})
      }

      locationValue = {
        type: "Point",
        coordinates: [
          longitudePlace,
          latitudePlace
        ]
      }
      Place.update({name: namePlace}, {
        latitude: latitudePlace,
        longitude: longitudePlace,
        location: locationValue
      }).exec(function (err, resultObjects) {

        if (err) {
          return res.json({response: "ERROR", message: err.message})
        }

        if (typeof resultObjects == "undefined" || resultObjects.length > 1) {
          return res.json({response: "ERROR", message: "Update more then one places"})
        }

        objectUpdate = resultObjects[0]
        return res.json({response: "OK", result: objectUpdate})
      })

    });


  },

  updateFormationCenterPlace: function (req, res, next) {
    namePlace = "";
    namePlace = req.param("name");
    if (namePlace == "" || typeof namePlace == "undefined")
      return res.json({response: "ERROR", message: "Place´s name undefined"})

    Place.findOne({name: namePlace}).exec(function (err, resultObject) {

      if (err) {
        return res.json({response: "ERROR", message: err.message})
      }

      if (typeof resultObject == "undefined") {
        return res.json({response: "ERROR", message: " Not exist place with name " + namePlace})
      }

      formationCenterId = "";
      formationCenterId = req.param("formationcenter");
      if (formationCenterId == "" || typeof formationCenterId == "undefined")
        return res.json({response: "ERROR", message: "Place´s formationcenter id  undefined"})

      if (isNaN(parseInt(formationCenterId))) {
        return res.json({response: "ERROR", message: "Place´s zipcodeis an invalid string number"})
      }

      Place.update({name: namePlace}, {
        formationCenter: formationCenterId
      }).exec(function (err, resultObjects) {

        if (err) {
          return res.json({response: "ERROR", message: err.message})
        }

        if (typeof resultObjects == "undefined" || resultObjects.length > 1) {
          return res.json({response: "ERROR", message: "Update more then one places"})
        }

        objectUpdate = resultObjects[0]
        return res.json({response: "OK", result: objectUpdate})
      })
    });


  },

  deletePlace: function (req, res, next) {
    query = {};


    idnamePlace = req.param("id");
    if (idnamePlace == "" || typeof idnamePlace == "undefined")
      return res.json({response: "ERROR", message: "Place´s id undefined"})
    else
      query.id = idnamePlace


    namePlace = "";
    namePlace = req.param("name");
    if (namePlace != "" && typeof namePlace != "undefined")
      query.name = namePlace;

    if (!namePlace && !idnamePlace)
      return res.json({response: "ERROR", message: "Not exist data for delete Place"})

    console.log("DESTROY 1", query)
    deleteQuery = query
    Place.findOne(query).exec(function (err, resultObject) {

      if (err) {
        return res.json({response: "ERROR", message: err.message})
      }

      // console.log("query" , query )
      // console.log("query" , resultObject )
      if (typeof resultObject == "undefined") {
        return res.json({response: "ERROR", message: " Not exist place with name " + namePlace})
      }

      ///GEt formation array references
      formationArray = resultObject.formations

      console.log("DESTROY " ,deleteQuery)
      Place.destroy(deleteQuery).exec(function (err) {
        if (err) {
          return res.json({response: "ERROR", message: " Not delete place"})
        }

        ///Update isConfirmed to false in all formation asociated to these Place


        async.forEach(formationArray,
          // 2nd param is the function that each item is passed to
          function (iValue, callback) {

            Formation.update({id:iValue},{isConfirmed:false}).exec(function(err, result) {
              callback()
            })

          },
          // 3rd param is the function to call when everything's done
          function (err) {                // All tasks are done now
            // console.log("ANSWER ID", formationArray.length);

          })
            return res.json({response: "OK"})
      })
    });
  },

  countByCityMongoEx: function (req, res, next) {
    // body...

    cityname = req.param('city');

    // console.log("Call Services")
    //if (cityname === undefined) {
    //  return res.json({err: 'No city provided'});
    //}


    var page = 0;
    var len = 10;
    query = {};
    query.city = {contains: cityname};
    /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
    // console.log("Validation price", req.param('price') )

    if (req.param("name")) {
      query.name = {contains: req.param('name')};
    }

    if (req.param('agreementNumber') && !isNaN(parseInt(req.param('agreementNumber')))) {
      query.agreementNumber = req.param('agreementNumber');
    }

    if (req.param('agreementName')) {
      query.agreementName = {contains: req.param('agreementName')};
    }

    if (req.param("address")) {
      query.address = {contains: req.param('address')};
    }


    //query.limit = len
    //query.skip = page * len
    skip = page * len

    Place.count(query).exec(function (err, resulFormation) {

      if (err) {
        return res.json({res: "ERROR", message: err.message})
      }

      return res.json({res: "OK", size: resulFormation})

    });


  },

  countByZipCodeMongoEx: function (req, res, next) {
    // body...

    zipcodeData = req.param('zipcode');

    // console.log("Call Services")
    if (zipcodeData === undefined) {
      return res.json({err: 'No zipcode provided'});
    }


    var page = 0;
    var len = 10;
    query = {};
    query.zipcode = zipcodeData;
    /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
    // console.log("Validation price", req.param('price') )

    if (req.param("name")) {
      query.name = {contains: req.param('name')};
    }


    if (req.param('agreementNumber') && !isNaN(parseInt(req.param('agreementNumber')))) {
      query.agreementNumber = req.param('agreementNumber');
    }

    if (req.param('agreementName')) {
      query.agreementName = req.param('agreementName');
    }

    if (req.param("address")) {
      query.address = req.param('address');
    }


    //query.limit = len
    //query.skip = page * len
    skip = page * len


    // query.isFull = false
    ///---------------------------------------------------------------------------------

    Place.count(query).exec(function (err, resulFormation) {

      if (err) {
        return res.json({res: "ERROR", message: err.message})
      }

      return res.json({res: "OK", size: resulFormation})

    });

  },
///--------------------------------------------------------------------------------
  searchByCityMongoEx: function (req, res, next) {
    // body...

    cityname = req.param('city');

    // console.log("Call Services")
    if (cityname === undefined) {
      return res.json({err: 'No city provided'});
    }


    var page = 0;
    var len = 10;

    if (req.param('page') !== undefined) {
      if (!isNaN(parseInt(req.param('page')))) {
        page = Math.abs(parseInt(req.param('page')));
      }
      else {
        return res.json({err: 'The page parameter is an invalid string number'});
      }
    }

    //console.log("Call Services")
    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      }
      else {
        return res.json({err: 'The len parameter is an invalid string number'});
      }
    }

    skipv = page * len

    query = {};
    query.city = {contains: cityname};
    /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
    // console.log("Validation price", req.param('price') )

    if (req.param('agreementNumber') && !isNaN(parseInt(req.param('agreementNumber')))) {
      query.agreementNumber = req.param('agreementNumber');
    }

    if (req.param('agreementName')) {
      query.agreementName = {contains: req.param('agreementName')};
    }

    if (req.param("address")) {
      query.address = {contains: req.param('address')};
    }


    if (req.param("name")) {
      query.name = {contains: req.param('name')};
    }

   /// console.log("QUERY",query )
    Place.find(query).limit(len).skip(skipv).exec(function (err, resulFormation) {

      if (err) {
        return res.json({res: "ERROR", message: err.message})
      }

      return res.json(resulFormation)

    });


  },

  searchByZipcodeMongoEx: function (req, res, next) {
    // body...

    zipcodeData = req.param('zipcode');

    // console.log("Call Services")
    if (zipcodeData === undefined) {
      return res.json({response: "ERROR", message: 'No zipcode provided'});
    }


    query = {};
    query.zipcode = zipcodeData;


    /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
    // console.log("Validation price", req.param('price') )
    if (req.param("name")) {
      query.name = {contains: req.param('name')};
    }

    if (req.param('agreementNumber') && !isNaN(parseInt(req.param('agreementNumber')))) {
      query.agreementNumber = req.param('agreementNumber');
    }

    if (req.param('agreementName')) {
      query.agreementName = {contains: req.param('agreementName')};
    }

    if (req.param("address")) {
      query.address = {contains: req.param('address')};
    }

    var page = 0;
    var len = 10;

    if (req.param('page') !== undefined) {
      if (!isNaN(parseInt(req.param('page')))) {
        page = Math.abs(parseInt(req.param('page')));
      }
      else {
        return res.json({err: 'The page parameter is an invalid string number'});
      }
    }

    //console.log("Call Services")
    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      }
      else {
        return res.json({err: 'The len parameter is an invalid string number'});
      }
    }


    skipv = page * len

    Place.find(query).limit(len).skip(skipv).exec(function (err, resulFormation) {

      if (err) {
        return res.json({res: "ERROR", message: err.message})
      }

      return res.json(resulFormation)

    });
  },

///-----------------------------Formation center --------------------
  updatePlaceFormationCenter: function (req, res, next) {
    idnamePlace = "";
    idnamePlace = req.param("idplace");
    if (idnamePlace == "" || typeof idnamePlace == "undefined")
      return res.json({response: "ERROR", message: "Place´s id undefined"})

    formationCenterId = "";
    formationCenterId = req.param("formationcenter");
    if (formationCenterId == "" || typeof formationCenterId == "undefined")
      return res.json({response: "ERROR", message: "Place´s formationcenter name undefined"})


    FormationCenter.findOne({name: formationCenterId}).exec(function (err, resultObject) {

      if (err) {
        return res.json({response: "ERROR", message: err.message})
      }

      if (typeof resultObject == "undefined") {
        return res.json({response: "ERROR", message: "Not exist Formation Center"})
      }
      Place.update({id: idnamePlace}, {formationCenter: resultObject.id}).exec(function (err, resultData) {

        if (err) {
          return res.json({response: "ERROR", message: err.message})
        }

        return res.json({response: "OK", result: resultData})

      })

    })
  },

  countByCityMongoFormationCenterEx: function (req, res, next) {
    // body...
    formationCenterId = "";
    formationCenterId = req.param("formationcenter");
    if (formationCenterId == "" || typeof formationCenterId == "undefined")
      return res.json({response: "ERROR", message: "Place´s formationcenter name undefined"})


    FormationCenter.findOne({name: formationCenterId}).exec(function (err, resultObject) {

      if (err) {
        return res.json({response: "ERROR", message: err.message})
      }

      if (typeof resultObject == "undefined") {
        return res.json({response: "ERROR", message: "Not exist Formation Center"})
      }
      cityname = req.param('city');

      // console.log("Call Services")
      //if (cityname === undefined) {
      //  return res.json({err: 'No city provided'});
      //}


      var page = 0;
      var len = 10;
      query = {};
      query.city = {contains: cityname};
      /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
      // console.log("Validation price", req.param('price') )

      if (req.param("name")) {
        query.name = {contains: req.param('name')};
      }

      if (req.param('agreementNumber') && !isNaN(parseInt(req.param('agreementNumber')))) {
        query.agreementNumber = req.param('agreementNumber');
      }

      if (req.param('agreementName')) {
        query.agreementName = {contains: req.param('agreementName')};
      }

      if (req.param("address")) {
        query.address = {contains: req.param('address')};
      }


      //query.limit = len
      //query.skip = page * len
      skip = page * len

      Place.count(query).exec(function (err, resulFormation) {

        if (err) {
          return res.json({res: "ERROR", message: err.message})
        }

        return res.json({res: "OK", size: resulFormation})

      });

    });
  },

  countByZipCodeMongoFormationCenterEx: function (req, res, next) {
    // body...

    formationCenterId = "";
    formationCenterId = req.param("formationcenter");
    if (formationCenterId == "" || typeof formationCenterId == "undefined")
      return res.json({response: "ERROR", message: "Place´s formationcenter name undefined"})


    FormationCenter.findOne({name: formationCenterId}).exec(function (err, resultObject) {

      if (err) {
        return res.json({response: "ERROR", message: err.message})
      }

      if (typeof resultObject == "undefined") {
        return res.json({response: "ERROR", message: "Not exist Formation Center"})
      }
      zipcodeData = req.param('zipcode');

      // console.log("Call Services")
      if (zipcodeData === undefined) {
        return res.json({err: 'No zipcode provided'});
      }


      var page = 0;
      var len = 10;
      query = {};
      query.zipcode = zipcodeData;
      /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
      // console.log("Validation price", req.param('price') )

      if (req.param("name")) {
        query.name = {contains: req.param('name')};
      }

      if (req.param('agreementNumber') && !isNaN(parseInt(req.param('agreementNumber')))) {
        query.agreementNumber = req.param('agreementNumber');
      }

      if (req.param('agreementName')) {
        query.agreementName = req.param('agreementName');
      }

      if (req.param("address")) {
        query.address = req.param('address');
      }


      //query.limit = len
      //query.skip = page * len
      skip = page * len


      // query.isFull = false
      ///---------------------------------------------------------------------------------

      Place.count(query).exec(function (err, resulFormation) {

        if (err) {
          return res.json({res: "ERROR", message: err.message})
        }

        return res.json({res: "OK", size: resulFormation})

      });
    });
  },
///--------------------------------------------------------------------------------
  searchByCityMongoFormationCenterEx: function (req, res, next) {

    formationCenterId = "";
    formationCenterId = req.param("formationcenter");
    if (formationCenterId == "" || typeof formationCenterId == "undefined")
      return res.json({response: "ERROR", message: "Place´s formationcenter name undefined"})


    FormationCenter.findOne({name: formationCenterId}).exec(function (err, resultObject) {

      if (err) {
        return res.json({response: "ERROR", message: err.message})
      }

      if (typeof resultObject == "undefined") {
        return res.json({response: "ERROR", message: "Not exist Formation Center"})
      }

      cityname = req.param('city');

      // console.log("Call Services")
      if (cityname === undefined) {
        return res.json({err: 'No city provided'});
      }


      var page = 0;
      var len = 10;

      if (req.param('page') !== undefined) {
        if (!isNaN(parseInt(req.param('page')))) {
          page = Math.abs(parseInt(req.param('page')));
        }
        else {
          return res.json({err: 'The page parameter is an invalid string number'});
        }
      }

      //console.log("Call Services")
      if (req.param('len') !== undefined) {
        if (!isNaN(parseInt(req.param('len')))) {
          len = Math.abs(parseInt(req.param('len')));
        }
        else {
          return res.json({err: 'The len parameter is an invalid string number'});
        }
      }

      skipv = page * len

      query = {};
      query.city = {contains: cityname};
      /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
      // console.log("Validation price", req.param('price') )

      if (req.param("name")) {
        query.name = {contains: req.param('name')};
      }

      if (req.param('agreementNumber') && !isNaN(parseInt(req.param('agreementNumber')))) {
        query.agreementNumber = req.param('agreementNumber');
      }

      if (req.param('agreementName')) {
        query.agreementName = {contains: req.param('agreementName')};
      }

      if (req.param("address")) {
        query.address = {contains: req.param('address')};
      }

      Place.find(query).limit(len).skip(skipv).exec(function (err, resulFormation) {

        if (err) {
          return res.json({res: "ERROR", message: err.message})
        }

        return res.json(resulFormation)

      });
    })

  },

  searchByZipcodeMongoFormationCenterEx: function (req, res, next) {
    // body...

    formationCenterId = "";
    formationCenterId = req.param("formationcenter");
    if (formationCenterId == "" || typeof formationCenterId == "undefined")
      return res.json({response: "ERROR", message: "Place´s formationcenter name undefined"})


    FormationCenter.findOne({name: formationCenterId}).exec(function (err, resultObject) {

      zipcodeData = req.param('zipcode');

      // console.log("Call Services")
      if (zipcodeData === undefined) {
        return res.json({response: "ERROR", message: 'No zipcode provided'});
      }


      query = {};
      query.zipcode = zipcodeData;


      /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
      // console.log("Validation price", req.param('price') )

      if (req.param("name")) {
        query.name = {contains: req.param('name')};
      }

      if (req.param('agreementNumber') && !isNaN(parseInt(req.param('agreementNumber')))) {
        query.agreementNumber = req.param('agreementNumber');
      }

      if (req.param('agreementName')) {
        query.agreementName = {contains: req.param('agreementName')};
      }

      if (req.param("address")) {
        query.address = {contains: req.param('address')};
      }

      var page = 0;
      var len = 10;

      if (req.param('page') !== undefined) {
        if (!isNaN(parseInt(req.param('page')))) {
          page = Math.abs(parseInt(req.param('page')));
        }
        else {
          return res.json({err: 'The page parameter is an invalid string number'});
        }
      }

      //console.log("Call Services")
      if (req.param('len') !== undefined) {
        if (!isNaN(parseInt(req.param('len')))) {
          len = Math.abs(parseInt(req.param('len')));
        }
        else {
          return res.json({err: 'The len parameter is an invalid string number'});
        }
      }


      skipv = page * len

      Place.find(query).limit(len).skip(skipv).exec(function (err, resulFormation) {

        if (err) {
          return res.json({res: "ERROR", message: err.message})
        }

        return res.json(resulFormation)

      });
    })
  },
///---------------------- Pitterson Search --------------------------------
  searchByFormationCenter: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: "Formation Center Name is required."});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred searching the Formation Center."});
        }

        if (!FC) {
          return res.json({status: "error", info: "No Formation Center with that name."});
        }

        Place.find({
            formationCenter: FC.id
          })
          .exec(function (err, PlacesFounded) {
            if (err) {
              return res.json({status: "error", info: "An error has ocurred searching Places."});
            }

            return res.json({status: "ok", data: PlacesFounded});

          });
      });

  }
};

