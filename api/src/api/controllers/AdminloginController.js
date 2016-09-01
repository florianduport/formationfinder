/**
 * AdminloginController
 *
 * @description :: Server-side logic for managing adminlogins
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

    var tempAdminLogin = {
      username: req.param('username'),
      password: req.param('password')
    };

    //Verify if the isActivated parameter was provided.
    if (req.param('isActivated')) {
      tmpAct = req.param('isActivated');
      if (tmpAct !== true && tmpAct !== false) {
        return res.json({status: "error", info: "Invalid isActivated attribute, only true o false options."});
      }
      else {
        tempAdminLogin.isActivated = (tmpAct === true);
      }
    }

    //Before create the adminlogin, check that there isn't other with that username.

    Adminlogin.findOne({username: tempAdminLogin.username})
      .exec(function (err, Adminloginfounded) {
        if (err) {
          return res.json({status: "error", info: "Error searching the Adminlogin."});
        }

        if (Adminloginfounded) {
          return res.json({status: "error", info: "The username already exist."});
        }

        Adminlogin.create(tempAdminLogin)
          .exec(function (err, AdminloginCreated) {
            if (err) {
              return res.json({status: "error", info: "Error creating the Adminlogin."});
            }

            if (!AdminloginCreated) {
              return res.json({status: "error", info: "Error creating the Adminlogin."});
            }
            return res.json({status: "ok", info: "Adminlogin created.", data: AdminloginCreated});
          });
      });
  },  //End of create Action.

  login: function (req, res, next) {
    //Validate parameters.
    if (req.param('username') === undefined) {
      return res.json({status: "error", info: "Username is required."});
    }

    if (req.param('password') === undefined) {
      return res.json({status: "error", info: "Password is required."});
    }

    Adminlogin.findOne({
      username: req.param('username'),
      password: req.param('password')
    }).exec(function (err, AdminloginFounded) {
      if (err) {
        return res.json({status: "error", info: "Error searching Adminlogin."});
      }

      if (!AdminloginFounded) {
        return res.json({status: "error", info: "Invalid username/password Combination."});
      }

      resulToken = LoginService.generateLoginToken(AdminloginFounded.id);

      if (resulToken.status == 'ok') {
        return res.json({status: "ok", data: resulToken.token});

      } else {
        return res.json({status: "error", info: "Error at generateLoginToken."});
      }

    }); //End of Adminlogin.findOne

  } //End of login action.

};

