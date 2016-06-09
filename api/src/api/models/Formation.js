/**
 * Formation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

  	formationCenter: {
  		model: 'formationCenter',
  	},

  	maxPeople: {
  		type: 'integer'
  	},

  	price: {
  		type: 'float'
  	},

    isConfirmed: {
      type: 'boolean'
    },

    isFull: {
      type: 'boolean'
    },

  	place: {
  		model: 'place'
  	},

  	animators: {
      //profundizar en esto
  		type: 'array'
  	},

    customers: {
      collection: 'customer',
      via: 'formation'
    }

  }
};

