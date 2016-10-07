/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  searchByFormationCenter: function (req, res) {

    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FC) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        Login.find({formationCenter: FC.id}).exec(function (err, Logins) {
          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
          }
          return res.json({status: "ok", data: Logins});
        });
      });
  },

  searchByID: function (req, res, next) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: sails.__("LOGIN_ID_REQUIRED")});
    }

    Login.findOne({id: req.param('id')})
      .exec(function (err, LoginFounded) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
        }

        if (!LoginFounded) {
          return res.json({status: "error", info: sails.__("LOGIN_NO_FOUNDED")});
        }

        return res.json({status: "ok", data: LoginFounded});

      });
  },

  create: function (req, res, next) {

    //Validate parameters.
    if (req.param('username') === undefined) {
      return res.json({status: "error", info: sails.__("USERNAME_REQUIRED")});
    }

    if (req.param('password') === undefined) {
      return res.json({status: "error", info: sails.__("PASSWORD_REQUIRED")});
    }

    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
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
        return res.json({status: "error", info: sails.__("INVALID_ISMAINLOGIN")});
      }
      else {
        cLogin.isMainLogin = (tmpML === true);
      }
    }

    if (req.param('isActivated')) {
      tmpAct = req.param('isActivated');
      if (tmpAct !== true && tmpAct !== false) {
        return res.json({status: "error", info: sails.__("INVALID_ISACTIVATED")});
      }
      else {
        cLogin.isActivated = (tmpAct === true);
      }
    }

    //Verify if the formation center provided exist.
    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (FC) {
          //If the formation center exist, then search the login username.
          //If the username doesn't exist then create one.

          Login.findOne({
            username: req.param('username')
            //formationCenter: FC.id
          }).exec(function (err, loginFounded) {

            if (err) {
              return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
            }

            if (loginFounded) {
              return res.json({status: "error", info: sails.__("USERNAME_IN_USE")});
            }
            else {
              //Create the Login.
              cLogin.formationCenter = FC.id;
              Login.create(cLogin)
                .exec(function (err, logincreated) {
                  if (err || !logincreated) {
                    return res.json({status: "error", info: sails.__("ERROR_CREATING_CREDENTIAL")});
                  }

                  return res.json({status: "ok", info: sails.__("LOGIN_CREATED"), data: logincreated});
                });
            }

          });
        }
        else {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

      });
  },

  update: function (req, res) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: sails.__("USERNAME_REQUIRED")});
    }

    if (req.param('newCredentials') === undefined) {
      return res.json({status: "error", info: sails.__("NEWCREDENTIALS_REQUIRED")});
    }

    var newCredentials = req.param('newCredentials');

    //Validate that the new username doesn´t exist.
    Login.findOne({username: newCredentials.username}).exec(function (err, LoginFounded) {
      if (err) {
        return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
      }

      if (LoginFounded) {
        return res.json({status: "error", info: sails.__("USERNAME_IN_USE")});
      }

      Login.update({
          id: req.param('id')
          //formationCenter: FC.id
        }, newCredentials)
        .exec(function (err, updated) {
          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_UPDATING_CREDENTIAL")});
          }
          return res.json({status: "ok", info: sails.__("CREDENTIAL_UPDATED")});
        });
    });
  },

  check: function (req, res, next) {

    //Validate parameters.
    if (req.param('username') === undefined) {
      return res.json({status: "error", info: sails.__("USERNAME_REQUIRED")});
    }

    if (req.param('password') === undefined) {
      return res.json({status: "error", info: sails.__("PASSWORD_REQUIRED")});
    }


    Login.native(function (err, collection) {
      if (err) return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});

      collection.find({
          username: req.param('username'),
          password: req.param('password')
        })
        .toArray(function (err, loginFoundedArray) {

          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
          }

          if (!loginFoundedArray || loginFoundedArray.length === 0) {
            return res.json({status: "error", info: sails.__("INVALID_USERNAME_PASSWORD")});
          }

          if (loginFoundedArray[0].isActivated === false) {
            return res.json({status: "error", info: sails.__("INVALID_USERNAME_PASSWORD")});
          }

          //If a get here, the authentication process is ok.
          //Now search the login with populate formationCenter.
          Login.findOne({
              id: loginFoundedArray[0]._id
            })
            .populate('formationCenter')
            .exec(function (err, loginFounded) {

              if (err) {
                return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
              }

              resulToken = LoginService.generateLoginToken(loginFounded.id);
              if (resulToken.status == 'ok') {
                var result = {};
                result.token = resulToken.token;
                if (typeof loginFounded.formationCenter != "undefined") {
                  result.formationCenter = loginFounded.formationCenter.name;
                  result.username = loginFounded.username;
                  result.isMainLogin = loginFounded.isMainLogin;

                  return res.json({status: "ok", data: result});
                }
                else
                  return res.json({status: "error", info: sails.__("GENERATE_LOGIN_TOKEN_ERROR")});
              } else {
                return res.json({status: "error", info: sails.__("GENERATE_LOGIN_TOKEN_ERROR")});
              }

            });

          //
          //
          //
          //
          //
          //
          //  resulToken = LoginService.generateLoginToken(loginFoundedArray[0]._id);
          //
          //if (resulToken.status == 'ok') {
          //  var result = {};
          //  result.token = resulToken.token;
          //  if (typeof loginFoundedArray[0].formationCenter != "undefined") {
          //    result.formationCenter = loginFoundedArray[0].formationCenter.name;
          //    result.username = loginFoundedArray[0].username;
          //    result.isMainLogin = loginFoundedArray[0].isMainLogin;
          //
          //    return res.json({status: "ok", data: result});
          //  }
          //  else
          //    return res.json({status: "error", info: sails.__("GENERATE_LOGIN_TOKEN_ERROR")});
          //} else {
          //  return res.json({status: "error", info: sails.__("GENERATE_LOGIN_TOKEN_ERROR")});
          //}

        });
    });

    //Login.findOne({
    //    username: req.param('username'),
    //    password: req.param('password')
    //  })
    //  .populate('formationCenter')
    //  .exec(function (err, loginFounded) {
    //
    //    if (err) {
    //      return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
    //    }
    //
    //    if (!loginFounded) {
    //      return res.json({status: "error", info: sails.__("INVALID_USERNAME_PASSWORD")});
    //    }
    //
    //    if (loginFounded.isActivated === false) {
    //      return res.json({status: "error", info: sails.__("INVALID_USERNAME_PASSWORD")});
    //    }
    //
    //    resulToken = LoginService.generateLoginToken(loginFounded.id);
    //    if (resulToken.status == 'ok') {
    //      var result = {};
    //      result.token = resulToken.token;
    //      if (typeof loginFounded.formationCenter != "undefined") {
    //        result.formationCenter = loginFounded.formationCenter.name;
    //        result.username = loginFounded.username;
    //        result.isMainLogin = loginFounded.isMainLogin;
    //
    //        return res.json({status: "ok", data: result});
    //      }
    //      else
    //        return res.json({status: "error", info: sails.__("GENERATE_LOGIN_TOKEN_ERROR")});
    //    } else {
    //      return res.json({status: "error", info: sails.__("GENERATE_LOGIN_TOKEN_ERROR")});
    //    }
    //
    //  });
  },

  verify: function (req, res) {
    token = req.param('token');

    decoded = LoginService.verifyLoginToken(token);

    return res.json(decoded);

  },

  delete: function (req, res) {

    if (req.param('username') === undefined) {
      return res.json({status: "error", info: sails.__("USERNAME_REQUIRED")});
    }

    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FC) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        Login.findOne({
          username: req.param('username'),
          formationCenter: FC.id
        }).exec(function (err, loginFounded) {

          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
          }

          if (!loginFounded) {
            return res.json({status: "error", info: sails.__("LOGIN_NO_FOUNDED")});
          }

          Login.destroy({id: loginFounded.id}).exec(function (err) {
            if (err) {
              return res.json({status: "error", info: sails.__("ERROR_DELETING_CREDENTIAL")});
            }
            return res.json({status: "ok", info: sails.__("CREDENTIAL_DELETED")});
          });
        });
      });
  },


  searchUserNamesByFormationCenter: function (req, res) {

    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FC) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        Login.find({formationCenter: FC.id})
          .exec(function (err, Logins) {
            if (err) {
              return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
            }
            names = [];
            lgth = Logins.length;

            for (var i = 0; i < lgth; i++) {
              names.push(Logins[i].username);
            }
            return res.json({status: "ok", data: names})
          });
      });

  },

  //-------------------------------------------------------------------------------------
  searchByFormationCenterWithPagination: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
    }

    var page = 0;
    var len = 10;

    if (req.param('page') !== undefined) {
      if (!isNaN(parseInt(req.param('page')))) {
        page = Math.abs(parseInt(req.param('page')));
      } else {
        return res.json({err: sails.__("INVALID_PAGE_PARAMETER")});
      }
    }

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      } else {
        return res.json({err: sails.__("INVALID_LEN_PARAMETER")});
      }
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FC) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        var query = {
          where: {formationCenter: FC.id},
          skip: page * len,
          limit: len,
          sort: 'updatedAt DESC'
        };

        Login.find(query).exec(function (err, Logins) {
          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_LOGIN")});
          }

          Login.count({formationCenter: FC.id}).exec(function (err, LoginsCounted) {
            if (err) {
              return res.json({status: "error", info: sails.__("ERROR_COUNTING_CREDENTIALS")});
            }

            return res.json({status: "ok", data: Logins, maxSize: LoginsCounted});

          });//Login count.
        });//Login find.
      });//Formation Center findOne.
  }
};

