/**
 * Account.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  schema: true,

  attributes: {

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

  	formationCenter: {
  		model: 'formationCenter',
  	}

  }
};

