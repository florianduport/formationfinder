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
      unique: true
    },

    phoneNumber: {
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
    }

  }
};

