/**
 * FormationCenterController
 *
 * @description :: Server-side logic for managing formationcenters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  ///Search al testimonies in course on Information Center
  searchtestimony: function (req, res, next) {

  },

  searchAllFormationCenters: function (req, res, next) {
    // body...

    var page = 0;
    var len = 10;

    if (req.param('page') !== undefined) {
      if (!isNaN(parseInt(req.param('page')))) {
        page = Math.abs(parseInt(req.param('page')));
      }
      else {
        return res.json({err: sails.__("ERROR_PAGE_INVALID")});
      }
    }

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      }
      else {
        return res.json({err: sails.__("ERROR_LEN_INVALID")});
      }
    }
    console.log("Buscando ", page + " ==== " + len)
    FormationCenter.find({
        skip: page * len,
        limit: len
      })
      .populate('places')
      .populate('formations')
      .exec(function (err, fomationCentersFounded) {
        // body...
        if (err) {
          return res.json(err);
        }

        return res.json(fomationCentersFounded);
      });

  },

  searchByName: function (req, res, next) {
    // body...

    name = req.param('name');

    if (name === undefined) {
      return res.json({err: sails.__("NAME_PARAMETER_REQUIRED")});
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

        if (err) {
          return res.json({err: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (formationCenterFounded === undefined) {
          return res.json({err: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        return res.json(formationCenterFounded);
      });

  },
  searchSimpleByName: function (req, res, next) {
    // body...

    name = req.param('name');

    if (name === undefined) {
      return res.json({err: sails.__("NAME_PARAMETER_REQUIRED")});
    }

    if (typeof(name) != 'string') {
      name = name.toString();
    }

    FormationCenter.findOne({name: name})
      .exec(function (err, formationCenterFounded) {
        // body...

        if (err) {
          return res.json({err: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (formationCenterFounded === undefined) {
          return res.json({err: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        return res.json(formationCenterFounded);
      });

  },
  searchByNameEx: function (req, res, next) {
    // body...

    name = req.param('name');

    if (name === undefined) {
      return res.json({err: sails.__("NAME_PARAMETER_REQUIRED")});
    }

    if (typeof(name) != 'string') {
      name = name.toString();
    }

    FormationCenter.findOne({name: name})
      .populate('animators')
      .populate('formations')
      .populate('places')
      .populate('customers')
      .exec(function (err, formationCenterFounded) {
        // body...

        if (err) {
          return res.json({err: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (formationCenterFounded === undefined) {
          return res.json({err: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }


        formationArray = []
        Customer.find({formationCenter: formationCenterFounded.id}).exec(function myResult(err, costumerLists) {


          formationCenterFounded.customers = costumerLists
          console.log("Insert Costumers ", formationCenterFounded.customers)
          return res.json(formationCenterFounded);

        })


        //return res.json(formationCenterFounded);
      });

  },
  searchByZipcode: function (req, res, next) {
    // body...

    name = req.param('name');

    if (name === undefined) {
      return res.json({err: sails.__("NAME_PARAMETER_REQUIRED")});
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

        if (err) {
          return res.json({err: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (formationCenterFounded === undefined) {
          return res.json({err: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        return res.json(formationCenterFounded);
      });

  },
  searchformationbyPos: function (req, res, next) {
    // body...

    name = req.param('name');

    if (name === undefined) {
      return res.json({err: sails.__("NAME_PARAMETER_REQUIRED")});
    }

    if (typeof(name) != 'string') {
      name = name.toString();
    }

    FormationCenter.find().populate(places, {ne: 0})
      .exec(function (err, formationCenterFounded) {
        // body...

        if (err) {
          return res.json({err: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (formationCenterFounded === undefined) {
          return res.json({err: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        return res.json(formationCenterFounded);
      });

  },
  searchAllFormationCentersNames: function (req, res) {
    FormationCenter.find().exec(function (err, formationCenters) {
      if (err) {
        return res.json({status: 'error', info: sails.__("ERROR_SEARCHING_FORMATION_CENTERS")})
      }

      names = [];
      lgth = formationCenters.length;

      for (var i = 0; i < lgth; i++) {
        names.push(formationCenters[i].name);
      }

      return res.json({status: 'ok', result: names});
    })
  },

  create: function (req, res, next) {

    //Validate parameters.
    if (req.param('name') === undefined) {
      return res.json({status: "error", info: sails.__("NAME_PARAMETER_REQUIRED")});
    }

    if (req.param('address') === undefined) {
      return res.json({status: "error", info: sails.__("ADDRESS_PARAMETER_REQUIRED")});
    }

    if (req.param('zipCode') === undefined) {
      return res.json({status: "error", info: sails.__("ZIPCODE_PARAMETER_REQUIRED")});
    }

    if (req.param('city') === undefined) {
      return res.json({status: "error", info: sails.__("CITY_PARAMETER_REQUIRED")});
    }

    if (req.param('email') === undefined) {
      return res.json({status: "error", info: sails.__("EMAIL_PARAMETER_REQUIRED")});
    }

    if (req.param('phoneNumber') === undefined) {
      return res.json({status: "error", info: sails.__("PHONENUMBER_PARAMETER_REQUIRED")});
    }

    if (req.param('defaultLogin') === undefined) {
      return res.json({status: "error", info: sails.__("DEFAULTLOGIN_PARAMETER_REQUIRED")});
    }

    var tFormationCenter = {};

    tFormationCenter.name = req.param('name');
    tFormationCenter.address = req.param('address');
    tFormationCenter.zipCode = req.param('zipCode');
    tFormationCenter.city = req.param('city');
    tFormationCenter.email = req.param('email');
    tFormationCenter.phoneNumber = req.param('phoneNumber');


    //Activated default value is false and is not required, so check if was suplied.
    if (req.param('isActivated') !== undefined) {

      //Check if it is valid.
      if (req.param('isActivated') !== true && req.param('isActivated') !== false) {
        return res.json({status: "error", info: "Invalid isActivated parameter, only true or false."});
      }

      tFormationCenter.isActivated = (req.param('isActivated') === true);

    } else {
      tFormationCenter.isActivated = false;
    }

    //Check if there is other formation center with the same name, or email or phoneNumner.
    FormationCenter.findOne({
      OR: [
        {name: tFormationCenter.name},
        {email: tFormationCenter.email},
        {phoneNumber: tFormationCenter.phoneNumber},
      ]
    }).exec(function (err, FormationCenterFounded) {

      if (err) {
        return res.json({status: "error", info: "Error searching Formation Center."});
      }

      if (FormationCenterFounded) {

        if (FormationCenterFounded.name === tFormationCenter.name) {
          return res.json({status: "error", info: "There is other Formation Center with that Name."});
        }

        if (FormationCenterFounded.email === tFormationCenter.email) {
          return res.json({status: "error", info: "There is other Formation Center with that Email."});
        }

        if (FormationCenterFounded.phoneNumber === tFormationCenter.phoneNumber) {
          return res.json({status: "error", info: "There is other Formation Center with that Phone Number."});
        }

      }

      //If i get here, everything is ok, a can create the formation center.

      FormationCenter.create(tFormationCenter).exec(function (err, FormationCenterCreated) {

        if (err || !FormationCenterCreated) {
          return res.json({status: "error", info: "Error creating Formation Center."});
        }

        //Now create de Admin Login in the formation center.
        Login.create({
            username: req.param('defaultLogin'),
            password: req.param('defaultLogin'),
            formationCenter: FormationCenterCreated.id
          })
          .exec(function (err, LoginCreated) {
            if (err || !LoginCreated) {
              return res.json({status: "error", info: "Error creating default login."});
            }

            return res.json({status: "ok", info: "Formation Center created.", data: FormationCenterCreated});
          });
      }); //End of FormationCenter.create.
    }); //End of FormationCenter.findOne.
  },

  searchAllNoPopulate: function (req, res, next) {

    var page = 0;
    var len = 10;

    if (req.param('page') !== undefined) {
      if (!isNaN(parseInt(req.param('page')))) {
        page = Math.abs(parseInt(req.param('page')));
      } else {
        return res.json({err: sails.__("ERROR_PAGE_INVALID")});
      }
    }

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      } else {
        return res.json({err: sails.__("ERROR_LEN_INVALID")});
      }
    }

    var query = {
      where: {},
      skip: page * len,
      limit: len,
      sort: 'updatedAt DESC'
    };

    FormationCenter.find(query).exec(function (err, FormationCentersFounded) {
      if (err) {
        return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTERS")});
      }

      if (FormationCentersFounded.length === 0) {
        return res.json({status: "error", info: sails.__("NO_FORMATION_CENTERS_FOUNDED")});
      }

      FormationCenter.count(query).exec(function (err, FCcounted) {

        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_COUNTING_FORMATION_CENTERS")});
        }

        return res.json({status: "ok", data: FormationCentersFounded, maxSize: FCcounted});
      });
    });
  },

  delete: function (req, res, next) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: sails.__("ID_PARAMETER_REQUIRED")});
    }

    FormationCenter.findOne({id: req.param('id')})
      .exec(function (err, FormationCenterFounded) {

        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FormationCenterFounded) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        /*******************************************************************/
        /**   Now delete all object asociated with this formation center. **/
        /*******************************************************************/

        //Delete animators.
        Animator.destroy({formationCenter: FormationCenterFounded.id})
          .exec(function (err) {
            if (err) {
              return res.json({status: "error", info: sails.__("ERROR_DELETING_ANIMATORS")});
            }

            //Delete places.
            Place.destroy({formationCenter: FormationCenterFounded.id})
              .exec(function (err) {
                if (err) {
                  return res.json({status: "error", info: sails.__("ERROR_DELETING_PLACES")});
                }

                //Delete Bills.
                Bill.destroy({formationCenter: FormationCenterFounded.id})
                  .exec(function (err) {
                    if (err) {
                      return res.json({status: "error", info: sails.__("ERROR_DELETING_BILLS")});
                    }

                    //Delete Customers.
                    Customer.destroy({formationCenter: FormationCenterFounded.id})
                      .exec(function (err) {
                        if (err) {
                          return res.json({status: "error", info: sails.__("ERROR_DELETING_CUSTOMERS")});
                        }

                        //Delete CustomerBills.
                        CustomerBill.destroy({formationCenter: FormationCenterFounded.id})
                          .exec(function (err) {
                            if (err) {
                              return res.json({status: "error", info: sails.__("ERROR_DELETING_CUSTOMERS_BILLS")});
                            }

                            //Delete Formations.
                            Formation.destroy({formationCenter: FormationCenterFounded.id})
                              .exec(function (err) {
                                if (err) {
                                  return res.json({status: "error", info: sails.__("ERROR_DELETING_FORMATIONS")});
                                }

                                //Delete Logins.
                                Login.destroy({formationCenter: FormationCenterFounded.id})
                                  .exec(function (err) {
                                    if (err) {
                                      return res.json({status: "error", info: sails.__("ERROR_DELETING_LOGINS")});
                                    }

                                    /****************************************************/
                                    /**  Finally Destroy the Fromation Center Object   **/
                                    /****************************************************/

                                    FormationCenter.destroy({id: FormationCenterFounded.id})
                                      .exec(function (err) {
                                        if (err) {
                                          return res.json({
                                            status: "error",
                                            info: sails.__("ERROR_DELETING_FORMATION_CENTER")
                                          });
                                        }

                                        return res.json({status: "ok", info: sails.__("FORMATION_CENTER_DELETED")});
                                      })
                                  });//End of Login destroy.
                              });//End of Formation destroy.
                          });//End of CustomerBill destroy.
                      });//End of Customer destroy.
                  });//End of Bill destroy.
              });//End of Place destroy.
          });//End of Animator destroy.
      });//End of FormationCenter.findOne.
  },//End of delete Action.

  update: function (req, res, next) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: sails.__("ID_PARAMETER_REQUIRED")});
    }

    if (req.param('attributes') === undefined) {
      return res.json({status: "error", info: sails.__("ATTRIBUTE_PARAMETER_REQUIRED")});
    }

    FormationCenter.findOne({id: req.param('id')})
      .exec(function (err, FCfounded) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FCfounded) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        //Validate that the new attributes (name, email, phonenumber) are not in use.
        var ORcriteria = [];
        var attributes = req.param('attributes');
        var uniqueParameters = false;

        if (attributes.name) {
          ORcriteria.push({name: attributes.name});
          uniqueParameters = true;
        }

        if (attributes.email) {
          ORcriteria.push({email: attributes.email});
          uniqueParameters = true;
        }

        if (attributes.phoneNumber) {
          ORcriteria.push({phoneNumber: attributes.phoneNumber});
          uniqueParameters = true;
        }

        if (uniqueParameters) {

          FormationCenter.findOne({
              OR: ORcriteria
            })
            .exec(function (err, FormationCenterFounded) {

              console.log("Entre a search OR: ");

              if (err) {
                return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
              }

              if (FormationCenterFounded) {

                console.log("Encontre a alguien con el mismo atributo unico");

                if (FormationCenterFounded.name === attributes.name) {
                  return res.json({status: "error", info: sails.__("NAME_IN_USE")});
                }

                if (FormationCenterFounded.email === attributes.email) {
                  return res.json({status: "error", info: sails.__("EMAIL_IN_USE")});
                }

                if (FormationCenterFounded.phoneNumber === attributes.phoneNumber) {
                  return res.json({status: "error", info: sails.__("PHONENUMBER_IN_USE")});
                }
              }

              //If a get here, everything is ok, then update formation center.
              FormationCenter.update({id: FCfounded.id}, attributes)
                .exec(function (err, FCupdated) {
                  if (err || !FCupdated) {
                    return res.json({status: "error", info: sails.__("ERROR_UPDATING_FORMATION_CENTER")});
                  }

                  return res.json({status: "ok", info: sails.__("FORMATION_CENTER_UPDATED"), data: FCupdated});
                });
            });//End of FormationCenter.findOne with OR criteria.
        }//End if(uniqueParameters)
        else {
          FormationCenter.update({id: FCfounded.id}, attributes)
            .exec(function (err, FCupdated) {
              if (err || !FCupdated) {
                return res.json({status: "error", info: sails.__("ERROR_UPDATING_FORMATION_CENTER")});
              }

              return res.json({status: "ok", info: sails.__("FORMATION_CENTER_UPDATED"), data: FCupdated});
            });
        }
      });
  },

  searchByID: function (req, res, next) {
    //In this search i do not use populate, i only need the Formation Center attributes.

    if (req.param('id') === undefined) {
      return res.json({status: "error", info: sails.__("ID_PARAMETER_REQUIRED")});
    }

    FormationCenter.findOne({id: req.param('id')})
      .exec(function (err, FCfounded) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FCfounded) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        return res.json({status: "ok", data: FCfounded});
      });
  },

  //----------------------------------------------------------------

  addCustomerToTheWaitingRoom: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
    }

    if (req.param('customerData') === undefined) {
      return res.json({status: "error", info: sails.__("CUSTOMER_DATA_REQUIRED")});
    }

    customerData = req.param('customerData');

    //First search the formation center.
    FormationCenter.findOne({name: req.param('formationCenter')})
      .populate('waitingRoom')
      .exec(function (err, FormationCenterFounded) {
      if (err) {
        return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
      }

      if (!FormationCenterFounded) {
        return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
      }

      //Then search the customer, it can't exist.
      Customer.findOne({"driverLicence.number": customerData.driverLicence.number})
        .exec(function (err, CustomerFounded) {
          if(err){
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_CUSTOMER")});
          }

          //If the customer exist, send and error.
          if(CustomerFounded){
            return res.json({status: "error", info: sails.__("ERROR_CUSTOMER_EXIST")});
          }

          //Now create the customer and add him to the waiting room.
          Customer.create(req.param('customerData'))
          .exec(function (err, CustomerCreated) {
            if(err || !CustomerCreated){
              return res.json({status: "error", info: sails.__("ERROR_CREATING_CUSTOMER")});
            }

            FormationCenterFounded.waitingRoom.customers.add(CustomerCreated.id);
            FormationCenterFounded.waitingRoom.save();

            return res.json({status: "ok", info: sails.__("CUSTOMER_ADDED_TO_WAITING_ROOM")});
          });
        });
    });


  },

  getWaitingRoomCustomerListByFormationCenter: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FormationCenterFounded) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FormationCenterFounded) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        Customer.find({waitingRoom: FormationCenterFounded.waitingRoom})
        .exec(function (err, CustomersFounded) {
          if(err){
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_CUSTOMERS")});
          }

          if(CustomersFounded.length === 0){
            return res.json({status: "error", info: sails.__("WAITING_ROOM_IS_EMPTY")});
          }

          return res.json({status: "ok", data: CustomersFounded});
        })

    })
  }
};

