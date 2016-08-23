module.exports = {

  isValidFormationDate: function (formationDate) {
  	// body...

  	// this function return true if formationDate is like:
	  // 	{
	  // 		date: "",
	  // 		morning: {hourStart: "", hourEnd: ""},
	  // 		afternoon: {hourStart: "", hourEnd: ""}
	  // 	}
  	// otherwise return false.

  	var isValid = _.isObject(formationDate) && _.isString(formationDate.date)
  	           && _.isString(formationDate.morning.hourStart)
  	           && _.isString(formationDate.morning.hourEnd)
  	           && _.isString(formationDate.afternoon.hourStart)
  	           && _.isString(formationDate.afternoon.hourEnd);

  	if(isValid === true)
  		return true;

  	return false;
  },



};
