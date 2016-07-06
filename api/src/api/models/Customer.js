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

    formation:{
      model: 'formation'
    },

  	civility: {
  		type: 'string',
      enum: ['M', 'Mme', 'Mlle']
  	//	defaulstTo: 'M'
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
  		//Ver formato de los numeros telefonicos.
  		type: 'string'
  	},
    emailsend: {
      type: 'integer'
    },

  	email: {
  		type: 'email',
  		unique: true
  	},

  	driverLicence: {
  		model: 'driverLicence'
  	},

  	walletId: {
      //Generada por MangoPay
  		type: 'string'
  	},

    mangouserid: {
      //Generada por MangoPay
      type: 'string'
    },
    mangobankid: {
      //Generada por MangoPay
      type: 'string'
    },
    mangobankbic: {
      //Generada por MangoPay
      type: 'string'
    },

  	customerBills: {
  		collection: 'customerBill' ,
  		via: 'customer'
  	}
  }
};

