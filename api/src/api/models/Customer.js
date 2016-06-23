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
  		//Ver si se pueden definir un conjunto determinado de "civilitys"
  		//Utilizar un enum
  		//Ver si utilizar codificador
  		type: 'string',
  		defaulstTo: 'Mr'
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

    emailsend: {
      type: 'integer'
    },
  	city: {
  		type: 'string'
  	},

  	phoneNumber: {
  		//Ver formato de los numeros telefonicos.
  		type: 'string'
  	},

  	email: {
  		type: 'email',
  		unique: true
  	},

  	driverLicence: {
  		//Ver el formato de las licencias
  		type: 'string'
  	},

  	number: {
  		//Numero de que?
  		type: 'integer'
  	},

  	dateOfDeliverance: {
  		type: 'date'
  	},

  	placeOfDeliverance: {
  		type: 'date'
  	},

  	dateOfProcuration: {
  		type: 'date'
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

