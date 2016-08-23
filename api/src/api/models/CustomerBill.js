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

  	},


    //billState: {
    //  type: 'string',
    //  required: true,
    //  enum: ['Paid', 'No'],
    //  defaultsTo: 'No'
    //  //Ver si existen un numero predefinido de estados conocidos
    //  //Utilizar un enum y de ser posible poner valor por defecto del estado
    //},

    billState: {
      type: 'boolean'
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

