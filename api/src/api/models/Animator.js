/**
 * Animator.js
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

  	name: {
  		type: 'string',
  		required: true
  	},

  	firstName: {
  		type: 'string',
  		required: true
  	},

  	type: {
  		type: 'string',
  		enum: ['BAFM', 'PSY']
  	},

  	city: {
  		type: 'string'
  	},

  	zipCode: {
  		type: 'integer'
  	},

    formations: {
      collection: 'formation',
      via: 'animators'
    }

  }
};

