/**
 * BillController
 *
 * @description :: Server-side logic for managing bills
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  searchAllBills : function (req, res, next) {
     Bill.find({}).exec(function (err, result ) {
         if (err) {
           return res.json({response:"ERROR", message:err});
         }
         return res.json(result);
     })
  },
  searchBills : function (req, res, next) {
    var page = 0;
    var len = 10;
    query = {}

    query.sort = 'date ASC'

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

    skipv = page * len


    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    if ( typeof initialDate != "undefined" )
      initialDate = new Date(initialDate);

    if ( typeof finalDate != "undefined" )
      finalDate = new Date(finalDate);


    //console.log("INITIAL:", initialDate)
    // console.log("FINAL:", finalDate)


    if (initialDate && !_.isDate(initialDate)) {

      return res.json({err: 'Invalid date format for initialDate'});

    }

    if (finalDate && !_.isDate(finalDate)) {
      return res.json({err: 'Invalid date format for finalDate.'});
    }

    if (initialDate) {
      if ( typeof query.date == "undefined" )
        query.date = {}
      query.date.gte = new Date(req.param('initialDate'))
    }


    //console.log("FINAL DATE", finalDate)
    if (finalDate) {
      if ( typeof query.date == "undefined" )
        query.date = {}
      query.date.lte = new Date(req.param('finalDate'))
    }

    if (req.param('amount') !== undefined) {
      if(!isNaN(parseFloat(req.param('amount')))){
        query.amount =  { gte: Math.abs(parseFloat(req.param('amount')))};
      }
    }

    if (req.param('billNumber') !== undefined) {
      if(!isNaN(parseInt(req.param('billNumber')))){
        query.billNumber = Math.abs(parseInt(req.param('billNumber')));
      }
    }

    if (req.param('billState') !== undefined) {
      query.billState =  req.param('billState');
    }

console.log("Query bill ", query)
    Bill.find(query).skip(skipv).exec(function (err, result ) {
      if (err) {
        return res.json({response:"ERROR", message:err});
      }
      return res.json(result);
    })
  },

  searchBillByFormationCenter : function (req, res, next) {

    formationcenterName ="";
    var page = 0;
    var len = 10;
     query = {}

    console.log("Request parameters" , req)

    var nameFormation = req.param("nameformation");

    if (!nameFormation || nameFormation == "")
      return res.json({response:"ERROR", message:"Not defined Formation´s name"})


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

    if ( typeof initialDate != "undefined" )
      initialDate = new Date(initialDate);

    if ( typeof finalDate != "undefined" )
      finalDate = new Date(finalDate);


    //console.log("INITIAL:", initialDate)
    // console.log("FINAL:", finalDate)


    if (initialDate && !_.isDate(initialDate)) {

      return res.json({err: 'Invalid date format for initialDate'});

    }

    if (finalDate && !_.isDate(finalDate)) {
      return res.json({err: 'Invalid date format for finalDate.'});
    }

    if (initialDate) {
      if ( typeof query.date == "undefined" )
        query.date = {}
      query.date.gte = new Date(req.param('initialDate'))
    }


    //console.log("FINAL DATE", finalDate)
    if (finalDate) {
      if ( typeof query.date == "undefined" )
        query.date = {}
      query.date.lte = new Date(req.param('finalDate'))
    }


    if (req.param('amount') !== undefined) {
      if(!isNaN(parseFloat(req.param('amount')))){
        query.amount = Math.abs(parseInt(req.param('amount')));
      }
    }

    if (req.param('billNumber') !== undefined) {
      if(!isNaN(parseInt(req.param('billNumber')))){
        query.billNumber = req.param('billNumber');
      }
    }

    if (req.param('billState') !== undefined) {
        query.billState = Math.abs(parseInt(req.param('billState')));
    }




    var paginationlimit =  page * len;
    skipv = 0
    if (paginationlimit > 0)
      skipv =  paginationlimit


    FormationCenter.findOne({name:nameFormation}).exec(function( err, resultObject){
       if (err)
         return res.json({response:"ERROR", message:err})

      if ( typeof resultObject == "undefined")
        return res.json({response:"ERROR", message:"Not exist Formation Center with name " + nameFormation})

      query.formationCenter = resultObject.id
      query.sort =  'date ASC'

      console.log("Query Bill", query)

      Bill.find(query).limit(len).skip(skipv).exec(function (err, result ) {
        if (err) {
          return res.json({response:"ERROR", message:err});
        }
       console.log("RESULT", result)
        return res.json(result);
      })
    })

  },

  countBillByFormationCenter : function (req, res, next) {

    formationcenterName ="";
    var page = 0;
    var len = 10;
    query = {}

    var nameFormation = req.param("nameformation");

    if (!nameFormation || nameFormation == "")
      return res.json({response:"ERROR", message:"Not defined Formation´s name"})


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

    if ( typeof initialDate != "undefined" )
      initialDate = new Date(initialDate);

    if ( typeof finalDate != "undefined" )
      finalDate = new Date(finalDate);


    //console.log("INITIAL:", initialDate)
    // console.log("FINAL:", finalDate)


    if (initialDate && !_.isDate(initialDate)) {

      return res.json({err: 'Invalid date format for initialDate'});

    }

    if (finalDate && !_.isDate(finalDate)) {
      return res.json({err: 'Invalid date format for finalDate.'});
    }

    if (initialDate) {
      if ( typeof query.date == "undefined" )
        query.date = {}
      query.date.gte = new Date(req.param('initialDate'))
    }


    //console.log("FINAL DATE", finalDate)
    if (finalDate) {
      if ( typeof query.date == "undefined" )
        query.date = {}
      query.date.lte = new Date(req.param('finalDate'))
    }

    if (req.param('amount') !== undefined) {
      if(!isNaN(parseFloat(req.param('amount')))){
        query.amount = Math.abs(parseFloat(req.param('amount')));
      }
    }

    if (req.param('billNumber') !== undefined) {
      if(!isNaN(parseInt(req.param('billNumber')))){
        query.billNumber = Math.abs(parseInt(req.param('billNumber')));
      }
    }

    if (req.param('billState') !== undefined) {
      query.billState = Math.abs(parseInt(req.param('billState')));
    }




    var paginationlimit = 10;

    skipv = page * len


    FormationCenter.findOne({name:nameFormation}).exec(function( err, resultObject){
      if (err)
        return res.json({response:"ERROR", message:err})

      if ( typeof resultObject == "undefined")
        return res.json({response:"ERROR", message:"Not exist Formation Center with name " + nameFormation})

      query.formationCenter = resultObject.id
     // console.log("Query count" + query)
      Bill.count(query).exec(function (err, result ) {
        if (err) {
          return res.json({response:"ERROR", message:err});
        }

     //   console.log("RESULT count" + result)
        return res.json({res:"OK", size:result})
      })
    })

  },

  countBills : function (req, res, next) {
    var page = 0;
    var len = 10;
    query = {}

    query.sort = 'date ASC'

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

    skipv = page * len


    initialDate = req.param('initialDate');
    finalDate = req.param('finalDate');

    if ( typeof initialDate != "undefined" )
      initialDate = new Date(initialDate);

    if ( typeof finalDate != "undefined" )
      finalDate = new Date(finalDate);


    //console.log("INITIAL:", initialDate)
    // console.log("FINAL:", finalDate)


    if (initialDate && !_.isDate(initialDate)) {

      return res.json({err: 'Invalid date format for initialDate'});

    }

    if (finalDate && !_.isDate(finalDate)) {
      return res.json({err: 'Invalid date format for finalDate.'});
    }

    if (initialDate) {
      query.date = {}
      query.date.gte = new Date(req.param('initialDate'))
    }


    //console.log("FINAL DATE", finalDate)
    if (finalDate) {
      query.date = {}
      query.date.lte = new Date(req.param('finalDate'))
    }

    if (req.param('amount') !== undefined) {
      if(!isNaN(parseFloat(req.param('amount')))){
        query.amount = Math.abs(parseFloat(req.param('amount')));
      }
    }

    if (req.param('billNumber') !== undefined) {
      if(!isNaN(parseInt(req.param('billNumber')))){
        query.billNumber = Math.abs(parseInt(req.param('billNumber')));
      }
    }

    if (req.param('billState') !== undefined) {
      query.billState = Math.abs(parseInt(req.param('billState')));
    }


    Bill.count(query).exec(function (err, result ) {
      if (err) {
        return res.json({response:"ERROR", message:err});
      }
      return res.json({res:"OK", size:result})
    })
  },

  createBill: function ( req, res, next) {

    objectToCreated = {}

    var nameFormation = req.param("nameformation");

    initialDate = req.param('date');

    if ( typeof initialDate != "undefined" )
      initialDate = new Date(initialDate);


    if (initialDate && !_.isDate(initialDate)) {
      return res.json({err: 'Invalid date format for date'});
    }

    objectToCreated.date = initialDate;

    if (req.param('amount') !== undefined) {
      if(!isNaN(parseFloat(req.param('amount')))){
        objectToCreated.amount = Math.abs(parseFloat(req.param('amount')));
      }
      else
        return res.json({response:"ERROR", message:"Bill amount it´s not a string number"})
    }
    else
      return res.json({response:"ERROR", message:"Not defined bill amount"})



    if (req.param('billNumber') !== undefined) {
      if(!isNaN(parseInt(req.param('billNumber')))){
        objectToCreated.billNumber = Math.abs(parseInt(req.param('billNumber')));
      }
      else
        return res.json({response:"ERROR", message:"Bill number it´s not a string number"})
    }
    else
      return res.json({response:"ERROR", message:"Not defined bill number"})

    ///Validate if a number

    if (isNaN(parseInt(req.param('billNumber')))) {
      return res.json({response: "ERROR", message: "Bill's number is an invalid string number"})
    }

    objectToCreated.billNumber = req.param('billNumber');

    if (req.param('billState') !== undefined) {
      objectToCreated.billState = Math.abs(parseInt(req.param('billState')));
    }
    else
      return res.json({response:"ERROR", message:"Not defined bill state"})

    objectToCreated.billState = req.param('billState');
    if (!nameFormation || nameFormation == "")
      return res.json({response:"ERROR", message:"Not defined Formation´s name"})

    FormationCenter.findOne({name:nameFormation}).exec(function( err, resultObject){
      if (err)
        return res.json({response:"ERROR", message:err})

      if ( typeof resultObject == "undefined")
        return res.json({response:"ERROR", message:"Not exist Formation Center with name " + nameFormation})

      objectToCreated.formationCenter = resultObject.id

      Bill.create(objectToCreated).exec(function (err, result ) {
        if (err) {
          return res.json({response:"ERROR", message:err});
        }
        return res.json({response:"OK"})
      })
    })


  },

  deleteBill: function ( req, res, next) {
    var idparam = req.param("idparam");

    if (req.param('idparam') !== undefined) {
      if(!isNaN(parseFloat(req.param('idparam')))){
        objectToCreated.amount = Math.abs(parseFloat(req.param('idparam')));
      }
      else
        return res.json({response:"ERROR", message:"Bill id it´s not a string number"})
    }
    else
      return res.json({response:"ERROR", message:"Not defined bill id"})

    Bill.destroy({id:idparam}).exec( function (err) {
      if (err) {
        return res.json({response:"ERROR", message:err.message})
      }

      return res.json({response:"OK"})
    })

  }
};

