module.exports = {

	isValidCustomerData: function (data) {
		// body...

		var isValid = _.isObject(data) && _.isString(data.name)
		            && _.isString(data.firstName)
		            && _.isString(data.phoneNumber)
		            && _.isString(data.email);

		if(isValid === true)
  			return true;

  		return false;		            
	},

	isValidDriverLicenceData: function (data) {
		// body...

		var isValid = _.isObject(data) && _.isString(data.number)
		            && _.isString(data.placeOfDeliverance);

		if(isValid === true)
  			return true;

  		return false;
	}
};