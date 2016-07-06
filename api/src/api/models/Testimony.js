/**
 * Testimony.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

  	customer: {
  		model: 'customer',
  		required: true
  	},

  	formation: {
  		model: 'formation',
  		required: true
  	},

  	text: {
  		type: 'text',
  		required: true
  	}

  }
};

