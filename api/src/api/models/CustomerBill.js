/**
 * CustomerBill.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

  	billNumber: {
  		type: 'string',
  		required: true,
  		unique: true
  	},

  	billState: {
  		type: 'string'
  	},

  	formationCenter:{
		  model: 'formationCenter'
  	},

  	customer: {
  		model: 'customer'
  	},

  	date: {
  		type: 'date'
  	},

  	amount: {
  		type: 'float'
  	}

  }
};

