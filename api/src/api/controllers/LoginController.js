/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res, next) {

    //Validate parameters.
    if (req.param('username') === undefined) {
      return res.json({status: "error", info: "Username is required."});
    }

    if (req.param('password') === undefined) {
      return res.json({status: "error", info: "Password is required."});
    }

    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: "Formation Center Name is required."});
    }

    //Create a temporal login variable.
    cLogin = {
      username: req.param('username'),
      password: req.param('password')
    };

    //Verify if the isMainLogin, isActivated parameters where provided.
    if (req.param('isMainLogin')) {
      tmpML = req.param('isMainLogin');
      if (tmpML !== true && tmpML !== false) {
        return res.json({status: "error", info: "Invalid isMainLogin attribute, only true o false options."});
      }
      else {
        cLogin.isMainLogin = (tmpML === true);
      }
    }

    if (req.param('isActivated')) {
      tmpAct = req.param('isActivated');
      if (tmpAct !== true && tmpAct !== false) {
        return res.json({status: "error", info: "Invalid isActivated attribute, only true o false options."});
      }
      else {
        cLogin.isActivated = (tmpAct === true);
      }
    }

    //Verify if the formation center provided exist.
    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred searching formation Center."});
        }

        if (FC) {
          //If the formation center exist, then search the login username in that formation center.
          //If the username doesn't exist then create one.

          Login.findOne({
            username: req.param('username'),
            formationCenter: FC.id
          }).exec(function (err, loginFounded) {

            if (err) {
              return res.json({status: "error", info: "An error has ocurred searching the Login."});
            }

            if (loginFounded) {
              return res.json({status: "error", info: "The username exist in the formation center provided."});
            }
            else {
              //Create the Login.
              cLogin.formationCenter = FC.id;
              Login.create(cLogin)
                .exec(function (err, logincreated) {
                  if (err) {
                    return res.json({status: "error", info: "An error has ocurred creating the Login."});
                  }

                  if (logincreated) {
                    return res.json({status: "ok", info: "Login created.", data: logincreated});
                  }

                  return res.json({status: "error", info: "An error has ocurred creating the Login."});
                });
            }

          });
        }
        else {
          return res.json({status: "error", info: "No Formation Center with that Name."});
        }

      });

  },

  check: function (req, res, next) {

    //Validate parameters.
    if (req.param('username') === undefined) {
      return res.json({status: "error", info: "Username is required."});
    }

    if (req.param('password') === undefined) {
      return res.json({status: "error", info: "Password is required."});
    }

    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: "Formation Center Name is required."});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred searching the Formation Center."});
        }

        if (!FC) {
          return res.json({status: "error", info: "No Formation Center with that name."});
        }

        Login.findOne({
          username: req.param('username'),
          formationCenter: FC.id
        }).exec(function (err, loginFounded) {

          if (err) {
            return res.json({status: "error", info: "An error has ocurred searching Login."});
          }

          if (!loginFounded) {
            return res.json({status: "error", info: "That username doesn't exist in the formation center provided."});
          }

          if (loginFounded.password === req.param('password')) {
            resulToken = LoginService.generateLoginToken(loginFounded.id);
            if (resulToken.status == 'ok') {
              return res.json({status: "ok", info: "User and passwors match.", token: resulToken.token});
            } else {
              return res.json({status: "error", info: "Error generated at generateLoginToken."});
            }
          }
          else {
            return res.json({status: "error", info: "The password provided doesn't math."});
          }
        });
      });
  },

  verify: function (req, res) {
    token = req.param('token');

    decoded = LoginService.verifyLoginToken(token);

    return res.json(decoded);

  },

  delete: function (req, res) {

    if (req.param('username') === undefined) {
      return res.json({status: "error", info: "Username is required."});
    }

    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: "Formation Center Name is required."});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred searching the Formation Center."});
        }

        if (!FC) {
          return res.json({status: "error", info: "No Formation Center with that name."});
        }

        Login.findOne({
          username: req.param('username'),
          formationCenter: FC.id
        }).exec(function (err, loginFounded) {

          if (err) {
            return res.json({status: "error", info: "An error has ocurred searching Login."});
          }

          if (!loginFounded) {
            return res.json({status: "error", info: "That username doesn't exist in the formation center provided."});
          }

          Login.destroy({id: loginFounded.id}).exec(function (err) {
            if (err) {
              return res.json({status: "error", info: "An error has ocurred deleting Login."});
            }
            return res.json({status: "ok", info: "Login deleted."});
          });
        });
      });
  },

  searchAllUserNames: function (req, res) {

    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: "Formation Center Name is required."});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred searching the Formation Center."});
        }

        if (!FC) {
          return res.json({status: "error", info: "No Formation Center with that name."});
        }

        Login.find({formationCenter: FC.id})
          .exec(function (err, Logins) {
            if (err) {
              return res.json({status: "error", info: "An error has ocurred searching Login."});
            }
            names = [];
            lgth = Logins.length;

            for(var i = 0; i < lgth; i++){
              names.push(Logins[i].username);
            }
            return res.json({status: "ok", data: names})
          });
      });

  }
};

