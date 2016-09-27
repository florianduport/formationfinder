/**
 * Created by Piterson on 15/08/2016.
 */

module.exports = function (req, res, next) {
  /**
   * To access controllers with this policy, the req object must have
   * in his body or in headers a valid token object.
   *
   **/

  //console.log("************************* AUTH POLICIE ****************************");
  //
  //console.log(req.headers['authorization']);
  //
  //console.log(req.param('token'));

  // var authorization = req.headers['authorization'] || req.param('token');

  var authorization = req.headers['authorization'];

  if (!authorization) {
    return res.forbidden('Error: no token provided.');
  }

  // In authorization a get a string with this format: "Bearer TOKEN"
  // example: "Bearer adfdsfsdfsdfsdfsdffdfsdfsdfsdfdsfdsfsdfdsf"
  // So a get the token with ....
  authorization = authorization.substr(7);

  var decoded = LoginService.verifyLoginToken(authorization);

  if (decoded.status === 'error' || decoded.data === undefined) {
    return res.forbidden('Error: Invalid token provided.');
  }

  //Is a get everything is ok.
  return next();
}
