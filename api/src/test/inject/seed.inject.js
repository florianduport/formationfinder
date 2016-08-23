/**
 * Created by dionis on 6/26/2016.
 */
var FormationCenterData = require('../../api/models/FormationCenter')

describe('data seeding', function(){
/* it('should seed data', function(done){
         ///console.log("Variable de ambiente ", sails.config.environment )

    Configuration.create( {
      name:"mail",
      type:"smtp",
      emailsystemadress:"formationfinder@localhost.com",
      emailport:"25",
      emailhost:"127.0.0.1",
      emailuser:"dionis@localhost.com",
      emailpassword:"",
      emailsecure:false
    }).then(function (Configurations){
      configuration = Configurations[0];
      //console.log("Creado el objeto en BD");
    });


    FormationCenter.find({}).then(function(formationCenters){
         ///Get id for formation
             async.forEach(formationCenters, function (formationCenter, callback) {
               var formationid = formationCenter.id;

               var placeFormationAsociation = {
                 formation:[],
                 place:[],
                 customers:[]
               }

               ////Asociate formation
               async.series({
                 one: function(callback){
                   ///Asociate place
                   Place.update({},{formationCenter:formationid}).exec( function(err, Places) {
                     if (err)
                       console.log(err)

                     Places.forEach(function (iPlaces, i){
                       placeFormationAsociation.place.push(iPlaces.id)
                     })
                     //console.log("one")
                     callback(null, placeFormationAsociation);

                   });

                   //return formationsArray


                 },
                 two: function(callback){


                   Formation.update({},{formationCenter:formationid}).exec( function(err, Formations) {
                     if (err)
                       console.log(err)

                     Formations.forEach(function (iFormation, i){

                       placeFormationAsociation.formation.push(iFormation.id)
                     })
                    // console.log("two")
                     callback(null, placeFormationAsociation);
                   });


                 },
                 three: function(callback){

                   Customer.update({},{formationCenter:formationid}).exec( function(err, Customers) {
                     if (err)
                       console.log(err)

                     Customers.forEach(function (iCustomers, i){


                       placeFormationAsociation.formation.forEach(function (iFormation, i){

                         ObjectCustomers = Customers[i]

                         Customer.update({id:ObjectCustomers.id},{formation:iFormation, emailsend:0}).exec( function(err, CustomersArray) {
                           if (err)
                             console.log(err)
                         })
                       })

                     });
                    // console.log("three")
                     callback(null,placeFormationAsociation );
                   })

                 },
                 four: function (callback){

                   placeFormationAsociation.formation.forEach( function ( iFormation , index ) {
                       iPlace = placeFormationAsociation.place[index]
                       if ( iPlace !== undefined ) {
                         Formation.update({id:iFormation},{place:iPlace}).exec(function (err, Formations){
                          // console.log("Actualizando formacion con place ", iFormation, iPlace);
                         })
                       }

                   })

                  // console.log("four")
                   callback(null,placeFormationAsociation );

                 }
                 }, function(err, results) {
                   // results is now equal to: {one: 1, two: 2}
                   if (err)
                     return next(err);
                 });


                callback();
             })
        done();
      })
      .catch(done);
  });*/

  it('should seed data', function(done){
    ///console.log("Variable de ambiente ", sails.config.environment )

    Configuration.find({ type:"smtp"} ).exec(function userFounded(err, configuration) {
      if (err || configuration.length == 0) {
        //Configuration.create({
        //  name: "mail",
        //  type: "smtp",
        //  emailsystemadress: "formationfinder@localhost.com",
        //  emailport: "25",
        //  emailhost: "127.0.0.1",
        //  emailuser: "dionis@localhost.com",
        //  emailpassword: "",
        //  emailsecure: false
        //}).then(function (Configurations) {
        //  configuration = Configurations[0];
        //  //console.log("Creado el objeto en BD");
        //});
        // GMail configuration

        emailconfig = {
          name: "mail",
          type: "smtp"
        }
        if ( typeof sails.config.globals.configsystem != "undefined"){

          if (typeof sails.config.globals.configsystem.emailsystemadress != "undefined") {
            emailconfig.emailsystemadress = sails.config.globals.configsystem.emailsystemadress
            console.log("Read config value to configuration file.");
          }
          else {
            console.log("No exist emailsystemadress  parameter in config system file set default parameter.");
            emailconfig.emailsystemadress = "formationfinder@localhost.com"

          }


          if (typeof sails.config.globals.configsystem.emailport != "undefined") {
            emailconfig.emailport = sails.config.globals.configsystem.emailport
            console.log("Read config value to configuration file.");
          }
          else {
            console.log("No exist  emailport  parameter in config system file set default parameter.");
            emailconfig.emailport = "25"

          }

          if (typeof sails.config.globals.configsystem.emailhost != "undefined") {
            emailconfig.emailhost = sails.config.globals.configsystem.emailhost
            console.log("Read config value to configuration file.");
          }
          else {
            console.log("No exist  emailhost  parameter in config system file set default parameter.");
            emailconfig.emailhost = "127.0.0.1"
          }

          if (typeof sails.config.globals.configsystem.emailuser != "undefined") {
            emailconfig.emailuser = sails.config.globals.configsystem.emailuser
            console.log("Read config value to configuration file.");
          }
          else {
            console.log("No exist  emailuser  parameter in config system file set default parameter.");
            emailconfig.emailuser = "formationfinder@localhost.com"
          }

          if (typeof sails.config.globals.configsystem.emailpassword != "undefined") {
            emailconfig.emailpassword = sails.config.globals.configsystem.emailpassword
            console.log("Read config value to configuration file.");
          }
          else {
            console.log("No exist  emailuser  parameter in config system file set default parameter.");
            emailconfig.emailpassword = ""
          }

          if (typeof sails.config.globals.configsystem.emailsecure != "undefined") {
            emailconfig.emailsecure = sails.config.globals.configsystem.emailsecure
            console.log("Read config value to configuration file.");
          }
          else {
            console.log("No exist  emailsecure  parameter in config system file set default parameter.");
            emailconfig.emailsecure = false
          }
        }

         //Configuration.create({
         //name: "mail",
         //type: "smtp",
         //emailsystemadress: "formationfinder@localhost.com",
         //emailport: "587",
         //emailhost: "smtp.gmail.com",
         //emailuser: "inoid2007@gmail.com",
         //emailpassword: "cibercubano",
         //emailsecure: false
         //}).then(function (Configurations) {
         //configuration = Configurations[0];
         ////console.log("Creado el objeto en BD");
         //});


        Configuration.create({
          emailconfig
        }).then(function (Configurations) {
          configuration = Configurations[0];
          //console.log("Creado el objeto en BD");
        });

      }
    })
    ///Get id for formation

    ///if and only if not exist assoiatios
    console.log("-------------------------------------------------")
    console.log("-------------------------------------------------")



    var placeFormationAsociation = {
      formation: [],
      place: [],
      customers: [],
      formationcenter:[]
    }

    ////Fin all formationcenter id
    async.series({
      one: function (callback) {

        FormationCenter.find({}).populate("formations").then(function(formationCenters) {

          formationCenters.forEach(function (formationCenter, i ){
            //console.log("Formation size in formationcenter " , formationCenter)
            if (formationCenter.formations.length > 0) {
              console.log("!!!! Updated realized and exit !!!!!!" ,formationCenter.formations.length)
              return;
            }
            placeFormationAsociation.formationcenter.push(formationCenter.id)
          });

          ///Asociate place
          Place.find({}).exec(function (err, Places) {
            if (err)
              console.log(err)

            Places.forEach(function (iPlaces, i) {
              placeFormationAsociation.place.push(iPlaces.id)
            })

            Formation.find({}).exec(function (err, Formations) {
              if (err)
                console.log(err)

              Formations.forEach(function (iFormation, i) {
                placeFormationAsociation.formation.push(iFormation.id)
              })
              //console.log("one")

              Customer.find({}).exec(function (err, Customers) {
                Customers.forEach(function (iCustomer, i) {
                  placeFormationAsociation.customers.push(iCustomer.id)
                });
               //console.log("Read al update datas " , placeFormationAsociation)
                callback(null, placeFormationAsociation);

              });
            });
          });
        });
        //Asociate formations



      },
      two: function (callback) {
        ///Size formation center
        if (placeFormationAsociation.formationcenter.length == 0 || placeFormationAsociation.formation.length == 0) {
          console.log("No information for update")
          callback(null, placeFormationAsociation);
        }
        else {

          sizeElement =  Math.floor(placeFormationAsociation.formation.length / placeFormationAsociation.formationcenter.length)

          //console.log("Asigned formation by Formation Center ", sizeElement)

          sizeFormationCenter  = placeFormationAsociation.formationcenter.length

          sizeFormation = placeFormationAsociation.formation.length

          //console.log("Formation´s size ", placeFormationAsociation.formation.length)
          offset = 0;
          for ( var iElement = 0; iElement < sizeFormationCenter; iElement++) {
            idFormationCenter = placeFormationAsociation.formationcenter[iElement]
            //console.log("Update formation and place by formationcenter id")
            for ( var iAsigned = 0; iAsigned < sizeElement; iAsigned++) {
              idFormation = placeFormationAsociation.formation[offset]
              idPlace = placeFormationAsociation.place[offset]
              Formation.update({id: idFormation}, {place: idPlace, formationCenter:idFormationCenter}).exec(function (err, Formations) {
                // console.log("Actualizando formacion con place y Formation Center ");
              })

              Place.update({id: idPlace}, {formations: idFormation, formationCenter:idFormationCenter}).exec(function (err, Places) {
                //console.log("Actualizando place  con formation y Formation Center ");
              })
              offset++;
            }
          }
          callback(null, placeFormationAsociation);
        }

      },
      three: function (callback) {


        formationData = placeFormationAsociation.formation[0]
        formationCenter = placeFormationAsociation.formationcenter[0]
        Customer.update({}, {formationCenter: formationCenter,  formation: formationData,
          emailsend: 0}).exec(function (err, Customers) {
          if (err)
            console.log(err)

          console.log("Three step update Costumer")
          callback(null, placeFormationAsociation);
        })
      },

      four: function (callback) {

        console.log("------ Process End -------")
        Place.native(function (err, collection) {
          collection.ensureIndex({location: '2dsphere'}, function () {

            // It's very important to trigger this callack method when you are finished
            // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
            console.log("Index to 2dsphere location atributes in Place colection")
            callback(null, placeFormationAsociation);
          });
        });



      },
        five: function(callback) {

          Formation.native(function (err, collection) {
            collection.ensureIndex({place: 1}, function () {

              // It's very important to trigger this callack method when you are finished
              // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
              console.log("Index to 2dsphere location atributes in Place colection")


            });
          });

          formationCenter = placeFormationAsociation.formationcenter[0]
          if (typeof formationCenter != "undefined") {
            Login.update({username: "root"}, {formationCenter: formationCenter}).exec(function (err, Formations) {
              // console.log("Actualizando formacion con place ", iFormation, iPlace);
              if (err)
                console.log("Error update formationcenter")
              console.log("Five formationcenter asociated with LOGIN ", formationCenter)
            })
          }


          Bill.find({}).exec(function (err, BillsAccounts) {

            BillsAccounts.forEach(function (iBill, i) {

              Bill.update({id: iBill.id}, {formationCenter: formationCenter}).exec(function (err, result) {

                if (err) {
                  callback(err);
                }

               // console.log("Actualizando BILL ", iBill.id)
              })

            });

          })
          callback(null, placeFormationAsociation);

        }
    }
      , function (err, results) {
      // results is now equal to: {one: 1, two: 2}


      if (err)
        return next(err);
    });



        done();

  });
  ////Read al formation

  ////Read al place

  ////For each place asig one formation
});
