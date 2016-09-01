/**
 * Alert.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    text: {
      type: 'string',
      required: true
    },

    type: {
      type: 'string',
      required: true,
      enum: ['New_Costumer', 'Formation_Full', 'Place_Unable'],
      defaultsTo: 'New_Costumer'
    },

    date: {
      type: "date",
      required: true
    },

    formationCenter:{
      model: 'formationCenter'
    }
  },


  isValidType: function ( newType) {
     isValid = false
      this.enum.forEach(function ( iType, i){
        if (iType == newType)
          isValid = true
    })

     return isValid

  }
};

