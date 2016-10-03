/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  searchByFormationCenter: function (req, res) {

    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: "Formation Center Name is required."});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred searching formation Center."});
        }

        if (!FC) {
          return res.json({status: "error", info: "No Formation Center with that name."});
        }

        Login.find({formationCenter: FC.id}).exec(function (err, Logins) {
          if (err) {
            return res.json({status: "error", info: "An error has ocurred searching Logins."});
          }
          return res.json({status: "ok", data: Logins});
        });
      });
  },

  searchByID: function (req, res, next) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: "Login id is required."});
    }

    Login.findOne({id: req.param('id')})
      .exec(function (err, LoginFounded) {
        if (err) {
          return res.json({status: "error", info: "Error searching Login."});
        }

        if (!LoginFounded) {
          return res.json({status: "error", info: "no Login with id."});
        }

        return res.json({status: "ok", data: LoginFounded});

      });
  },

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
          //If the formation center exist, then search the login username.
          //If the username doesn't exist then create one.

          Login.findOne({
            username: req.param('username')
            //formationCenter: FC.id
          }).exec(function (err, loginFounded) {

            if (err) {
              return res.json({status: "error", info: "An error has ocurred searching the Login."});
            }

            if (loginFounded) {
              return res.json({status: "error", info: "The username already exist."});
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

  update: function (req, res) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: "Login id is required."});
    }

    //if (req.param('formationCenter') === undefined) {
    //  return res.json({status: "error", info: "Formation Center Name is required."});
    //}

    if (req.param('newCredentials') === undefined) {
      return res.json({status: "error", info: "newCredentials parameter is required."});
    }

    //FormationCenter.findOne({name: req.param('formationCenter')})
    //  .exec(function (err, FC) {
    //    if (err) {
    //      return res.json({status: "error", info: "An error has ocurred searching the Formation Center."});
    //    }
    //
    //    if (!FC) {
    //      return res.json({status: "error", info: "No Formation Center with that name."});
    //    }

        var newCredentials = req.param('newCredentials');

        //Validate that the new username doesn´t exist.
        Login.findOne({username: newCredentials.username}).exec(function (err, LoginFounded) {
          if (err) {
            return res.json({status: "error", info: "Error searching Login."});
          }

          if (LoginFounded) {
            return res.json({status: "error", info: "Error username already exist."});
          }

          Login.update({
              id: req.param('id')
              //formationCenter: FC.id
            }, newCredentials)
            .exec(function (err, updated) {
              if (err) {
                return res.json({status: "error", info: "An error has ocurred updating the Login."});
              }
              return res.json({status: "ok", info: "Login updated."});
            });
        });
      //});
  },

  check: function (req, res, next) {

    //Validate parameters.
    if (req.param('username') === undefined) {
      return res.json({status: "error", info: "Username is required."});
    }

    if (req.param('password') === undefined) {
      return res.json({status: "error", info: "Password is required."});
    }

    Login.findOne({
        username: req.param('username'),
        password: req.param('password')
      })
      .populate('formationCenter')
      .exec(function (err, loginFounded) {

        if (err) {
          return res.json({status: "error", info: "An error has ocurred searching Login."});
        }

        if (!loginFounded) {
          return res.json({status: "error", info: "Invalid username/password combination."});
        }

        resulToken = LoginService.generateLoginToken(loginFounded.id);
        if (resulToken.status == 'ok') {
          var result = {};
          result.token = resulToken.token;
          if ( typeof loginFounded.formationCenter != "undefined" ){
           result.formationCenter = loginFounded.formationCenter.name;
           return res.json({status: "ok", data: result});
          }
          else
            return res.json({status: "error", info: "Error generated at generateLoginToken."});
        } else {
          return res.json({status: "error", info: "Error generated at generateLoginToken."});
        }

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


  searchUserNamesByFormationCenter: function (req, res) {

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

            for (var i = 0; i < lgth; i++) {
              names.push(Logins[i].username);
            }
            return res.json({status: "ok", data: names})
          });
      });

  }
};

