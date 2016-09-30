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
        formationCenter:resultObject.id,
        date:new Date()
      }

      Alert.create(objectToUpdate).exec(function(err, resultUpdate){
        if (err) {
          return res.json({response:"ERROR", message:err.message})
        }

        return res.json({response:"OK", result:resultUpdate})

      })
    })
  },

  createAlertIsFull : function (req, res, next) {

    var nameFormation = req.param("nameformation");

    typeIsFull = "Formation_Full"

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


      objectToUpdate = {
        text:text,
        type: typeIsFull,
        formationCenter:resultObject.id,
        date:new Date()
      }

      Alert.create(objectToUpdate).exec(function(err, resultUpdate){
        if (err) {
          return res.json({response:"ERROR", message:err.message})
        }

        ///Send Mail to formation Center
        mailSubjet = "Formation is full";
        FormationCenterServices.sendAlertMailToFormationCenter(resultUpdate.type  , text, resultObject, mailSubjet)

        return res.json({response:"OK", result:resultUpdate})

      })
    })
  },

  createAlertCustomerBooked : function (req, res, next) {

    var nameFormation = req.param("nameformation");

    typeIsFull = 'New_Costumer'

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


      objectToUpdate = {
        text:text,
        type:typeIsFull,
        formationCenter:resultObject.id,
        date:new Date()
      }

      Alert.create(objectToUpdate).exec(function(err, resultUpdate){
        if (err) {
          return res.json({response:"ERROR", message:err.message})
        }

        ///Send Mail to formation Center
        mailSubjet = "A client has booked a formation";
        FormationCenterServices.sendAlertMailToFormationCenter(resultUpdate.type  , text, resultObject, mailSubjet)

        return res.json({response:"OK", result:resultUpdate})

      })
    })
  },

  deleteAlertByFormationCenter : function (req, res, next) {

    var idAlert = req.param("id");

    if (!idAlert || idAlert == "")
      return res.json({response:"ERROR", message:"Not defined alert id"})

    if(isNaN(parseInt(idAlert))){
      return res.json({response:"ERROR", message: 'Alert id parameter is an invalid string number'});
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

  updateAlertByFormationCenter : function (req, res, next) {

    var idAlert = req.param("id");

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

  countAlertByFormationCenter : function (req, res, next) {


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
        return res.json({response:"ERROR", message: 'The page parameter is an invalid string number'});
      }
    }

    if(req.param('len') !== undefined){
      if(!isNaN(parseInt(req.param('len')))){
        len = Math.abs(parseInt(req.param('len')));
      }
      else
      {
        return res.json({response:"ERROR", message: 'The len parameter is an invalid string number'});
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

      return res.json({response:"ERROR", message:'Invalid date format for initialDate'});

    }

    if (finalDate && !_.isDate(finalDate)) {
      return res.json({response:"ERROR", message: 'Invalid date format for finalDate.'});
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

    if (req.param('text')  ) {
      query.text =   {contains: req.param('text')}
      //console.log("Create price restriction")
    }

    if (req.param('type')  ) {
      query.type = req.param('type')
      //console.log("Create price restriction")
    }

    FormationCenter.findOne({name:nameFormation}).exec(function( err, resultObject){
      if (err)
        return res.json({response:"ERROR", message:err})

      if ( typeof resultObject == "undefined")
        return res.json({response:"ERROR", message:"Not exist Formation Center with name " + nameFormation})

      query.formationCenter = resultObject.id
     // console.log("Query count" + query)
      Alert.count(query).exec(function (err, result ) {
        if (err) {
          return res.json({response:"ERROR", message:err});
        }

       // console.log("RESULT count" + result)
        return res.json({response:"OK", size:result})
      })
    })
  },

  searchAlertByFormationCenter : function (req, res, next) {

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
        return res.json({response:"ERROR", message: 'The page parameter is an invalid string number'});
      }
    }

    if(req.param('len') !== undefined){
      if(!isNaN(parseInt(req.param('len')))){
        len = Math.abs(parseInt(req.param('len')));
      }
      else
      {
        return res.json({response:"ERROR", message: 'The len parameter is an invalid string number'});
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

      return res.json({response:"ERROR", message: 'Invalid date format for initialDate'});

    }

    if (finalDate && !_.isDate(finalDate)) {
      return res.json({response:"ERROR", message: 'Invalid date format for finalDate.'});
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


    if (req.param('text')  ) {
      query.text =   {contains: req.param('text')}
      //console.log("Create price restriction")
    }

    if (req.param('type')  ) {
      query.type = req.param('type')
      //console.log("Create price restriction")
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
     // console.log("Query count" , query)
      Alert.find(query).limit(len).skip(skipv).exec(function (err, result ) {
        if (err) {
          return res.json({response:"ERROR", message:err});
        }

      //  console.log("RESULT count",  result)
        return res.json({response:"OK", result:result})
      })
    })

  },


  getAlertType : function (req, res, next) {
    languageData =[
      "es", "en", "fr"]
    languageData["es"] =  {
      "New_Costumer" : "Nuevo usuario",
      "Formation_Full": "Formacion llena",
      "Place_Unable": "Lugar inactivo"
      }

    languageData["en"] = {
      "New_Costumer" : "New costumer",
      "Formation_Full": "Formation full",
      "Place_Unable": "Place unable"
      }

    languageData["fr"] = {
      "New_Costumer" : "New costumer",
      "Formation_Full": "Formation full",
      "Place_Unable": "Place unable"
      }



    language  = req.param('language')
    type = req.param('type')
    console.log("VIEW RESULT " , language ,type)
    if(req.param('type') === undefined || req.param('language') === undefined || languageData[language]  === undefined ||languageData[language][type]  === undefined ){
      return res.json({response:"ERROR", message:"Invalid parameter."})
    }

    ///Search in asociative map
   return  res.json ( {response:languageData[language][type]})


  }

};

