/**
 * DriverLicence.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

  	number: {
  		type: 'string',
  		required: true,
  		unique: true
  	},

  	customer: {
  		model: 'customer'
  	},

  	dateOfDeliverance: {
  		type: 'date'
  	},

  	placeOfDeliverance: {
  		type: 'string'
  	},

  	dateOfProcuration: {
  		type: 'date'
  	}

  }
};

