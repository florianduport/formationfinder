/**
 * FormationController
 *
 * @description :: Search all formation which it´s name contain name parameter
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	searchbyname: function(req,res,next) {
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

  searchByZipcode: function (req, res, next) {
    // body...

    zc = req.param('zipcode');

    if(zc === undefined){
      return res.json({err: 'no Zipcode Provided'});
    }

    Place.find({zipcode: zc})
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
      });
  },

  searchByCity: function (req, res, next) {
    // body...

    city = req.param('city');

    if(city === undefined){
      return res.json({ err: 'no City Provided' });
    }

    Place.find({city: city})
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
      });
  },

  bookFormation: function (req, res, next) {
    // body...

    //Get the formation ID for book.
    formationID = req.param('id');
    data = req.param('data');

    if(formationID === undefined){
      return res.json({err: 'You must provide an ID for a formation'});
    }

    if(data === undefined){
      return res.json({err: 'You must provide an JSON object called data with book informations'});
    }

    //Find de formation and check for capacity.
    Formation.findOne(formationID).exec(function (err, formation) {
      // body...

      if(err){
        return res.json(err);
      }

      if(formation.isFull){
        return res.json({err: 'The formation is full'});
      }

      //validate customer information.
      if(!FormationCenterServices.isValidCustomerData(data)){
        return res.json({err: 'Invalid customer information'});
      }

      //Valitade driver licence information.
      dl = data.driverLicence;
      if(dl === undefined){
        return res.json({err: 'Inside de data object, must be an driverLicence object, with the driver licence infromation'});
      }

      if(!FormationCenterServices.isValidDriverLicenceData(dl)){
        return res.json({err: 'Invalid driver licence information'});
      }

      //Validate that driver licence not belong to any formations in this year.



      // //Validate that this driver licence is not in the system in this year.
      // DriverLicence.findOne({number: dl.number}).exec(function DLfounded(err, driverL) {

      // });

      dateOfDel = new Date(
        dl.dateOfDeliverance.year,
        dl.dateOfDeliverance.month,
        dl.dateOfDeliverance.day
      );

      dateOfPro = new Date(
        dl.dateOfProcuration.year,
        dl.dateOfProcuration.month,
        dl.dateOfProcuration.day
      );

      DriverLicence.create({
        number: dl.number,
        placeOfDeliverance: dl.placeOfDeliverance,
        dateOfDeliverance: dateOfDel,
        dateOfProcuration: dateOfPro
      }).exec(function (err, driverL) {
        // body...
        if(err){
          return res.json(err);
        }

        customerBirthDate = new date(
          data.birthDate.year,
          data.birthDate.month,
          data.birthDate.day
        );

        Customer.create({
          formationCenter: formation.formationCenter,
          formation: formation.id,
          civility: data.civility,
          name: data.name,
          firstName: data.firstName,
          birthDate: customerBirthDate,
          birthCity: data.birthCity,
          phoneNumber: data.phoneNumber,
          email: data.email,
          driverLicence: driverL,

          //reason of formations ...
          //walletID

        }).exec(function (err, customer) {
          // body...

          if(err){
            return res.json(err);
          }

          //Validate if the formation get full.
          if(formation.customers.length == formation.maxPeople){
            formation.isFull = true;
          }

          return res.json(customer);
        });

      });



    });

  },

  searchByDate: function (req, res, next) {
    // body...

    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    if(initialDate === 'undefined' || finalDate === 'undefined'){
      return res.json({err: 'You must provide an initialDate and finalDate string parameters.'});
    }

    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);

    if(!_.isDate(initialDate) || !_.isDate(finalDate)){
      return res.json({err: 'Invalid date format for initialDate or finalDate.'});
    }

    resultFormations = [];

    Formation.find()
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

        formationsFounded.forEach(function (formation, index){

          if(formation.hasDates() && initialDate <= formation.initialDate() && finalDate >= formation.finalDate()){
            resultFormations.push(formation);
          }
        });
      });

    return res.json(resultFormations);
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
  }

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

