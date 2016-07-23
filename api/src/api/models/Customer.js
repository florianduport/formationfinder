/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

  	formationCenter:{
		  model: 'formationCenter'
  	},

    formation: {
      model: 'formation',
      defaultsTo: null
    },

  	civility: {
  		type: 'string',
      enum: ['M', 'Mme', 'Mlle'],
  		defaultsTo: 'M'
  	},

  	name: {
  		type: 'string',
  		required: true
  	},

  	firstName: {
  		type: 'string',
  		required: true
  	},

  	birthDate: {
  		type: 'date'
  	},

  	birthCity: {
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

  	phoneNumber: {
  		type: 'string'
  	},

  	email: {
  		type: 'email',
  		unique: true
  	},

  	driverLicence: {
  		type: 'json',
      defaultsTo: {},
      required: true
  	},

  	walletId: {
      //Generada por MangoPay
  		type: 'string'
  	},

  	reasonOfFormation: {
  		type: 'string'
  	},

  	customerBills: {
  		collection: 'customerBill' ,
  		via: 'customer'
  	}
  }
};

