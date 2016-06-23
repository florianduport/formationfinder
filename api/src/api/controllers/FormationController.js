/**
 * FormationController
 *
 * @description :: Search all formation which it´s name contain name parameter
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	searchbyname: function(req,res,next) {
    var paginationlimit = 10;

    var nameFormation = req.param("name");

    if (!nameFormation || nameFormation == "")
      return next("Not defined Formation´s name")

    var page = req.param("page")

     ///Validate is number
    if ( page &&  !Number.isInteger( Number (page)))
      return next("Page must be a number")

    if (page && page > 0)
     page = page - 1

    if (!page)
      page = 0

    page = page*paginationlimit;


   // console.log("Resultado encontrado");

    //populateAll()
    Formation.find().skip(page).limit(paginationlimit).populate("formationCenter",  {name :  nameFormation }).exec( function ( err, Formations){

      if (err)
        return res.json({ error: err })

      return res.json(Formations)

    });

  },
  /*
    Allway send initdate and enddate
   */
  searchbydate: function(req, res, next) {
    var paginationlimit = 10;

    var dateInit = req.param("initdate");
    var dateEnd = req.param("enddate");


    if (!dateInit ||  !dateEnd )
      return next("Not defined date for search" );

    var page = reg.param("page")

    ///Validate is number
    if (page)
      page = page - 1

    if (page == 0)
      page = 1

    page = page*paginationlimit;

   // { date: { '>': new Date('2/4/2014'), '<': new Date('2/7/2014') }

    Formation.find( { date: { '>': new Date(dateInit), '<': new Date(dateEnd) } }).skip(page).limit(paginationlimit).populate().exec( function ( err, Formations){
      return res.json(Formations)

    });
  }
};

