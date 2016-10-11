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
  searchSimpleByName: function (req, res, next) {
    // body...

    name = req.param('name');

    if(name === undefined) {
      return res.json({err: 'Name parameter not provided'});
    }

    if (typeof(name) != 'string') {
      name = name.toString();
    }

    FormationCenter.findOne({name: name})
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
      .populate('customers')
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
// ----------- Actualizacion de Piterson -------------------//

  create: function (req, res, next) {

    //Validate parameters.
    if (req.param('name') === undefined) {
      return res.json({status: "error", info: "Name is required."});
    }

    if (req.param('address') === undefined) {
      return res.json({status: "error", info: "Address is required."});
    }

    if (req.param('zipCode') === undefined) {
      return res.json({status: "error", info: "ZipCode is required."});
    }

    if (req.param('city') === undefined) {
      return res.json({status: "error", info: "City is required."});
    }

    if (req.param('email') === undefined) {
      return res.json({status: "error", info: "Email is required."});
    }

    if (req.param('phoneNumber') === undefined) {
      return res.json({status: "error", info: "Phone Number is required."});
    }

    if (req.param('defaultLogin') === undefined) {
      return res.json({status: "error", info: "defaultLogin is required."});
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
        Login.create({username: req.param('defaultLogin'), password: req.param('defaultLogin'), formationCenter: FormationCenterCreated.id})
          .exec(function (err, LoginCreated) {
            if(err || !LoginCreated){
              return res.json({status: "error", info: "Error creating default login."});
            }

            return res.json({status: "ok", info: "Formation Center created.", data: FormationCenterCreated});
          });
      }); //End of FormationCenter.create.
    }); //End of FormationCenter.findOne.
  },

  //-----------------------------------------------------------
  searchAllNoPopulate: function (req, res, next) {

    var page = 0;
    var len = 10;

    if (req.param('page') !== undefined) {
      if (!isNaN(parseInt(req.param('page')))) {
        page = Math.abs(parseInt(req.param('page')));
      } else {
        return res.json({err: 'The page parameter is an invalid string number'});
      }
    }

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      } else {
        return res.json({err: 'The len parameter is an invalid string number'});
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
        return res.json({status: "error", info: "Error searching Formation Centers."});
      }

      if (FormationCentersFounded.length === 0) {
        return res.json({status: "error", info: "There are not Formation Centers."});
      }

      FormationCenter.count(query).exec(function (err, FCcounted){

        if (err) {
          return res.json({status: "error", info: "Error counting Formation Centers."});
        }

        return res.json({status: "ok", data: FormationCentersFounded, maxSize: FCcounted});
      });
    });
  },


  delete: function (req, res, next) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: "Formation Center id is required."});
    }

    FormationCenter.findOne({id: req.param('id')})
      .exec(function (err, FormationCenterFounded) {

        if (err) {
          return res.json({status: "error", info: "Error searching Formation Center."});
        }

        if (!FormationCenterFounded) {
          return res.json({status: "error", info: "There isn't a Formation Center with that id."});
        }

        /*******************************************************************/
        /**   Now delete all object asociated with this formation center. **/
        /*******************************************************************/

        //Delete animators.
        Animator.destroy({formationCenter: FormationCenterFounded.id})
          .exec(function (err) {
            if (err) {
              return res.json({status: "error", info: "Error deleting Animators."});
            }

            //Delete places.
            Place.destroy({formationCenter: FormationCenterFounded.id})
              .exec(function (err) {
                if (err) {
                  return res.json({status: "error", info: "Error deleting Places."});
                }

                //Delete Bills.
                Bill.destroy({formationCenter: FormationCenterFounded.id})
                  .exec(function (err) {
                    if (err) {
                      return res.json({status: "error", info: "Error deleting Bills."});
                    }

                    //Delete Customers.
                    Customer.destroy({formationCenter: FormationCenterFounded.id})
                      .exec(function (err) {
                        if (err) {
                          return res.json({status: "error", info: "Error deleting Customers."});
                        }

                        //Delete CustomerBills.
                        CustomerBill.destroy({formationCenter: FormationCenterFounded.id})
                          .exec(function (err) {
                            if (err) {
                              return res.json({status: "error", info: "Error deleting CustomerBills."});
                            }

                            //Delete Formations.
                            Formation.destroy({formationCenter: FormationCenterFounded.id})
                              .exec(function (err) {
                                if (err) {
                                  return res.json({status: "error", info: "Error deleting Formations."});
                                }

                                //Delete Logins.
                                Login.destroy({formationCenter: FormationCenterFounded.id})
                                  .exec(function (err) {
                                    if (err) {
                                      return res.json({status: "error", info: "Error deleting Logins."});
                                    }

                                    /****************************************************/
                                    /**  Finally Destroy the Fromation Center Object   **/
                                    /****************************************************/

                                    FormationCenter.destroy({id: FormationCenterFounded.id})
                                      .exec(function (err) {
                                        if (err) {
                                          return res.json({status: "error", info: "Error deleting Formation Center."});
                                        }

                                        return res.json({status: "ok", info: "Formation Center deleted."});
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
      return res.json({status: "error", info: "Formation Center id is required."});
    }

    if (req.param('attributes') === undefined) {
      return res.json({status: "error", info: "attributes parameter is required."});
    }

    FormationCenter.findOne({id: req.param('id')})
      .exec(function (err, FCfounded) {
        if (err) {
          return res.json({status: "error", info: "Error searching Formation Center."});
        }

        if (!FCfounded) {
          return res.json({status: "error", info: "That Formation Center doesn't exist."});
        }

        //Validate that the new attributes (name, email, phonenumber) are not in use.
        var ORcriteria = [];
        var attributes = req.param('attributes');
        var uniqueParameters = false;

        console.log("Los atributos pasados fueron: ",attributes);

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
                return res.json({status: "error", info: "Error OR searching Formation Center."});
              }

              if (FormationCenterFounded) {

                console.log("Encontre a alguien con el mismo atributo unico");

                if (FormationCenterFounded.name === attributes.name) {
                  return res.json({status: "error", info: "Name parameter is in use."});
                }

                if (FormationCenterFounded.email === attributes.email) {
                  return res.json({status: "error", info: "Email parameter is in use."});
                }

                if (FormationCenterFounded.phoneNumber === attributes.phoneNumber) {
                  return res.json({status: "error", info: "PhoneNumber parameter is in use."});
                }
              }

              //If a get here, everything is ok, then update formation center.
              FormationCenter.update({id: FCfounded.id}, attributes)
                .exec(function (err, FCupdated) {
                  if (err || !FCupdated) {
                    return res.json({status: "error", info: "Error updating Formation Center."});
                  }

                  return res.json({status: "ok", info: "Formation Center updated.", data: FCupdated});
                });
            });//End of FormationCenter.findOne with OR criteria.
        }//End if(uniqueParameters)
        else {
          FormationCenter.update({id: FCfounded.id}, attributes)
            .exec(function (err, FCupdated) {
              if (err || !FCupdated) {
                return res.json({status: "error", info: "Error updating Formation Center."});
              }

              return res.json({status: "ok", info: "Formation Center updated.", data: FCupdated});
            });
        }
      });
  },

  searchByID: function (req, res, next) {
    //In this search i do not use populate, i only need the Formation Center attributes.

    if (req.param('id') === undefined) {
      return res.json({status: "error", info: "Formation Center id is required."});
    }

    FormationCenter.findOne({id: req.param('id')})
      .exec(function (err, FCfounded) {
        if (err) {
          return res.json({status: "error", info: "Error searching Formation Center."});
        }

        if (!FCfounded) {
          return res.json({status: "error", info: "That Formation Center doesn't exist."});
        }

        return res.json({status: "ok", data: FCfounded});
      });
  }
};

