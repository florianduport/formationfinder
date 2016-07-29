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
  		model: 'place',

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
      return this.dates.length > 0 ;
    },

    dateIndex: function (date) {
      // body...

      if(!_.isNumber(date) || this.dates.length == 0)
        return null;

      lth = this.dates.length;

      for(var i = 0; i < lth ; i++){

        if(date == this.dates[i].date){
          return i;
        }
      }

      return null;
    },

    getDates: function () {
      // body...
      dates = [];

      lth = this.dates.length;

      for (var i = 0; i < lth; i++) {
        dates.push(this.dates[i]);
        dates[i].date = new Date(dates[i].date);
      };

      return dates;
    },
    hasYear: function (year) {
      // body...

      if(!this.hasDates())
        return false;

      lth = this.dates.length;

      for(var i = 0; i < lth; i++){
        tempYear = new Date(this.dates[i].date);
        if(year === tempYear.getFullYear())
          return true;
      }

      return false;
    }

  } //attributes.

};

