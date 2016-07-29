/**
 * Place.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  // types: {

  //   //Se utiliza para validar que el atributo coordenadas tenga los valores X y Y.
  //   hasCoordinatesXY: function (coor) {
  //     return coor.x && coor.y;
  //   }

  // },

  attributes: {

  	formationCenter:{
		  model: 'formationCenter'
  	},

    formations: {
      collection: 'formation',
      via: 'place'
    },

  	name: {
      type: 'string',
      required: true
    },

    address: {
  		type: 'string'
  	},

    location: {
      type: 'json'
      ///index:'2dsphere'
    },

    latitude: {
      type: 'float',

    },

    longitude: {
      type: 'float',

    },

  	zipcode: {
  		type: 'integer'
  	},

    city: {
      type: 'string'
    },

  	isActivated: {
  		type: 'boolean'
  	},

  	agreementNumber: {
  		type: 'string'
  	},

  	agreementName: {
  		type: 'string'
  	},
    /*
     * Search models based on location
     */
    search: function (conditions, maxDistance) {

      // Let's build up a MongoDB query
      var query = {};

      // We need to use `native` for geo queries
      Property.native(function (err, collection) {

        // Co-ordinates are passed from the client side (GMaps JS API)
        // Note that we don't get them server-side because apparently
        // the server-side API isn't designed for real-time user searches.
        // Probably too slow or something.

          if (err) return res.serverError(err);

          collection.find({
            location:
            { $near :
            {
              $geometry: { type: "Point",  coordinates: [conditions.longitude, conditions.latitude ] },
              $minDistance: 1000,
              $maxDistance: 5000
            }
            }
          }).toArray(function (err, results) {
            if (err) return res.serverError(err);
            return res.json(results);
          });
        });



    }
  }
};

