/**
 * Bill.js
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

  	date: {
  		type: 'date',
      required: true
  	},
    timestamp: {
      type: "integer",
      required: true
    },
  	amount: {
  		type: 'float'
  	},

  	billNumber: {
  		type: 'string',
  		required: true,

  	},

    billState: {
      type: 'boolean'
    },

  },

  beforeCreate: function (values, cb) {
    values.date.setUTCMilliseconds(0)
    values.timestamp =  values.date.getTime()
    cb()
  }
};

