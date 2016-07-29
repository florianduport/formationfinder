/**
 * Customer.js
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

    formation: {
      model: 'formation',
      defaultsTo: null
    },

  	civility: {
  		type: 'string',
      enum: ['M', 'Mme', 'Mlle'],
  		defaultsTo: 'M'
  	},

  	name: {
  		type: 'string',
  		required: true
  	},

  	firstName: {
  		type: 'string',
  		required: true
  	},

  	birthDate: {
  		type: 'date'
  	},

  	birthCity: {
  		type: 'string'
  	},

  	address: {
  		type: 'string'
  	},

  	zipCode: {
  		type: 'integer'
  	},

  	city: {
  		type: 'string'
  	},

  	phoneNumber: {
  		type: 'string'
  	},

  	email: {
  		type: 'email',
  		unique: true
  	},

  	driverLicence: {
  		type: 'json',
      defaultsTo: {},
      required: true
  	},

  	walletId: {
      //Generada por MangoPay
  		type: 'string'
  	},

  	reasonOfFormation: {
  		type: 'string'
  	},

  	customerBills: {
  		collection: 'customerBill' ,
  		via: 'customer'
  	}
  },
  searchByLicenceNumberInYear: function (licence, year, callback) {
    // body...

    result = {
      status: "",
      info: "",
      data: {}
    };

    if(licence === undefined || !_.isString(licence)){

      result.status = "error";
      result.info = "Licence Number not provided or invalid.";

      console.log("Licence Number not provided or invalid.");

      return callback(result);
    }

    if(year === undefined || !_.isNumber(year)){
      year = new Date();
      year = year.getFullyYear();

    }

    Customer.findOne({"driverLicence.number": licence})
      .exec(function (err, customerFounded) {
        // body...
        if(err){
          result.status = "error";
          result.info = "An error has ocurred searching the customer.";

          console.log("An error has ocurred searching the customer.");

          return callback(result);
        }

        if(customerFounded === undefined)
        {
          result.status = "error";
          result.info = "No customer in the system with that Licence Number.";

          console.log("No customer in the system with that Licence Number.");
          return callback(result);
        }

        //If a get here its becouse i found the customer,
        //now i have to search if there is a formation with that customer
        //in the year provided.

        Formation.find()
          .populate('customers')
          .exec(function (err, formations) {
            // body...

            if(err){
              result.status = "error";
              result.info = "An error has ocurrwed searching formations.";
              return callback(result);
            }

            lthF = formations.length;

            for(var i = 0; i < lthF;  i++){

              if(formations[i].hasYear(year)){

                lthC = formations[i].customers.length;

                for(var j = 0; j < lthC; j++){
                  if(customerFounded.id === formations[i].customers[j].id){
                    //User founded in year.
                    result.status = "ok";
                    result.data = customerFounded;
                    console.log("Customer founded in the provided year.");
                    return callback(result);
                  }
                }
              }
            }

            result.status = "error";
            result.info = "Customer founded but not in the provided year.";
            console.log("Customer founded but not in the provided year.");
            return callback(result);
          });
      });
  },
};

