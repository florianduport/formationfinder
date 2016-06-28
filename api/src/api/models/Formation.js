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

    dates: {
      type: 'array',
      defaultsTo: []
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
      collection: 'animator',
      via: 'formations'
    },

    customers: {
      collection: 'customer',
      via: 'formation'
    },

    testimonies: {
      collection: 'testimony',
      via: 'formation'
    },

    isNotFull: function () {
      // body...
      return !this.isFull;
    },

    finalDate: function () {
      // body...

      lth = this.dates.length;
      if(lth == 0)
        return null;

      maxDate = this.dates[0].date;

      for(var i = 1; i < lth; i++){
        if(maxDate < this.dates[i].date){
          maxDate = this.dates[i].date;
        }
      }

      return maxDate;
    },

    initialDate: function () {
      // body...
      lth = this.dates.length;
      if(lth == 0)
        return null;

      minDate = this.dates[0].date;

      for(var i = 1; i < lth; i++){
        if(minDate > this.dates[i].date){
          minDate = this.dates[i].date;
        }
      }

      return minDate;
    },

    hasDates: function () {
      // body...

      if(this.dates.length > 0)
        return true;
      else
        return false;
    }

  }
};

