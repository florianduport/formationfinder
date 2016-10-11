/**
 * Created by dionis on 7/14/2016.
 */
module.exports = {
  /*
   *
   *  Verifiy if association beteween object its created if no create acutomatically
   *
   * */

  validateaAssociationsTMP: function () {

    Configuration.find({type: "smtp"}).exec(function userFounded(err, configuration) {
      emailconfig = {
        name: "mail",
        type: "smtp"
      }


      if (typeof sails.config.globals.configsystem != "undefined") {

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
          //emailconfig.emailuser = "formationfinder@localhost.com"
        }

        if (typeof sails.config.globals.configsystem.emailpassword != "undefined") {
          emailconfig.emailpassword = sails.config.globals.configsystem.emailpassword
          console.log("Read config value to configuration file.");
        }
        else {
          console.log("No exist  emailuser  parameter in config system file set default parameter.");
          //emailconfig.emailpassword = ""
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
      if (err || configuration.length == 0) {
        //Configuration.create(emailconfig).then(function (Configurations) {
        //  configuration = Configurations[0];
        //  //console.log("Creado el objeto en BD");
        //});
        /* GMail configuration*/


        //Configuration.create({
        //  name: "mail",
        //  type: "smtp",
        //  emailsystemadress: "formationfinder@localhost.com",
        //  emailport: "587",
        //  emailhost: "smtp.gmail.com",
        //  emailuser: "inoid2007@gmail.com",
        //  emailpassword: "cibercubano",
        //  emailsecure: true
        //}).then(function (Configurations) {
        //  configuration = Configurations[0];
        //  //console.log("Creado el objeto en BD");
        //});

        Configuration.create({
          name: "mail",
          type: "smtp",
          emailsystemadress: emailconfig.emailsystemadress,
          emailport: emailconfig.emailport,
          emailhost: emailconfig.emailhost,
          emailuser: emailconfig.emailuser,
          emailpassword: emailconfig.emailpassword,
          emailsecure: emailconfig.emailsecure
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
      formationcenter: []
    }

    ////Fin all formationcenter id
    async.series({
      one: function (callback) {

        FormationCenter.find({}).populate("formations").then(function (formationCentersArray) {
          flagSearch = false
          formationCenters = []
          formationCenters.push(formationCentersArray[0])
          formationCenters.forEach(function (formationCenter, i) {
            //console.log("Formation size in formationcenter " , formationCenter)
            if (formationCenter.formations.length > 0) {
              console.log("!!!! Updated realized and exit !!!!!!", formationCenter.formations.length)
              //callback(null, placeFormationAsociation);
              flagSearch = true
              return;
            }
            placeFormationAsociation.formationcenter.push(formationCenter.id)
          });

          if (flagSearch)
            callback(null, placeFormationAsociation);
          else {
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
          }
      })
        ;
        //Asociate formations


      },
      two: function (callback) {
        ///Size formation center
        if (placeFormationAsociation.formationcenter.length == 0 || placeFormationAsociation.formation.length == 0) {
          console.log("No information for update")
          callback(null, placeFormationAsociation);
        }
        else {

          sizeElement = Math.floor(placeFormationAsociation.formation.length / placeFormationAsociation.formationcenter.length)

          //console.log("Asigned formation by Formation Center ", sizeElement)

          sizeFormationCenter = placeFormationAsociation.formationcenter.length

          sizeFormation = placeFormationAsociation.formation.length

          //console.log("Formation´s size ", placeFormationAsociation.formation.length)
          offset = 0;
          for (var iElement = 0; iElement < sizeFormationCenter; iElement++) {
            idFormationCenter = placeFormationAsociation.formationcenter[iElement]
            //console.log("Update formation and place by formationcenter id")
            for (var iAsigned = 0; iAsigned < sizeElement; iAsigned++) {
              idFormation = placeFormationAsociation.formation[offset]
              idPlace = placeFormationAsociation.place[offset]
              Formation.update({id: idFormation}, {
                place: idPlace,
                formationCenter: idFormationCenter
              }).exec(function (err, Formations) {
                // console.log("Actualizando formacion con place y Formation Center ");
              })

              Place.update({id: idPlace}, {
                formations: idFormation,
                formationCenter: idFormationCenter
              }).exec(function (err, Places) {
                //console.log("Actualizando place  con formation y Formation Center ");
              })
              offset++;
            }
          }
          callback(null, placeFormationAsociation);
        }

      },
      three: function (callback) {

        if (placeFormationAsociation.formationcenter.length == 0 || placeFormationAsociation.formation.length == 0) {
          console.log("No information for update Customer")
          callback(null, placeFormationAsociation);
        }
        else {
          formationData = placeFormationAsociation.formation[0]
          formationCenter = placeFormationAsociation.formationcenter[0]
          Customer.update({}, {
            formationCenter: formationCenter, formation: formationData,
            emailsend: 0
          }).exec(function (err, Customers) {
            if (err)
              console.log(err)

            console.log("Three step update Costumer")
            callback(null, placeFormationAsociation);
          })
        }
      },

      four: function (callback) {

        console.log("------ Process End -------")
        callback(null, placeFormationAsociation);

      },
      five: function (callback) {

        if (placeFormationAsociation.formationcenter.length == 0 || placeFormationAsociation.formation.length == 0) {
          console.log("No information for update")
          callback(null, placeFormationAsociation);
        }
        else {
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

          ///Seed all Animator to First Formation Center
          Animator.update({}, {formationCenter: formationCenter}).exec(function (err, Animators) {
            if (err) {
              console.log("Error Updating Animator.");
            }

            // console.log("************* Se actualizaron los animators: ", Animators);
          });

          ///Seed all Alert to First Formation Center
          Alert.find({}).exec(function (err, AlertsAccounts) {

            AlertsAccounts.forEach(function (iAlert, i) {

              Alert.update({id: iAlert.id}, {formationCenter: formationCenter}).exec(function (err, result) {

                if (err) {
                  callback(err);
                }

                // console.log("Actualizando BILL ", iBill.id)
              })

            });
          });
          callback(null, placeFormationAsociation);
        }
      },
      six: function (callback) {
        //Use with INTERNET
        if (placeFormationAsociation.formationcenter.length == 0 || placeFormationAsociation.formation.length == 0) {
          console.log("No information for update")
          callback(null, placeFormationAsociation);
        }
        else {
          FormationCenter.find({}).exec(function (err, formationCenterArray) {
            if (err)
              console.log(err)
            formationCenterArray.forEach(function (iFormation, i) {
              PaymentService.makeWalletToFormationCenter(iFormation.name,
                function resultServices(err, result) {
                  if (err) {
                    console.log("ERROR", err)
                  }

                  console.log("Payment data  ", result)
                })
            });
            console.log("SIX")
            callback(null, placeFormationAsociation);
          });
        }
      }
    }, function (err, results) {
      // results is now equal to: {one: 1, two: 2}
      if (err)
        return next(err);
    });

  }
}
