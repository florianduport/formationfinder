/**
 * FormationCenter.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

    isActivated: {
      type: 'boolean'
    },

    name: {
      type: 'string',
      required: true
    },

    firstName: {
      type: 'string'
    },

    address: {
      type: 'string'
    },

    zipCode: {
      type: 'integer'
    },

    city: {
      type: 'string'
    },

    email: {
      type: 'email',
      //unique: true
    },

    phoneNumber: {
      type: 'string'
    },
    mangowallet: {
      type: 'string'
    },
    mangouser: {
      type: 'string'
    },
    mangobankaccount: {
      type: 'string'
    },
    mangobicbankaccount: {
      type: 'string'
    },

    animators: {
      collection: 'animator',
      via: 'formationCenter'
    },

    places: {
      collection: 'place',
      via: 'formationCenter'
    },

    bills: {
      collection: 'bill',
      via: 'formationCenter'
    },


    customerBills: {
      collection: 'customerBill',
      via: 'formationCenter'
    },

    formations: {
      collection: 'formation',
      via: 'formationCenter'
    },

    customers: {
      collection: 'customer',
      via: 'formationCenter'
    },

    alerts: {
      collection: 'alert',
      via: 'formationCenter'
    },

    waitingRoom: {
      model: 'waitingRoom'
    }

  },

  afterCreate: function (newFormationCenter, cb) {

    WaitingRoom.create({
      formationCenter: newFormationCenter.id
    }).exec(function (err, waitingRoomCreated) {
      if (err || !waitingRoomCreated) {
        return res.json({status: "error", info: sails.__("ERROR_CREATING_WAITING_ROOM")});
      }

      FormationCenter.update({id: newFormationCenter.id}, {waitingRoom: waitingRoomCreated.id})
        .exec(function (err, formationCenterUpdated) {
          if(err){
            cb(err)
          }

          if(!formationCenterUpdated){
            cb("No formation center updated with the waiting room");
          }

          cb();
        });
    })
  }
};

