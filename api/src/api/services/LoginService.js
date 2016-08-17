/**
 * Created by Admin on 13/08/2016.
 */

var jwtSecret = "qwertyuiop";
var jwt = require("jsonwebtoken");

module.exports = {

  generateLoginToken: function (userID) {
    try {
      var token = jwt.sign({id: userID}, jwtSecret);
    } catch (err) {
      return {status: "error", info: "And error has ocurred generating token.", data: err};
    }
    return {status: "ok", token: token};
  },

  verifyLoginToken: function (token) {

    try {
      var decoded = jwt.verify(token, jwtSecret);
    } catch (err){
      return {status: "error", info: "And error has ocurred validating the token.", data: err};
    }

    return {status: "ok", info: "", data: decoded.id};
  }
};
