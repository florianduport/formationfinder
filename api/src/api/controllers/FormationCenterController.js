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

  searchAllFormationCenters: function (req, res, next) {
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
    console.log("Buscando " , page + " ==== " + len)
    FormationCenter.find({
        skip: page * len,
        limit: len
      })
      .populate('places')
      .populate('formations')
      .exec(function  (err, fomationCentersFounded) {
        // body...
        if(err) {
          return res.json(err);
        }

        return res.json(fomationCentersFounded);
      });

  },

  searchByName: function (req, res, next) {
    // body...

    name = req.param('name');

    if(name === undefined) {
      return res.json({err: 'Name parameter not provided'});
    }

    if (typeof(name) != 'string') {
      name = name.toString();
    }

    FormationCenter.findOne({name: name})
      .populate('animators')
      .populate('formations')
      .populate('places')
      .exec(function (err, formationCenterFounded) {
        // body...

        if(err){
          return res.json({err: 'An error has ocurred searching database'});
        }

        if(formationCenterFounded === undefined) {
          return res.json({err: 'No formation Center match that criteria: ' + name});
        }

        return res.json(formationCenterFounded);
      });

  },
  searchByNameEx: function (req, res, next) {
    // body...

    name = req.param('name');

    if(name === undefined) {
      return res.json({err: 'Name parameter not provided'});
    }

    if (typeof(name) != 'string') {
      name = name.toString();
    }

    FormationCenter.findOne({name: name})
      .populate('animators')
      .populate('formations')
      .populate('places')
      .exec(function (err, formationCenterFounded) {
        // body...

        if(err){
          return res.json({err: 'An error has ocurred searching database'});
        }

        if(formationCenterFounded === undefined) {
          return res.json({err: 'No formation Center match that criteria: ' + name});
        }


        formationArray = []
        Customer.find({formationCenter:formationCenterFounded.id}).exec(function myResult(err, costumerLists){


          formationCenterFounded.customers = costumerLists
          console.log("Insert Costumers ", formationCenterFounded.customers )
          return res.json(formationCenterFounded);

        })


        //return res.json(formationCenterFounded);
      });

  },
  searchByZipcode: function (req, res, next) {
    // body...

    name = req.param('name');

    if(name === undefined) {
      return res.json({err: 'Name parameter not provided'});
    }

    if (typeof(name) != 'string') {
      name = name.toString();
    }

    FormationCenter.findOne({zipCode: name})
      .populate('animators')
      .populate('formations')
      .populate('places')
      .exec(function (err, formationCenterFounded) {
        // body...

        if(err){
          return res.json({err: 'An error has ocurred searching database'});
        }

        if(formationCenterFounded === undefined) {
          return res.json({err: 'No formation Center match that criteria: ' + name});
        }

        return res.json(formationCenterFounded);
      });

  },
  searchformationbyPos: function (req, res, next) {
    // body...

    name = req.param('name');

    if(name === undefined) {
      return res.json({err: 'Name parameter not provided'});
    }

    if (typeof(name) != 'string') {
      name = name.toString();
    }

    FormationCenter.find().populate(places,{ne:0})
      .exec(function (err, formationCenterFounded) {
        // body...

        if(err){
          return res.json({err: 'An error has ocurred searching database'});
        }

        if(formationCenterFounded === undefined) {
          return res.json({err: 'No formation Center match that criteria: ' + name});
        }

        return res.json(formationCenterFounded);
      });

  },
  searchAllFormationCentersNames: function (req, res) {
    FormationCenter.find().exec(function (err, formationCenters) {
      if(err){
        return res.json({status: 'error', info: 'An error has ocurred searching all Formation Centers.'})
      }

      names = [];
      lgth = formationCenters.length;

      for(var i = 0; i < lgth; i++){
        names.push(formationCenters[i].name);
      }

      return res.json({status: 'ok', result: names});
    })
  },
  create: function (req, res) {
    console.log("Creando formation center de prueba");

    return res.json({status: 'ok'});
  }
};

