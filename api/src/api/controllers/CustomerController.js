/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  ///Search all formation will start whit 5 hours
  // return formations array when each object have
  //formation´s name, adress and started date
  searchbyclosedformation: function( req, res, next) {
      //localhost:1337/Formationcenter/create?name=Paris"&adress="rue 15"&zipCode=21231&city="Paris"&email="dionis@uo.edu.cu"&phoneNumber="02131231231"

      //http://localhost:1337/Place/create?formationCenter=57655462ca27cbd00fbfe3f0&name=Paris_Place%22&adress=%22rue%2015%22&zipCode=21231&isActived=true&agreementNumber=344&agreementName=02131231231
      //http://localhost:1337/Place/create?formationCenter=57655462ca27cbd00fbfe3f0&name=Paris_Plac3e%22&adress=%22rue%2015%20tres%20prochain%20%20le%20chateau%20Martin%22&zipCode=61231&isActived=true&agreementNumber=34&agreementName=02131231231

      //http://localhost:1337/Formation/create?formationCenter=57655462ca27cbd00fbfe3f0&maxPeople=50&price=120.50&isConfirmed=true&isFull=false&place=57655564ca27cbd00fbfe3f2

      //http://localhost:1337/Customer/create?formationCenter=57655462ca27cbd00fbfe3f0&formation=576556a6ca27cbd00fbfe3f4&name=Frolian&firstName=Dupont&birthDate=%225/1/1984%22&birthCity=%22Bordeux%22&address=%22Rue%2045%22&zipCode=567894&emailsend=0&city=%22Bordeaux%22&phoneNumber=%224566787%22&email=dionis@localhost.com
      //http://localhost:1337/Customer/create?formationCenter=57655462ca27cbd00fbfe3f0&formation=5765567fca27cbd00fbfe3f3&name=Dionis&firstName=Duponte&birthDate=%225/1/1984%22&birthCity=%22Bordeux%22&address=%22Rue%2045%22&zipCode=567894&emailsend=0&city=%22Bordeaux%22&phoneNumber=%224566787%22&email=jolbert@localhost.com


    //
      var resultFormation = [];
      var date = new Date();

      ///add 5 hours
      var units = 5;
      date.setHours(date.getHours() + units);
      date = new Date(date);
      ///Search all costumer who not sended initcoursesmail

    formationsArray = []
    placeFormationArray = []
    async.series({
        one: function(callback){
          Customer.find({"emailsend": 0 }).then( function userFounded( Customers) {

              ///Ver como buscar un campo fecha y calcular 5 horas mas
              ///comporar este valor con el campo fecha de todos los insertados

              console.log("Hour to search " + date)

              return ( Customers)

            }
          ).then( function (Customers) {
            //var tasks = [...]
            //var promise = Promise.resolve();
            //tasks.forEach(function(task) {
            //  promise = promise.then(function() {
            //    return task();
            //  });
            //});
            //
            //  promise.then(function() {  //All tasks completed
            //     })


              var promise = Customers.reduce(function(prev, Customer) {
                return prev.then(function() {

                  ///, {"createdAt" : { '<': date}}
                  Formation.find({"id": Customer.formation}).exec(function formationFounded(err, formation) {

                    for (iTr in formation) {
                      formationsArray.push(formation[iTr])
                      objectResult = {};
                      objectResult.costumerid = Customer.id
                      objectResult.formationcenterid = Customer.formationCenter
                      objectResult.costumerid= Customer.id
                      objectResult.placeid =  formation[iTr].place
                      objectResult.email =  Customer.email
                      resultFormation.push(objectResult);

                    }

                  return true;


                })
              }); }, Promise.resolve());
              promise.then(function() {  //All tasks completed

                console.log("------- Formations ---------- ")
                console.log(formationsArray)
                callback(null, formationsArray);
                 });


            //async.each(Customers, function (Customer, callback) {
            //  // if any of the saves produced an error, err would equal that error
            //
            //  console.log("------Usuario-------")
            //  console.log(Customer)
            //
            //
            //  ///, {"createdAt" : { '<': date}}
            //  Formation.find({"id": Customer.formation}).exec(function formationFounded(err, formation) {
            //
            //    for (iTr in formation) {
            //      formationsArray.push(formation[iTr])
            //      objectResult = {};
            //      objectResult.costumerid = Customer.id
            //      objectResult.formationcenterid = Customer.formationCenter
            //      objectResult.costumerid= Customer.id
            //      objectResult.placeid =  formation[iTr].place
            //      objectResult.email =  Customer.email
            //      resultFormation.push(objectResult);
            //
            //    }
            //    //console.log(formation)
            //    callback();
            //  })
            //}, function (err) {
            //  if (err)
            //    return next(err);
            //  console.log("------- Formations ---------- ")
            //  console.log(formationsArray)
            //  callback(null, formationsArray);
            //  //return formationsArray
            //
            //});
          });
        },
        two: function(callback){

          async.forEach(resultFormation, function (iResultFormation, callback) {
            Place.findOne({id: iResultFormation.placeid}).exec (function placeFounded( err, Place) {
              console.log(Place)
              objectPlaceFormation = {}
              //objectPlaceFormation.formation = iResultFormation;
              objectPlaceFormation.place = Place;
              iResultFormation.name =  Place.name
              iResultFormation.adress = Place.address,
              placeFormationArray.push(objectPlaceFormation)
              callback();
            })
          }, function ( err) {
            if (err)
              return next(err);
            console.log("********************************************")
            console.log(placeFormationArray)
            callback(null,placeFormationArray);
          });
        },
      three: function(callback){
          console.log(" ***** Ejecución final ****** ")
          for ( iTr in resultFormation) {
            console.log(resultFormation[iTr])
          }
        callback(null,resultFormation);
      }
      },


      function(err, results) {
        // results is now equal to: {one: 1, two: 2}
        if (err)
          return next(err);

        console.log("**** Ejecucion de la ultima instruccion**** ")
        var valResult = resultFormation
        console.log(resultFormation);
        if (res)
          return res.json(resultFormation);
        else
          return resultFormation

      });



  /*
      .then( function (placeFormationArray) {
        console.log("El lugar");
        //console.log(Place);
        for (iFormationPlace in  placeFormationArray)
          var object = PlaceFormationArray[iFormationPlace]
        if (object) {

          resultFormation.push({
            costumerid: Customer.id,
            name: object.formation.name,
            adress: object.place.address,
            starteddate: object.formation.createdAt,
            email: Customer.email
          })
          console.log(resultFormation)
        }
          return;
        })
        .then( function () {
          console.log("........................")
          console.log(resultFormation)
          return {
            formations: resultFormation
          }

        })
     .catch (function userFounded( err) {
      if (err)
        return next(err);
    })
 */


  },
  ///Update al costumer id with send mailed result
  ///parameter is Array with object { idcostumer, sendmailed} result
  updatemailnotify: function ( costumerArray) {
        ////Para cada elemento del arreglo  actualizar en la base de datoss

      async.forEach(costumerArray, function (CustomerObject, callback) {
        // if any of the saves produced an error, err would equal that error

        console.log("------Usuario-------")
        console.log(CustomerObject)


        ///, {"createdAt" : { '<': date}}
        CustomerObject.update({"id": CustomerObject.costumerid},{ mailsended: CustomerObject.mailstatus }).exec(function CostumerUpdateFounded(err, Customer) {

          for (iTr in Customer) {
            formationsArray.push()
            objectResult = Customer[iTr]
            console.log("--- Actualizando usuario ---");
            console.log("--- nombre : " +  objectResult.name);
            console.log("--- correo : " +  objectResult.email);
          }
          //console.log(formation)
          callback();
        })
      }, function (err) {
        if (err)
          return next(err);
        console.log("------- Final de instrucciones ---------- ")

        //callback();
         return "OK"

      });
    },

  searchByLicenceInYear: function (req, res, next) {
    // body...

    var result = {};
    var licence = req.param('licence');

    var year = new Date();
    year = year.getFullYear();

    if(licence === undefined || !_.isString(licence)){
      result.status = "error";
      result.info = "You must provided a valid string licence parameter.";

      return res.json(result);
    }

    if(req.param('year') !== undefined){
      if(!isNaN(parseInt(req.param('year')))){
        year = Math.abs(parseInt(req.param('year')));
      }
      else
      {
        result.status = "error";
        result.info = "The year parameter is an invalid string number.";

        return res.json(result);
      }
    }

    Customer.searchByLicenceNumberInYear(licence, year, function (result) {
      // body...
      return res.json(result);
    });
  },

  searchIfNotExistByLicence: function (req, res, next) {

    var result = {};
    var licence = req.param('licence');

    if(licence === undefined || !_.isString(licence)){
      result.status = "error";
      result.info = sails.__("INVALID_LICENCE_STRING");

      return res.json(result);
    }

    Customer.findOne({
      "driverLicence.number": licence
    }).exec(function (err, CustomerFounded) {

      if (err) {
        return res.json({status: "error", info: sails.__("ERROR_SEARCHING_CUSTOMER")});
      }

      //If the customer exist, send an error.
      if (CustomerFounded) {
        return res.json({status: "error", info: sails.__("ERROR_CUSTOMER_EXIST")});
      }

      //customer does not exits.
      return res.json({status: "ok"});

    });
  },

  sendMailCustomerBooked: function(req, res, next) {

      customerObject = req.param("customer");

      if ( typeof customerObject == "undefined"){
        return res.json( req.__('NOT_CORRECT_CUSTOMER_DATA'));
      }

      if ( typeof customerObject.id == "undefined"){
        return res.json( req.__('NOT_CORRECT_CUSTOMER_DATA'));
      }

      Customer.findOne({id:customerObject.id}).exec(function (err, resultObject){

        if (err) {
          return res.json( req.__('NOT_CORRECT_CUSTOMER_DATA'));
        }

        if ( typeof resultObject == "undefined"){
          return res.json( req.__('NOT_CORRECT_CUSTOMER_DATA'));
        }

        CustomerServices.sendMailBooked(resultObject, function (err, result){
          if ( err) {
            return res.json( req.__('NOT_MAIL_CUSTOMER_BOOKED'));
          }

          if ( typeof result == "undefined"){
            return res.json( req.__('NOT_MAIL_CUSTOMER_BOOKED'));
          }

          if (result.response == "ERROR") {
            return res.json( result.message);
          }

          if (result.response == "OK") {
            return res.json( result);
          }

        })
      })

  },

  searchbyformation:function(req, res, next){

   },

  searchById : function (req, res, next){
     idStr = req.param('id')

     if (idStr === undefined) {
       return res.json({status: "error", info: sails.__("ERROR_FORMATION_REQUIRED")});
     }

     Customer.findOne({id:idStr}).exec(function (err, customerObject) {

         if (customerObject === undefined) {
           return res.json({status: "error", info: sails.__("ERROR_FORMATION_REQUIRED")});
         }
       return res.json({status: "ok", data: customerObject});
     })
   },

  deleteById : function (req, res, next){
    idStr = req.param('id')
   //console.log("Identificador  ocurrido ",idStr )
    if (idStr === undefined) {
      return res.json({status: "error", info: sails.__("ERROR_FORMATION_REQUIRED")});
    }

    Customer.destroy({id:idStr}).exec(function (err) {
     //console.log("Error ocurrido ",err )
      if (err) {
        return res.json({status: "error", info: sails.__("ERROR_FORMATION_REQUIRED")});
      }
      return res.json({status: "ok", data:null});
    })
  },

  searchByFormationCenterInWaitingRoom: function (req, res, next) {

    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FC) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        Customer.find({formationCenter: FC.id, waitingRoom: FC.waitingRoom}).exec(function (err, Customers) {
          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_CUSTOMER")});
          }
          return res.json({status: "ok", data: Customers});
        });
      });
  }
};

