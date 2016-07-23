module.exports = {

	isValidCustomerData: function (data) {
		// body...
		var isValid =  _.isObject(data) && _.isString(data.name)
		            && _.isString(data.firstName)
		            && _.isString(data.phoneNumber)
		            && _.isString(data.email)
		            && _.isObject(data.driverLicence)
		            && _.isString(data.driverLicence.number)
		            && _.isString(data.driverLicence.placeOfDeliverance);

		console.log("En la comprobacion isValid es: "+isValid);

		return (isValid === true);

	}
};