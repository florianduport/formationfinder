/**
 * FormationController
 *
 * @description :: Search all formation which it´s name contain name parameter
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  searchByID: function (req, res, next) {

    if (req.param('id') === undefined) {
      return res.json({status: "error", info: "Formation id is required."});
    }

    Formation.findOne({id: req.param('id')})
      .populate('place')
      .populate('animators')
      .exec(function (err, FormationFounded) {
        if (err) {
          return res.json({status: "error", info: "Error searching Formation."});
        }

        if (!FormationFounded) {
          return res.json({status: "error", info: "Formation not found."});
        }

        return res.json({status: "ok", data: FormationFounded});
      });
  },

  create: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: "Formation Center Name is required."});
    }

    iFormation = req.param('formation');

    if (iFormation === undefined || typeof(iFormation) !== "object") {
      return res.json({status: "error", info: "Formation object is required."});
    }

    // ******************************************************************** //
    // ** Here we need to validate the formation object composition.     ** //
    // ******************************************************************** //

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred searching the Formation Center."});
        }

        if (!FC) {
          return res.json({status: "error", info: "No Formation Center with that name."});
        }

        iFormation.formationCenter = FC.id;

        Formation.create(iFormation)
          .exec(function (err, cFormation) {
            if (err || !cFormation) {
              return res.json({status: "error", info: "Error creating Formation."});
            }

            return res.json({status: "ok", info: "Formation created.", data: cFormation});

          });

      });
  },

  searchbynameTMP: function (req, res, next) {
    var paginationlimit = 10;

    var nameFormation = reg.param("name");

    if (!name || name == "")
      return next("Not defined Formation´s name")

    var page = reg.param("page")

    ///Validate is number
    if (page)
      page = page - 1

    if (page == 0)
      page = 1

    page = page * paginationlimit;


    Formation.find({name: {'contains': nameFormation}}).skip(page).limit(paginationlimit).populate().exec(function (err, Formations) {
      return res.json(Formations)

    });

  },

  searchByFormationCenter: function (req, res) {
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

        Formation.find({formationCenter: FC.id})
          .populate('place')
          .sort('updatedAt DESC')
          //probar .sort(updatedAt: 'DESC')
          .exec(function (err, formationsFounded) {
            if (err) {
              return res.json({status: "error", info: "An error has ocurred searching Formations."});
            }

            return res.json({status: "ok", data: formationsFounded});
          });

      });
  },

  deleteByID: function (req, res) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: "ID parameter is required."});
    }

    Formation.destroy({id: req.param('id')})
      .exec(function (err) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred deleting Formation."});
        }
        return res.json({status: "ok", info: "Formation deleted."});
      });
  },

  searchbyname: function (req, res, next) {

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

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      }
      else {
        return res.json({err: 'The len parameter is an invalid string number'});
      }
    }


    var paginationlimit = 10;

    var nameFormation = req.param("name");

    if (!nameFormation || nameFormation == "")
      return next("Not defined Formation´s name")

    Formation.find({
        isFull: false,
        skip: page * len,
        limit: len
      })
      .populate('formationCenter', {
        where: {
          name: {'contains': nameFormation}
        }
      })
      .exec(function formationFounded(err, Formations) {
        if (err) {
          return res.json({
            err: "ERROR",
            message: "Not result about query"
          });
        }
        // body
        if (Formations.length == 0)
          return res.json({
            err: "ERROR",
            message: "Not result about query"
          });
        formationTemp = Formations[0]
        if (formationTemp.formationCenter == "undefined")
          return res.json({
            err: "ERROR",
            message: "Not result about query"
          });
        formationsResponse = Formations;

        return res.json(Formations);
      });

  },

  searchByZipcode: function (req, res, next) {
    // body...


    zc = req.param('zipcode');

    if (zc === undefined) {
      return res.json({err: 'No zipcode provided'});
    }


    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);

    if (!_.isDate(initialDate) || !_.isDate(finalDate)) {
      return res.json({err: 'Invalid date format for initialDate or finalDate.'});
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
    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    query = {};
    queryPlace = {};

    // console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
    // console.log("Validation price", req.param('price') )

    if (req.param('price') && !isNaN(parseInt(req.param('price')))) {
      query.price = {'>=': req.param('price')};
      //console.log("Create price restriction")
    }
    query.limit = len
    query.skip = page * len
    query.isFull = false
    queryPlace.zipcode = zc

    // console.log("Query" ,queryPlace )
    // console.log("Query" ,query )
    Formation.find(query)
      .populate('place', queryPlace)
      .populate('formationCenter')
      .exec(function placesFouded(err, placesFormations) {
        // body...
        formationsResponse = [];

        placesFormations.forEach(function (iPlace, index) {
          if (typeof iPlace.place != "undefined") {
            iPlace.formationCenter.city = iPlace.place.city;
            formationsResponse.push({

              formation: iPlace
            });
          }
        });

        return res.json(formationsResponse);
      });

    /*Place.find({
     zipcode: zc,
     skip: page * len,
     limit: len})
     .populate('formations')
     .populate('formationCenter')
     .exec(function placesFouded(err, places) {
     // body...

     formationsResponse = [];

     places.forEach(function (place, index) {
     // body...

     place.formations.forEach(function (actualFormation, index) {
     // body...
     formationsResponse.push({
     formationCenterName: place.formationCenter.name,
     formation: actualFormation
     });
     });
     });

     return res.json(formationsResponse);
     });*/
  },

  countByZipcode: function (req, res, next) {

    // console.log("Call Services")
    if (req.param('zipcode')) {
      zc = req.param('zipcode');
    }

    if (zc === undefined) {
      return res.json({err: 'No zipcode provided'});
    }
    queryPlace = {}


    if (zc == "") {

      Formation.count().exec(function countFaq(error, found) {
        if (error) {

          return res.json({"res": error});
        }

        //console.log('There are ' + found + ' Faq');

        return res.json({"res": "OK", "size": found})


        // There are 1 users called 'Flynn'
        // Don't forget to handle your errors
      });
    } else {
      queryPlace.zipcode = zc

      Formation.find().populate('place', queryPlace).exec(function countFaq(error, placesFormations) {
        if (error) {
          return res.json({"res": error});
        }

        //console.log('There are ' + found + ' Faq');
        var counterFormation = 0
        placesFormations.forEach(function (iPlace, index) {
          if (typeof iPlace.place != "undefined") {
            counterFormation++
          }
        });
        return res.json({"res": "OK", "size": counterFormation});


        // There are 1 users called 'Flynn'
        // Don't forget to handle your errors
      });
    }
  },

  searchByCity: function (req, res, next) {
    // body...

    cityname = req.param('city');

    // console.log("Call Services")
    if (cityname === undefined) {
      return res.json({err: 'No city provided'});
    }


    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);

    if (!_.isDate(initialDate) || !_.isDate(finalDate)) {
      return res.json({err: 'Invalid date format for initialDate or finalDate.'});
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
    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    query = {};
    queryPlace = {};

    /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
    // console.log("Validation price", req.param('price') )

    if (req.param('price') && !isNaN(parseInt(req.param('price')))) {
      query.price = {'>=': req.param('price')};
      //console.log("Create price restriction")
    }
    query.limit = len
    query.skip = page * len
    query.isFull = false
    if (cityname != "")
      queryPlace.city = {'contains': cityname}

    // console.log("Query" ,queryPlace )
    // console.log("Query" ,query )
    Formation.find(query)
      .populate('place', queryPlace)
      .populate('formationCenter')
      .exec(function placesFouded(err, placesFormations) {
        // body...
        formationsResponse = [];

        placesFormations.forEach(function (iPlace, index) {
          if (typeof iPlace.place != "undefined") {
            iPlace.formationCenter.city = iPlace.place.city;
            formationsResponse.push({
              formation: iPlace
            });
          }
        });

        return res.json(formationsResponse);
      });
  },

  countByCity: function (req, res, next) {
    cityname = "";

    // console.log("Call Services")
    if (req.param('city')) {
      cityname = req.param('city');
    }
    queryPlace = {}
    if (cityname == "") {

      Formation.count().exec(function countFaq(error, found) {
        if (error) {

          return res.json({"res": error});
        }

        //console.log('There are ' + found + ' Faq');

        return res.json({"res": "OK", "size": found})


        // There are 1 users called 'Flynn'
        // Don't forget to handle your errors
      });
    } else {
      queryPlace.city = {'contains': cityname}

      Formation.find().populate('place', queryPlace).exec(function countFaq(error, placesFormations) {
        if (error) {
          return res.json({"res": error});
        }

        //console.log('There are ' + found + ' Faq');
        var counterFormation = 0
        placesFormations.forEach(function (iPlace, index) {
          if (typeof iPlace.place != "undefined") {
            counterFormation++
          }
        });
        return res.json({"res": "OK", "size": counterFormation});


        // There are 1 users called 'Flynn'
        // Don't forget to handle your errors
      });
    }

  },

  bookFormation: function (req, res, next) {
    // body...

    //console.log(req.allParams());

    //return res.json(req.allParams());

    //Get the formation ID for book.
    formationID = req.param('id');

    //Check the formation ID
    if (formationID === undefined) {
      return res.json({err: 'You must provide an ID for a formation'});
    }

    //Get the customer data, an object with this estructure:
    // customerData: {
    //  item 1,
    //  ...
    //  item n,
    // 	driverLicence: {  	},
    //  item m
    // }

    //Get the customer data
    customerData = req.param('customerData');

    //Validate de customer data
    if (customerData === undefined || !CustomerService.isValidCustomerData(customerData)) {
      return res.json({err: 'You must provide a valid customerData object.'});
    }

    //Search the formation.
    Formation.findOne(formationID).populate("place").populate("customers")
      .exec(function (err, formationFounded) {
        // body...

        //console.log("Estoy en formation find one");

        if (err) {
          return res.json(err);
        }

        //If the formation does'nt exist or is full send an error.
        if (formationFounded === undefined) {
          return res.json({err: 'No formation match that id: ' + formationID.toString()});
        }

        if (formationFounded.isFull == true) {
          return res.json({err: 'The formation is full.'});
        }

        //if there is a formation, verify if the customer exist or is a new one.
        Customer.findOne({
          "driverLicence.number": customerData.driverLicence.number
        }).exec(function (err, customerFouded) {
          // body...

          //console.log("Estoy en customer find one");

          if (err) {
            console.log("ERRROR data problem" , err)
            return res.json(err);
          }

          //if the customer does'nt exist, create and register one.
          if (customerFouded === undefined) {

            // console.log("Customer no escontrado");

            ////Validate is Full
            ////If Formation.maxPeople if < current Formation´s customer + 1 then
            ///formation is Full and update its
            ///not insert Customer

            customerData.formationCenter = formationFounded.formationCenter
            customerData.formation = formationFounded.id
            Customer.create(customerData)
              .exec(function (err, customerCreated) {
                // body...

               // console.log("Creando Customer");

                if (err) {
                  console.log("ERRROR data ", err)
                  return res.json(err);
                }

                if (customerCreated === undefined) {
                  return res.json({err: 'An error has ocurred when creating the customer'});
                }


                isPaid = false
                if (req.param('paid') !== undefined) {
                  isPaid = req.param('paid')
                  if (isPaid != true ||isPaid != true )
                    isPaid = false
                }
                /////Create Customer Bill

                FormationService.createCustomerBill(customerCreated, formationFounded, isPaid, function createCustomer(err, result) {
                //  console.log("Create Stimulus Bill")
                  if (err) {
                    console.log("ERROR in created Customer Bill", err.message)
                  }

                 // console.log("Create Customer Bill and send payment stimulus")

                  ////Create Customer Alert

                  FormationService.costumerBooked(formationFounded, function (err, resultV) {
                    //console.log("Create booked Alert")
                    if (err) {
                      console.log("ERROR in created Customer booked Alert", err.message)
                    }

                    formationFounded.customers.push(customerCreated.id);


                    ///Send mail to new Customer
                   // console.log("SEND MAILLL")
                   CustomerService.sendMailBooked(customerCreated, function(err, resultData){
                     if (err)
                      console.log("Error in send Mail to Customer", err)
                     else if (resultData){
                       console.log("Sended mail to new Customer", resultData)
                     }


                     if (formationFounded.customers.length >= formationFounded.maxPeople) {
                       formationFounded.isFull = true;
                     }

                     Formation.update({id: formationFounded.id},  formationFounded).exec(function (err, resultObject) {

                       FormationService.isFormationFull(formationFounded, function (err, result) {
                         //
                         //  formationFounded.save()

                         console.log("Update Formation")
                         return res.json({ok: 'book proces complit.'});
                       })
                     })
                   })

                  })
                })
              });

          }
          //else, the customer exist. Search if there is a formation with that customer registered.
          else {

            //console.log("Customer escontrado");

            Formation.findOne(customerFouded.formation)
              .exec(function (err, formFounded) {
                // body...
                if (err) {
                  return res.json(err);
                }

                if (formFounded === undefined) {
                  formationFounded.customers.add(customerFouded.id);

                  console.log("No existe formacion con el customer escontrado");

                  if (formationFounded.customers.length == formationFounded.maxPeople)
                    formationFounded.isFull = true;

                  formationFounded.save();

                  return res.json({ok: 'book proces complit.'});
                }
                else {
                  return res.json({err: 'The customer is register in other formation'});
                }
              });
          }

        });
      });
  },

