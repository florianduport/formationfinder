/**
 * FormationCenterController
 *
 * @description :: Server-side logic for managing formationcenters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  ///Search al testimonies in course on Information Center
	searchtestimony: function( req, res, next) {

  },

  ///Search all FormationCenter with name, id list
  ///recive name´s parameter and find Formation whit name
  search: function( req, res, next) {
    var nameFormationCenter  = req.param('name');

    if ( !nameFormationCenter || nameFormationCenter == "" ) {
      ///Retornar todos los usuarios
      FormationCenter.find( function userFounded(err, user) {
        if (err)
          return next(err);

        ///Iteration by all FormationCenter an return par list (FormationCenter´s name, FormationCenter´s id)
        console.log("No hay nada");
        return res.json(
          FormationCenter
        );

      })
    }
    else {
      FormationCenter.find( {"name":nameFormationCenter}).populateAll().exec( function userFounded(err, FormationCenter) {
        if (err)
          return next(err);

        console.log(FormationCenter);
        return res.json(
           FormationCenter
        );

      });
    }
  },
  ///Filter by name or zipcode return all places in FormationCenter
  searchplaces:function( req, res, next) {
    var nameFormationCenter = req.param('name');

    if (!nameFormationCenter || nameFormationCenter == "") {
        ///Return error
         return next("error: not found");
    }

    /*
    //Aprender a crear funciones para llamar
    if( zipCode(nameFormationCenter)) {
      return searchbyzipcode(nameFormationCenter);
    }
    */

    FormationCenter.find( {"name":nameFormationCenter}).populateAll().exec( function userFounded(err, FormationCenter) {
      if (err)
        return next(err);

      console.log(FormationCenter);

      Place.find({formationCenter:FormationCenter.id}).exec(function userFounded(err, Place) {
        if (err)
          return next(err);

        return res.json(
          Place
        );
      });

    });

  },
  /*
  * Search FormationCenter´s place by zipcode
  * */
  searchplacebyzip:function( req, res, next) {
    var nameFormationCenter = req.param('name');

    if (!name || name == "") {
      ///Retornar todos los usuarios
      return next("error: not zipcode");
    }
    else {
      Place.findOne("zipCode", nameFormationCenter, function userFounded(err, user) {
        if (err)
          return next(err);
        res.view({
          formationcenter: FormationCenter
        });
      })
    }
  }
};

