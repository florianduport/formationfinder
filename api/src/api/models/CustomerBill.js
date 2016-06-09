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
  		//Ver el formato de las cuentas, si tienen una cantidad definida de caracteres, etc.
  		type: 'string',
  		required: true,
  		unique: true
  	},

  	billState: {
  		type: 'string'
  		//Ver si existen un numero predefinido de estados conocidos
  		//Utilizar un enum y de ser posible poner valor por defecto del estado
  	},

  	formationCenter:{
		  model: 'formationCenter'
  	},

  	customer: {
  		model: 'customer'
  	},

  	date: {
  		//Imagino que sea la fecha de creacion de la cuenta????
  		type: 'date'
  	},

  	amount: {
  		type: 'float'
  	}

  }
};