//----------------------------------------------------------------------------------------------------------------------

  countByCityMongoEx: function (req, res, next) {
    // body...

    cityname = req.param('city');

    // console.log("Call Services")
    if (cityname === undefined) {
      return res.json({err: 'No city provided'});
    }


    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    if (typeof initialDate != "undefined")
      initialDate = new Date(initialDate);

    if (typeof finalDate != "undefined")
      finalDate = new Date(finalDate);

    if (initialDate && !_.isDate(initialDate)) {
      return res.json({err: 'Invalid date format for initialDate.'});
    }

    if (finalDate && !_.isDate(finalDate)) {
      return res.json({err: 'Invalid date format for endDate.'});
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


    query = {};
    queryPlace = {};

    /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
    // console.log("Validation price", req.param('price') )

    if (req.param('price') && !isNaN(parseInt(req.param('price')))) {
      query.price = {$gte: req.param('price')};
      //console.log("Create price restriction")
    }
    //query.limit = len
    //query.skip = page * len
    skip = page * len

    //console.log("INITIAL DATE", initialDate)
    if (initialDate) {
      if (!query.dates) {
        query.dates = {}
        query.dates.$elemMatch = {}
        query.dates.$elemMatch.date = {}
      }

      query.dates.$elemMatch.date.$gte = new Date(req.param('initialDate'))
    }


    //console.log("FINAL DATE", finalDate)
    if (finalDate) {
      if (!query.dates) {
        query.dates = {}
        query.dates.$elemMatch = {}
        query.dates.$elemMatch.date = {}
      }
      query.dates.$elemMatch.date.$lte = new Date(req.param('finalDate'))
    }

    query.isFull = false
    ///---------------------------------------------------------------------------------


    var ObjectID = require('mongodb').ObjectID
    Place.find({city: {contains: cityname}}).exec(function (err, resulFormation) {

      arrayData = []
      var promise;
      promise = resulFormation.reduce(function (prev, iPlace) {
        return prev.then(function () {
          object = iPlace.id
          arrayData.push(new ObjectID(iPlace.id));
        });
      }, Promise.resolve());

      promise.then(function (array) {
        //if (initialDate || finalDate)
        query.place = {$in: arrayData}
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

        /// console.log("QUERY: " , query)
        Formation.native(function (err, collection) {
          if (err) return res.serverError(err);
          //console.log("---")
          ////Transform all arrayData to new ObjectId [new ObjectID (arrayData[0])]
          // {"place":{"$all": [new ObjectID(arrayData[0])] },"price":{"$gte":50},"dates":{"$elemMatch":{"date":{"$gte":new Date("2016-10-04"),"$lte":new Date("2017-05-03")}}}}

          //console.log("******")
          // parameters.place = {$all:[new ObjectID(arrayData[0])]}
          collection.find(query).toArray(function (err, results) {
            // console.log("sfdsdfsss " + results);
            if (err) return res.serverError(err);
            ////Dados los id buscar un place un el nombre "5797e539e1e9812814a35520"
            //console.log("DATA", results)
            ///Make populate for all id formation to search place and formationcenter data
            return res.json({res: "OK", size: results.length})
          });
        });
      });
    });


    ////--------------------------------------------------------------------------------


    // console.log("Query" ,queryPlace )
    // console.log("Query" ,query )
    /* Formation.find(query)
     .populate('place', queryPlace)
     .populate('formationCenter')
     .exec(function placesFouded(err, placesFormations) {
     // body...
     formationsResponse = [];

     placesFormations.forEach(function (iPlace, index) {
     if ( typeof iPlace.place != "undefined" ) {
     iPlace.formationCenter.city = iPlace.place.city;
     formationsResponse.push({
     formation: iPlace
     });
     }
     });

     return res.json(formationsResponse);
     });*/
  },

  countByZipCodeMongoEx: function (req, res, next) {
    // body...

    zipcodeData = req.param('zipcode');

    // console.log("Call Services")
    if (zipcodeData === undefined) {
      return res.json({err: 'No zipcode provided'});
    }


    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    if (typeof initialDate != "undefined")
      initialDate = new Date(initialDate);

    if (typeof finalDate != "undefined")
      finalDate = new Date(finalDate);

    if (initialDate && !_.isDate(initialDate)) {
      return res.json({err: 'Invalid date format for initialDate.'});
    }

    if (finalDate && !_.isDate(finalDate)) {
      return res.json({err: 'Invalid date format for endDate.'});
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


    query = {};
    queryPlace = {};

    /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
    // console.log("Validation price", req.param('price') )

    if (req.param('price') && !isNaN(parseInt(req.param('price')))) {
      query.price = {$gte: req.param('price')};
      //console.log("Create price restriction")
    }
    //query.limit = len
    //query.skip = page * len
    skip = page * len

    //console.log("INITIAL DATE", initialDate)
    if (initialDate) {
      if (!query.dates) {
        query.dates = {}
        query.dates.$elemMatch = {}
        query.dates.$elemMatch.date = {}
      }

      query.dates.$elemMatch.date.$gte = new Date(req.param('initialDate'))
    }


    //console.log("FINAL DATE", finalDate)
    if (finalDate) {
      if (!query.dates) {
        query.dates = {}
        query.dates.$elemMatch = {}
        query.dates.$elemMatch.date = {}
      }
      query.dates.$elemMatch.date.$lte = new Date(req.param('finalDate'))
    }

     query.isFull = false
    ///---------------------------------------------------------------------------------


    var ObjectID = require('mongodb').ObjectID
    Place.find({zipcode: zipcodeData}).exec(function (err, resulFormation) {

      arrayData = []
      var promise;
      promise = resulFormation.reduce(function (prev, iPlace) {
        return prev.then(function () {
          object = iPlace.id
          arrayData.push(new ObjectID(iPlace.id));
        });
      }, Promise.resolve());

      promise.then(function (array) {
        // if (initialDate || finalDate)
        query.place = {$in: arrayData}
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

        /// console.log("QUERY: " , query)
        Formation.native(function (err, collection) {
          if (err) return res.serverError(err);
          //console.log("---")
          ////Transform all arrayData to new ObjectId [new ObjectID (arrayData[0])]
          // {"place":{"$all": [new ObjectID(arrayData[0])] },"price":{"$gte":50},"dates":{"$elemMatch":{"date":{"$gte":new Date("2016-10-04"),"$lte":new Date("2017-05-03")}}}}

          //console.log("******")
          // parameters.place = {$all:[new ObjectID(arrayData[0])]}
          collection.find(query).toArray(function (err, results) {
            // console.log("sfdsdfsss " + results);
            if (err) return res.serverError(err);
            ////Dados los id buscar un place un el nombre "5797e539e1e9812814a35520"
            //console.log("DATA", results)
            ///Make populate for all id formation to search place and formationcenter data
            return res.json({res: "OK", size: results.length})
          });
        });
      });
    });


    ////--------------------------------------------------------------------------------


    // console.log("Query" ,queryPlace )
    // console.log("Query" ,query )
    /* Formation.find(query)
     .populate('place', queryPlace)
     .populate('formationCenter')
     .exec(function placesFouded(err, placesFormations) {
     // body...
     formationsResponse = [];

     placesFormations.forEach(function (iPlace, index) {
     if ( typeof iPlace.place != "undefined" ) {
     iPlace.formationCenter.city = iPlace.place.city;
     formationsResponse.push({
     formation: iPlace
     });
     }
     });

     return res.json(formationsResponse);
     });*/
  },
///--------------------------------------------------------------------------------
  searchByCityMongoEx: function (req, res, next) {
    // body...

    cityname = req.param('city');

    // console.log("Call Services")
    if (cityname === undefined) {
      return res.json({err: 'No city provided'});
    }


    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');


    if (typeof initialDate != "undefined")
      initialDate = new Date(initialDate);

    if (typeof finalDate != "undefined")
      finalDate = new Date(finalDate);

    //console.log("INITIAL:", initialDate)
    //console.log("FINAL:", finalDate)


    if (initialDate && !_.isDate(initialDate)) {

      return res.json({err: 'Invalid date format for initialDate'});

    }

    if (finalDate && !_.isDate(finalDate)) {
      return res.json({err: 'Invalid date format for finalDate.'});
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


    query = {};
    queryPlace = {};

    /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
    // console.log("Validation price", req.param('price') )

    if (req.param('price') && !isNaN(parseInt(req.param('price')))) {
      query.price = {$gte: req.param('price')};
      //console.log("Create price restriction")
    }
    //query.limit = len
    //query.skip = page * len
    skip = page * len

    //console.log("INITIAL DATE", initialDate)
    if (initialDate) {
      if (!query.dates) {
        query.dates = {}
        query.dates.$elemMatch = {}
        query.dates.$elemMatch.date = {}
      }

      query.dates.$elemMatch.date.$gte = new Date(req.param('initialDate'))
    }


    //console.log("FINAL DATE", finalDate)
    if (finalDate) {
      if (!query.dates) {
        query.dates = {}
        query.dates.$elemMatch = {}
        query.dates.$elemMatch.date = {}
      }
      query.dates.$elemMatch.date.$lte = new Date(req.param('finalDate'))
    }

    query.isFull = false
    ///---------------------------------------------------------------------------------
    // console.log("City name search: ", cityname)

    var ObjectID = require('mongodb').ObjectID
    queryPlace = {}
    if (cityname == "")
      queryPlace.city = {contains: cityname}

    Place.find(queryPlace).exec(function (err, resulFormation) {

      arrayData = []
      var promise;
      promise = resulFormation.reduce(function (prev, iPlace) {
        return prev.then(function () {
          object = iPlace.id
          // console.log("Data", iPlace)
          arrayData.push(new ObjectID(iPlace.id));
        });
      }, Promise.resolve());

      promise.then(function (array) {
        //if (initialDate || finalDate)
        query.place = {$in: arrayData}
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

        /// console.log("QUERY: " , query)
        Formation.native(function (err, collection) {
          if (err) return res.serverError(err);
          //console.log("---")
          ////Transform all arrayData to new ObjectId [new ObjectID (arrayData[0])]
          // {"place":{"$all": [new ObjectID(arrayData[0])] },"price":{"$gte":50},"dates":{"$elemMatch":{"date":{"$gte":new Date("2016-10-04"),"$lte":new Date("2017-05-03")}}}}

          //console.log("******")
          // parameters.place = {$all:[new ObjectID(arrayData[0])]}
          collection.find(query).limit(len).skip(skip).toArray(function (err, results) {
            // console.log("sfdsdfsss " + results);
            if (err) return res.serverError(err);
            ////Dados los id buscar un place un el nombre "5797e539e1e9812814a35520"
            //console.log("DATA", results)
            ///Make populate for all id formation to search place and formationcenter data
            formationArray = []
            async = require("async");
            async.forEach(results,
              // 2nd param is the function that each item is passed to
              function (iFormation, callback) {
                // Call an asynchronous function, often a save() to DB


                //console.log(iFormation)
                //console.log(",,,,,,,,,,,")
                idStr = "" + iFormation._id
                //console.log(idStr)
                Formation.find({id: idStr})
                  .populate('place')
                  .populate('formationCenter')
                  .populate('customers')
                  .exec(function placesFouded(err, placesFormation) {
                    // body...
                    formationsResponse = [];


                    formationArray.push(placesFormation[0]);
                    callback();
                  });

              },
              // 3rd param is the function to call when everything's done
              function (err) {                // All tasks are done now
                // console.log("ANSWER ID", formationArray.length);
                return res.json(formationArray)
              }
            );
          });
        });
      });
    });


    ////--------------------------------------------------------------------------------


    // console.log("Query" ,queryPlace )
    // console.log("Query" ,query )
    /* Formation.find(query)
     .populate('place', queryPlace)
     .populate('formationCenter')
     .exec(function placesFouded(err, placesFormations) {
     // body...
     formationsResponse = [];

     placesFormations.forEach(function (iPlace, index) {
     if ( typeof iPlace.place != "undefined" ) {
     iPlace.formationCenter.city = iPlace.place.city;
     formationsResponse.push({
     formation: iPlace
     });
     }
     });

     return res.json(formationsResponse);
     });*/
  },

  searchByZipcodeMongoEx: function (req, res, next) {
    // body...

    zipcodeData = req.param('zipcode');

    // console.log("Call Services")
    if (zipcodeData === undefined) {
      return res.json({err: 'No zipcode provided'});
    }


    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    if (typeof initialDate != "undefined")
      initialDate = new Date(initialDate);

    if (typeof finalDate != "undefined")
      finalDate = new Date(finalDate);


    //console.log("INITIAL:", initialDate)
    // console.log("FINAL:", finalDate)


    if (initialDate && !_.isDate(initialDate)) {

      return res.json({err: 'Invalid date format for initialDate'});

    }

    if (finalDate && !_.isDate(finalDate)) {
      return res.json({err: 'Invalid date format for finalDate.'});
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


    query = {};
    queryPlace = {};

    /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
    // console.log("Validation price", req.param('price') )

    if (req.param('price') && !isNaN(parseInt(req.param('price')))) {
      query.price = {$gte: req.param('price')};
      //console.log("Create price restriction")
    }
    //query.limit = len
    //query.skip = page * len
    skip = page * len

    //console.log("INITIAL DATE", initialDate)
    if (initialDate) {
      if (!query.dates) {
        query.dates = {}
        query.dates.$elemMatch = {}
        query.dates.$elemMatch.date = {}
      }

      query.dates.$elemMatch.date.$gte = new Date(req.param('initialDate'))
    }


    //console.log("FINAL DATE", finalDate)
    if (finalDate) {
      if (!query.dates) {
        query.dates = {}
        query.dates.$elemMatch = {}
        query.dates.$elemMatch.date = {}
      }
      query.dates.$elemMatch.date.$lte = new Date(req.param('finalDate'))
    }

    query.isFull = false
    ///---------------------------------------------------------------------------------

    // console.log("Zipcode place query ",zipcodeData )
    var ObjectID = require('mongodb').ObjectID
    Place.find({zipcode: zipcodeData}).exec(function (err, resulFormation) {

      arrayData = []
      var promise;
      promise = resulFormation.reduce(function (prev, iPlace) {
        return prev.then(function () {
          object = iPlace.id
          // console.log("DATA" ,iPlace )
          arrayData.push(new ObjectID(iPlace.id));
        });
      }, Promise.resolve());

      promise.then(function (array) {

        // if (initialDate || finalDate)
        query.place = {$in: arrayData}
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

        ///  console.log("QUERY: " , query)
        Formation.native(function (err, collection) {
          if (err) return res.serverError(err);
          //console.log("---")
          ////Transform all arrayData to new ObjectId [new ObjectID (arrayData[0])]
          // {"place":{"$all": [new ObjectID(arrayData[0])] },"price":{"$gte":50},"dates":{"$elemMatch":{"date":{"$gte":new Date("2016-10-04"),"$lte":new Date("2017-05-03")}}}}

          //console.log("******")
          // parameters.place = {$all:[new ObjectID(arrayData[0])]}
          collection.find(query).limit(len).skip(skip).toArray(function (err, results) {
            // console.log("sfdsdfsss " + results);
            if (err) return res.serverError(err);
            ////Dados los id buscar un place un el nombre "5797e539e1e9812814a35520"
            //console.log("DATA", results)
            ///Make populate for all id formation to search place and formationcenter data
            formationArray = []
            async = require("async");
            async.forEach(results,
              // 2nd param is the function that each item is passed to
              function (iFormation, callback) {
                // Call an asynchronous function, often a save() to DB

                idStr = "" + iFormation._id
                // console.log(idStr)
                Formation.find({id: idStr})
                  .populate('place')
                  .populate('formationCenter')
                  .populate('customers')
                  .exec(function placesFouded(err, placesFormation) {
                    // body...
                    if (err)
                      console.log("////", err)
                    formationsResponse = [];
                    //console.log("ANSWER", placesFormation);


                    /*                promiseResult = placesFormations.reduce(function (prev, iFormation) {
                     return prev.then(function () {
                     if (typeof iFormation.place != "undefined") {
                     iFormation.formationCenter.city = iFormation.place.city;
                     formationsResponse.push({
                     formation: iFormation
                     });
                     }
                     });
                     }, Promise.resolve());

                     promiseResult.then(function(array) {
                     console.log("<--->", formationsResponse)
                     return res.json(formationsResponse)

                     });*/
                    formationArray.push(placesFormation[0]);
                    callback();
                  });

              },
              // 3rd param is the function to call when everything's done
              function (err) {
                // All tasks are done now
                //console.log("ANSWER ID", formationArray.length);
                return res.json(formationArray)
              }
            );
            /*  promise = results.reduce(function (prev, iFormation) {
             return prev.then(function () {
             console.log(new ObjectID(iFormation.id))
             Formation.findOne({id:new ObjectID(iFormation.id)})
             .populate('place')
             .populate('formationCenter')
             .exec(function placesFouded(err, placesFormation) {
             // body...
             formationsResponse = [];
             console.log("ANSWER", placesFormation);



             /!*                promiseResult = placesFormations.reduce(function (prev, iFormation) {
             return prev.then(function () {
             if (typeof iFormation.place != "undefined") {
             iFormation.formationCenter.city = iFormation.place.city;
             formationsResponse.push({
             formation: iFormation
             });
             }
             });
             }, Promise.resolve());

             promiseResult.then(function(array) {
             console.log("<--->", formationsResponse)
             return res.json(formationsResponse)

             });*!/
             formationArray.push(placesFormation);
             });
             idstring =  new ObjectID (iFormation.id)
             //console.log("ID formation " + iFormation.price)


             });
             }, Promise.resolve());

             promise.then(function(array) {
             console.log("ANSWER ID", formationArray);
             return res.json(formationArray)


             //.populate('place')
             //.populate('formationCenter') {id: formationArray[0]}
             //configquery = {id: informationArray}
             /!*              Formation.find({id:[formationArray[0],formationArray[1]]})
             .populate('place')
             .populate('formationCenter')
             .exec(function placesFouded(err, placesFormations) {
             // body...
             formationsResponse = [];
             console.log("ANSWER", placesFormations);
             return res.json(placesFormations)


             /!*                promiseResult = placesFormations.reduce(function (prev, iFormation) {
             return prev.then(function () {
             if (typeof iFormation.place != "undefined") {
             iFormation.formationCenter.city = iFormation.place.city;
             formationsResponse.push({
             formation: iFormation
             });
             }
             });
             }, Promise.resolve());

             promiseResult.then(function(array) {
             console.log("<--->", formationsResponse)
             return res.json(formationsResponse)

             });*!/

             });*!/
             });
             */


          });
        });
      });
    });


    ////--------------------------------------------------------------------------------


    // console.log("Query" ,queryPlace )
    // console.log("Query" ,query )
    /* Formation.find(query)
     .populate('place', queryPlace)
     .populate('formationCenter')
     .exec(function placesFouded(err, placesFormations) {
     // body...
     formationsResponse = [];

     placesFormations.forEach(function (iPlace, index) {
     if ( typeof iPlace.place != "undefined" ) {
     iPlace.formationCenter.city = iPlace.place.city;
     formationsResponse.push({
     formation: iPlace
     });
     }
     });

     return res.json(formationsResponse);
     });*/
  },

  searchcityMongo: function (req, res, next) {

    //db.getCollection('formation').find({"dates":{"$elemMatch":{"date":{"$gte":new ISODate("2016-10-04"),"$lte":new ISODate("2017-05-03")}}}})
    cityv = req.param("city")
    var ObjectID = require('mongodb').ObjectID
    Place.find({city: {contains: cityv}}).exec(function (err, resulFormation) {

      arrayData = []
      var promise;
      promise = resulFormation.reduce(function (prev, iPlace) {
        return prev.then(function () {
          object = iPlace.id
          arrayData.push(new ObjectID(iPlace.id));
        });
      }, Promise.resolve());

      promise.then(function (array) {


        parameters = {
          place: {$in: arrayData},
          price: {
            $gte: 50
          },
          dates: {
            $elemMatch: {
              date: {
                $gte: new Date("2016-10-04"),
                $lte: new Date("2017-05-03")
              }
            }
          }

        }
        Formation.native(function (err, collection) {
          if (err) return res.serverError(err);
          //console.log("---")
          ////Transform all arrayData to new ObjectId [new ObjectID (arrayData[0])]
          // {"place":{"$all": [new ObjectID(arrayData[0])] },"price":{"$gte":50},"dates":{"$elemMatch":{"date":{"$gte":new Date("2016-10-04"),"$lte":new Date("2017-05-03")}}}}

          //console.log("******")
          // parameters.place = {$all:[new ObjectID(arrayData[0])]}
          collection.find(parameters).limit(page).skip(0).toArray(function (err, results) {
            //console.log("sfdsdfsss " + results);
            if (err) return res.serverError(err);
            ////Dados los id buscar un place un el nombre "5797e539e1e9812814a35520"
            return res.json(results)
          });
        });
      });
    });


  },

  searchByDate: function (req, res, next) {
    // body...
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

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      }
      else {
        return res.json({err: 'The len parameter is an invalid string number'});
      }
    }
    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    query = {};
    if (req.param('price') && !isNaN(parseInt(req.param('price')))) {
      query.price = {'>=': req.param('price')};
      //console.log("Create price restriction")
    }
    query.limit = len
    query.skip = page * len
    query.isFull = false


    if (initialDate === 'undefined' || finalDate === 'undefined') {
      return res.json({err: 'You must provide an initialDate and finalDate string parameters.'});
    }

    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);

    if (!_.isDate(initialDate) || !_.isDate(finalDate)) {
      return res.json({err: 'Invalid date format for initialDate or finalDate.'});
    }

    resultFormations = [];

    Formation.find(query)
      .populate('formationCenter')
      .exec(function (err, formationsFounded) {
        // body...
        if (err) {
          console.log('An error has ocurred finding Formations');
          return res.json(err);
        }

        if (formationsFounded === undefined) {
          return res.json({err: 'No formations founded'});
        }

        //console.log("Consulta fin " , query);
        formationsFounded.forEach(function (formation, index) {

          //  console.log("Initial date",  formation.initialDate()," +++++ ", formation.finalDate() )

          if (formation.hasDates() && initialDate <= formation.initialDate() && finalDate >= formation.finalDate()) {
            resultFormations.push(formation);
          }


        });


        return res.json(resultFormations);
      });


  },

  insertDate: function (req, res, next) {
    // body...

    id = req.param('id');
    formationDate = req.param('formationDate');

    if (id === undefined || formationDate === undefined) {
      return res.json({err: 'You must provide an id and formationDate.'});
    }

    if (!FormationService.isValidFormationDate(formationDate)) {
      return res.json({err: 'The formationDate object format is invalid.'})
    }

    formationDate.date = new Date(formationDate.date);

    if (!_.isDate(formationDate.date)) {
      return res.json({err: 'The provided date is invalid.'});
    }

    Formation.findOne(id)
      .exec(function (err, formationFounded) {
        // body...

        if (err) {
          return res.json('An error has ocurred searching the formation.');
        }

        if (formationFounded === undefined) {
          return res.json('No formation match that ID: ' + id.toString());
        }

        formationFounded.dates.push(formationDate);

        formationFounded.save();

        return res.json(formationFounded);

      });
  },
  count: function (req, res, next) {
    Formation.count().exec(function countFaq(error, found) {
      if (error) {

        return res.json({"res": error});
      }

      //console.log('There are ' + found + ' Faq');

      return res.json({"res": "OK", "size": found})


      // There are 1 users called 'Flynn'
      // Don't forget to handle your errors
    });
  },
  //---------------------------------------------------------------------------------

  searchByFormationCenterWithPagination: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: "Formation Center Name is required."});
    }

    var page = 0;
    var len = 10;

    if (req.param('page') !== undefined) {
      if (!isNaN(parseInt(req.param('page')))) {
        page = Math.abs(parseInt(req.param('page')));
      } else {
        return res.json({err: 'The page parameter is an invalid string number'});
      }
    }

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      } else {
        return res.json({err: 'The len parameter is an invalid string number'});
      }
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred searching the Formation Center."});
        }

        if (!FC) {
          return res.json({status: "error", info: "No Formation Center with that name."});
        }

        var query = {
          where: {formationCenter: FC.id},
          skip: page * len,
          limit: len,
          sort: 'updatedAt DESC'
        };

        Formation.find(query)
          .populate('place')
          .exec(function (err, Formations) {
            if (err) {
              return res.json({status: "error", info: "Error searching Formations."});
            }

            Formation.count({ formationCenter: FC.id }).exec(function (err, FormationsCounted) {
              if (err) {
                return res.json({status: "error", info: "Error counting Formations."});
              }

              return res.json({status: "ok", data: Formations, maxSize: FormationsCounted});

            });//Formation count.
          });//Formation find.
      });//Formation Center findOne.
  }
};

