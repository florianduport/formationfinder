/**
 * Place.js
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

  	address: {
  		type: 'string'
  	},

  	name: {
  		type: 'string',
  		required: true
  	},

  	zipCode: {
  		type: 'integer'
  	},

  	isActivated: {
  		type: 'boolean'
  	},

  	agreementNumber: {
  		type: 'string'
  	},

  	agreementName: {
  		type: 'string'
  	}
  }
};

