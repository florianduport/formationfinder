/**
 * FormationController
 *
 * @description :: Search all formation which it´s name contain name parameter
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	searchbynameTMP: function(req,res,next) {
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

    page = page*paginationlimit;


    Formation.find( {name : { 'contains' : nameFormation }}).skip(page).limit(paginationlimit).populate().exec( function ( err, Formations){
      return res.json(Formations)

    });

  },
  searchbyname: function(req,res,next) {

    var page = 0;
    var len = 10;

    if(req.param('page') !== undefined){
      if(!isNaN(parseInt(req.param('page')))){
        page = Math.abs(parseInt(req.param('page')));
      }
      else
      {
        return res.json({err: 'The page parameter is an invalid string number'});
      }
    }

    if(req.param('len') !== undefined){
      if(!isNaN(parseInt(req.param('len')))){
        len = Math.abs(parseInt(req.param('len')));
      }
      else
      {
        return res.json({err: 'The len parameter is an invalid string number'});
      }
    }


    var paginationlimit = 10;

    var nameFormation = req.param("name");

    if (!nameFormation || nameFormation == "")
      return next("Not defined Formation´s name")

    Formation.find({
        isFull:false,
        skip: page * len,
        limit: len
      })
      .populate('formationCenter', {
        where: {
          name : { 'contains' : nameFormation }
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

    if(zc === undefined){
      return res.json({err: 'No zipcode provided'});
    }


    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);

    if(!_.isDate(initialDate) || !_.isDate(finalDate)){
      return res.json({err: 'Invalid date format for initialDate or finalDate.'});
    }
    var page = 0;
    var len = 10;

    if(req.param('page') !== undefined){
      if(!isNaN(parseInt(req.param('page')))){
        page = Math.abs(parseInt(req.param('page')));
      }
      else
      {
        return res.json({err: 'The page parameter is an invalid string number'});
      }
    }

    //console.log("Call Services")
    if(req.param('len') !== undefined){
      if(!isNaN(parseInt(req.param('len')))){
        len = Math.abs(parseInt(req.param('len')));
      }
      else
      {
        return res.json({err: 'The len parameter is an invalid string number'});
      }
    }
    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    query = {};
    queryPlace = {};

   // console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
   // console.log("Validation price", req.param('price') )

    if (req.param('price') && !isNaN(parseInt(req.param('price'))) ) {
      query.price = {'>=': req.param('price')};
      //console.log("Create price restriction")
    }
    query.limit = len
    query.skip = page * len
    query.isFull = false
    queryPlace.zipcode= zc

   // console.log("Query" ,queryPlace )
   // console.log("Query" ,query )
    Formation.find(query)
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

  countByZipcode: function(req,res, next) {

    // console.log("Call Services")
    if(req.param('zipcode')){
      zc = req.param('zipcode');
    }

    if(zc === undefined){
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
      queryPlace.zipcode= zc

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
    if(cityname === undefined){
      return res.json({ err: 'No city provided' });
    }


    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);

    if(!_.isDate(initialDate) || !_.isDate(finalDate)){
      return res.json({err: 'Invalid date format for initialDate or finalDate.'});
    }
    var page = 0;
    var len = 10;

    if(req.param('page') !== undefined){
      if(!isNaN(parseInt(req.param('page')))){
        page = Math.abs(parseInt(req.param('page')));
      }
      else
      {
        return res.json({err: 'The page parameter is an invalid string number'});
      }
    }

    //console.log("Call Services")
    if(req.param('len') !== undefined){
      if(!isNaN(parseInt(req.param('len')))){
        len = Math.abs(parseInt(req.param('len')));
      }
      else
      {
        return res.json({err: 'The len parameter is an invalid string number'});
      }
    }
    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    query = {};
    queryPlace = {};

   /// console.log("Validation price", !isNaN(parseInt(req.param('price'))) )
   // console.log("Validation price", req.param('price') )

    if (req.param('price') && !isNaN(parseInt(req.param('price'))) ) {
      query.price = {'>=': req.param('price')};
      //console.log("Create price restriction")
    }
    query.limit = len
    query.skip = page * len
    query.isFull = false
    if (cityname != "")
      queryPlace.city= { 'contains' : cityname }

   // console.log("Query" ,queryPlace )
   // console.log("Query" ,query )
    Formation.find(query)
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
      });
  },

  countByCity: function(req,res, next) {
    cityname = "";

    // console.log("Call Services")
    if(req.param('city')){
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
    if(formationID === undefined){
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
    if(customerData === undefined || !CustomerServices.isValidCustomerData(customerData)){
      return res.json({err: 'You must provide a valid customerData object.'});
    }

    //Search the formation.
    Formation.findOne(formationID)
      .exec(function (err, formationFounded) {
        // body...

        console.log("Estoy en formation find one");

        if(err){
          return res.json(err);
        }

        //If the formation does'nt exist or is full send an error.
        if(formationFounded === undefined){
          return res.json({err: 'No formation match that id: ' + formationID.toString()});
        }

        if(formationFounded.isFull == true){
          return res.json({err: 'The formation is full.'});
        }

        //if there is a formation, verify if the customer exist or is a new one.
        Customer.findOne({
          "driverLicence.number": customerData.driverLicence.number
        }).exec(function (err, customerFouded) {
          // body...

          console.log("Estoy en customer find one");

          if(err){
            return res.json(err);
          }

          //if the customer does'nt exist, create and register one.
          if(customerFouded === undefined){

            console.log("Customer no escontrado");

            Customer.create(customerData)
              .exec(function (err, customerCreated) {
                // body...

                console.log("Creando Customer");

                if(err){
                  return res.json(err);
                }

                if(customerCreated === undefined){
                  return res.json({err: 'An error has ocurred when creating the customer'});
                }

                formationFounded.customers.add(customerCreated.id);

                console.log("Mostrando la cantidad de customers de la formacion " +
                  formationFounded.customers.length);

                if(formationFounded.customers.length == formationFounded.maxPeople)
                  formationFounded.isFull = true;

                formationFounded.save();

                return res.json({ok: 'book proces complit.'});
              });
          }
          //else, the customer exist. Search if there is a formation with that customer registered.
          else {

            console.log("Customer escontrado");

            Formation.findOne(customerFouded.formation)
              .exec(function (err, formFounded) {
                // body...
                if(err){
                  return res.json(err);
                }

                if(formFounded === undefined){
                  formationFounded.customers.add(customerFouded.id);

                  console.log("No existe formacion con el customer escontrado");

                  if(formationFounded.customers.length == formationFounded.maxPeople)
                    formationFounded.isFull = true;

                  formationFounded.save();

                  return res.json({ok: 'book proces complit.'});
                }
                else
                {
                  return res.json({err: 'The customer is register in another formation'});
                }
              });
          }

        });
      });
  },

  /*****
   *
   * @param req
   * @param res
   * @param next
     */

  searchcityMongo: function (req, res, next) {

   //db.getCollection('formation').find({"dates":{"$elemMatch":{"date":{"$gte":new ISODate("2016-10-04"),"$lte":new ISODate("2017-05-03")}}}})

    Formation.native(function(err, collection) {
      if (err) return res.serverError(err);

      collection.find({"dates":{"$elemMatch":{"date":{"$gte":new ISODate("2016-10-04"),"$lte":new ISODate("2017-05-03")}}}}).toArray(function (err, results) {
        if (err) return res.serverError(err);
        return res.json(results);
      });
    });
  },

  searchByDate: function (req, res, next) {
    // body...
    var page = 0;
    var len = 10;

    if(req.param('page') !== undefined){
      if(!isNaN(parseInt(req.param('page')))){
        page = Math.abs(parseInt(req.param('page')));
      }
      else
      {
        return res.json({err: 'The page parameter is an invalid string number'});
      }
    }

    if(req.param('len') !== undefined){
      if(!isNaN(parseInt(req.param('len')))){
        len = Math.abs(parseInt(req.param('len')));
      }
      else
      {
        return res.json({err: 'The len parameter is an invalid string number'});
      }
    }
    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    query = {};
    if (req.param('price') &&  !isNaN(parseInt(req.param('price')))) {
      query.price = {'>=': req.param('price')};
      //console.log("Create price restriction")
    }
    query.limit = len
    query.skip = page * len
    query.isFull=false


    if(initialDate === 'undefined' || finalDate === 'undefined'){
      return res.json({err: 'You must provide an initialDate and finalDate string parameters.'});
    }

    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);

    if(!_.isDate(initialDate) || !_.isDate(finalDate)){
      return res.json({err: 'Invalid date format for initialDate or finalDate.'});
    }

    resultFormations = [];

    Formation.find(query)
      .populate('formationCenter')
      .exec(function (err, formationsFounded) {
        // body...
        if(err){
          console.log('An error has ocurred finding Formations');
          return res.json(err);
        }

        if(formationsFounded === undefined){
          return res.json({err: 'No formations founded'});
        }

        //console.log("Consulta fin " , query);
        formationsFounded.forEach(function (formation, index){

        //  console.log("Initial date",  formation.initialDate()," +++++ ", formation.finalDate() )

          if(formation.hasDates() && initialDate <= formation.initialDate() && finalDate >= formation.finalDate()){
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

    if(id === undefined || formationDate === undefined){
      return res.json({err: 'You must provide an id and formationDate.'});
    }

    if(!FormationServices.isValidFormationDate(formationDate)){
      return res.json({err: 'The formationDate object format is invalid.'})
    }

    formationDate.date = new Date(formationDate.date);

    if(!_.isDate(formationDate.date)){
      return res.json({err: 'The provided date is invalid.'});
    }

    Formation.findOne(id)
      .exec(function (err, formationFounded) {
        // body...

        if(err){
          return res.json('An error has ocurred searching the formation.');
        }

        if(formationFounded === undefined){
          return res.json('No formation match that ID: ' + id.toString());
        }

        formationFounded.dates.push(formationDate);

        formationFounded.save();

        return res.json(formationFounded);

      });
  },
  count: function(req,res, next) {
    Formation.count().exec(function countFaq(error, found) {
      if (error) {

        return  res.json({"res": error});
      }

      //console.log('There are ' + found + ' Faq');

      return  res.json({"res":"OK", "size": found})


      // There are 1 users called 'Flynn'
      // Don't forget to handle your errors
    });
  },

  // probando: function (req, res, next) {
  // 	// body...

  // 	Formation.findOne(req.param('id'))
  // 	.exec(function (err, formationFounded) {
  // 		// body...

  // 		if(err){
  // 			return res.json('An error has ocurred searching the formation.');
  // 		}

  // 		if(formationFounded === undefined){
  // 			return res.json('No formation match that ID: ' + id.toString());
  // 		}

  // 		console.log(formationFounded.isNotFull());

  // 		console.log('fecha menor: ' + formationFounded.initialDate());

  // 		console.log('fecha mayor: ' + formationFounded.finalDate());

  // 		return res.json(formationFounded);

  // 	});
  // }
};

