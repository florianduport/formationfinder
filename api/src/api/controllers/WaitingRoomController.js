/**
 * WaitingRoomController
 *
 * @description :: Server-side logic for managing waitingrooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  createWithFormationCenterID: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_ID_REQUIRED")});
    }

    //check that the formation center exist,
    FormationCenter.findOne({id: req.param('formationCenter')})
    .exec(function (err, FormationCenterFounded) {
      if(err){
        return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
      }

      if(!FormationCenterFounded){
        return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
      }

      //if i get here, the formation center exist, so i can create the waiting room.
      WaitingRoom.create({
        formationCenter: FormationCenterFounded.id,
      }).exec(function (err, waitingRoomCreated) {
        if(err || !waitingRoomCreated){
          return res.json({status: "error", info: sails.__("ERROR_CREATING_WAITING_ROOM")});
        }

        return res.json({status: "ok", info: sails.__("WAITING_ROOM_CREATED")});
      })
    })

  },

  createWithFormationCenterName: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
    }

    //check that the formation center exist,
    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FormationCenterFounded) {
        if(err){
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if(!FormationCenterFounded){
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        //if i get here, the formation center exist, so i can create the waiting room.
        WaitingRoom.create({
          formationCenter: FormationCenterFounded.id,
        }).exec(function (err, waitingRoomCreated) {
          if(err || !waitingRoomCreated){
            return res.json({status: "error", info: sails.__("ERROR_CREATING_WAITING_ROOM")});
          }

          return res.json({status: "ok", info: sails.__("WAITING_ROOM_CREATED")});
        })
      })

  },

  addCustomer: function (req, res, next) {

    if (req.param('waitingroom') === undefined) {
      return res.json({status: "error", info: sails.__("WAITING_ROOM_REQUIRED")});
    }

    if (req.param('customer') === undefined) {
      return res.json({status: "error", info: sails.__("ERROR_CUSTOMER_REQUIRED")});
    }

    var waitingroom = req.params('waitingroom');

    var customer = req.params('customer');

    //check if the waiting room exist
    WaitingRoom.findOne({id: waitingroom}).exec(function (err, waitingroomfounded) {
      if(err){
        return res.json({status: "error", info: sails.__("ERROR_SEARCHING_WAITING_ROOM")});
      }

      if(!waitingroomfounded){
        return res.json({status: "error", info: sails.__("WAITING_ROOM_NO_FOUNDED")});
      }

      //now check if the customer exist.
      Customer.findOne({id: customer}).exec(function (err, customerFounded) {
        if(err){
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_CUSTOMER")});
        }

        if(!customerFounded){
          return res.json({status: "error", info: sails.__("CUSTOMER_NO_FOUNDED")});
        }

        //now add the customer to the waiting room
        waitingroomfounded.customers.add(customer);
        waitingroomfounded.save();
      });
    });
  }

};

