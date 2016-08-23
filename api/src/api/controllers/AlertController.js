/**
 * AlertController
 *
 * @description :: Server-side logic for managing Alerts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createAlertToFormationCenter : function (req, res, next) {

    var nameFormation = req.param("nameformation");

    if (!nameFormation || nameFormation == "")
      return res.json({response:"ERROR", message:"Not defined Formation´s name"})

    FormationCenter.findOne({name:nameFormation}).exec(function (err, resultObject) {
      if (err) {
        return res.json({response:"ERROR", message:err.message})
      }

      if ( typeof resultObject == "undefined")
        return res.json({response:"ERROR", message:"Not exist Formation´s name"})

      var text = req.param("text");

      if (!text || text == "")
        return res.json({response:"ERROR", message:"Not defined text parameter"})

      var type = req.param("type");

      if (!type || type == "")
        return res.json({response:"ERROR", message:"Not defined type parameter"})

      objectToUpdate = {
        text:text,
        type:type,
        formationCenter:resultObject.id
      }

      Alert.create(objectToUpdate).exec(function(err, resultUpdate){
        if (err) {
          return res.json({response:"ERROR", message:err.message})
        }

        return res.json({response:"OK", result:resultUpdate})

      })
    })
  },

  deleteAlertToFormationCenter : function (req, res, next) {

    var idAlert = req.param("idAlert");

    if (!idAlert || idAlert == "")
      return res.json({response:"ERROR", message:"Not defined alert id"})

    if(isNaN(parseInt(idAlert))){
      return res.json({err: 'Alert idparameter is an invalid string number'});
    }

    Alert.destroy({id:idAlert}).exec(function (err) {
      if (err)
        return res.json({response:"ERROR", message:err.message})
      return res.json({response:"OK"})
    })
  },

  deleteAllAlert: function (req,res, next) {
    Alert.destroy().exec(function (err) {
      if (err)
        return res.json({response:"ERROR", message:err.message})
      return res.json({response:"OK"})
    })

  },

  updateAlertToFormationCenter : function (req, res, next) {

    var idAlert = req.param("idAlert");

    if (!idAlert || idAlert == "")
      return res.json({response:"ERROR", message:"Not defined alert id"})

    var nameFormation = req.param("nameformation");

    if (!nameFormation || nameFormation == "")
      return res.json({response:"ERROR", message:"Not defined Formation´s name"})

    FormationCenter.findOne({name:nameFormation}).exec(function (err, resultObject) {
       if (err) {
         return res.json({response:"ERROR", message:err.message})
       }

      if ( typeof resultObject == "undefined")
        return res.json({response:"ERROR", message:"Not exist Formation´s name"})

      var text = req.param("text");

      if (!text || text == "")
        return res.json({response:"ERROR", message:"Not defined text parameter"})

      var type = req.param("type");

      if (!type || type == "")
        return res.json({response:"ERROR", message:"Not defined type parameter"})

      objectToUpdate = {
        text:text,
        type:type,
        formationCenter:resultObject.id
      }

      Alert.update({id: idAlert},objectToUpdate).exec(function(err, resultUpdate){
        if (err) {
          return res.json({response:"ERROR", message:err.message})
        }

        return res.json({response:"OK", result:resultUpdate})

      })
    })


  },

  countAlertToFormationCenter : function (req, res, next) {


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
      query.date = {}
      query.date.gte = new Date(req.param('initialDate'))
    }


    //console.log("FINAL DATE", finalDate)
    if (finalDate) {
      query.date = {}
      query.date.lte = new Date(req.param('finalDate'))
    }

    FormationCenter.findOne({name:nameFormation}).exec(function( err, resultObject){
      if (err)
        return res.json({response:"ERROR", message:err})

      if ( typeof resultObject == "undefined")
        return res.json({response:"ERROR", message:"Not exist Formation Center with name " + nameFormation})

      query.formationCenter = resultObject.id
      console.log("Query count" + query)
      Alert.count(query).exec(function (err, result ) {
        if (err) {
          return res.json({response:"ERROR", message:err});
        }

        console.log("RESULT count" + result)
        return res.json({res:"OK", size:result})
      })
    })
  },

  searchAlertToFormationCenter : function (req, res, next) {

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
      query.date = {}
      query.date.gte = new Date(req.param('initialDate'))
    }


    //console.log("FINAL DATE", finalDate)
    if (finalDate) {
      query.date = {}
      query.date.lte = new Date(req.param('finalDate'))
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
      console.log("Query count" + query)
      Alert.find(query).limit(len).skip(skipv).exec(function (err, result ) {
        if (err) {
          return res.json({response:"ERROR", message:err});
        }

        console.log("RESULT count" + result)
        return res.json({res:"OK", size:result})
      })
    })

  }
};
