/**
 * Created by Piterson on 15/08/2016.
 */

module.exports = function (req, res, next) {
  /**
   * To access controllers with this policy, the req object must have
   * in his body or in headers a valid token object.
   *
   **/

  var authorization = req.headers['authorization'] || req.param('token');

  if(!authorization){
    return res.forbidden('Error: no token provided.');
  }

  var decoded = LoginService.verifyLoginToken(authorization);

  if(decoded.status === 'error' || decoded.data === undefined){
    return res.forbidden('Error: Invalid token provided.');
  }

  //Is a get everything is ok.
  return next();
}
