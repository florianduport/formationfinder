/**
 * AnimatorController
 *
 * @description :: Server-side logic for managing animators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  searchByFormationCenter: function (req, res, next) {

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

        var where = {
          formationCenter: FC.id
        };

        // If there is a type parameter
        if (req.param('type') !== undefined) {

          //And it is correct. Then use the parameter in the search criteria.
          if (req.param('type') === "PSY" || req.param('type') === "BAFM") {
            where.type = req.param('type');

          } else {
            return res.json({status: "error", info: sails.__("INVALID_TYPE_PARAMETER")});
          }
        }

        Animator.find({where, sort: 'type'}).exec(function (err, Animators) {
          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_ANIMATORS")});
          }

          return res.json({status: "ok", data: Animators});
        });

      });

  },

  searchFormationCenterAndID: function (req, res, next) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: sails.__("ID_PARAMETER_REQUIRED")});
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

        Animator.findOne({
            id: req.param('id'),
            formationCenter: FC.id
          })
          .exec(function (err, AnimatorFounded) {
            if (err) {
              return res.json({status: "error", info: sails.__("ERROR_SEARCHING_ANIMATOR")});
            }

            if (!AnimatorFounded) {
              return res.json({status: "error", info: sails.__("ANIMATOR_NO_FOUNDED")});
            }

            return res.json({status: "ok", data: AnimatorFounded});
          });
      });
  },

  deleteByID: function (req, res, next) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: sails.__("ID_PARAMETER_REQUIRED")});
    }

    Animator.destroy({id: req.param('id')})
      .exec(function (err) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_DELETING_ANIMATOR")});
        }
        return res.json({status: "ok", info: sails.__("ANIMATOR_DELETED")});
      });
  },

  create: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
    }

    if (req.param('animator') === undefined) {
      return res.json({status: "error", info: sails.__("ANIMATOR_PARAMETER_REQUIRED")});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FC) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        var vAnimator = req.param('animator');

        Animator.findOne(vAnimator).exec(function (err, founded) {
          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_ANIMATOR")});
          }

          if (founded) {
            return res.json({status: "error", info: sails.__("ANIMATOR_EXIST")});
          }

          vAnimator.formationCenter = FC.id;

          Animator.create(vAnimator).exec(function (err, created) {
            if (err || !created) {
              return res.json({status: "error", info: sails.__("ERROR_CREATING_ANIMATOR")});
            }

            return res.json({status: "ok", info: sails.__("ANIMATOR_CREATED"), data: created});
          })
        })
      });
  },

  update: function (req, res, next) {

    if (req.param('id') === undefined) {
      return res.json({status: "error", info: sails.__("ID_PARAMETER_REQUIRED")});
    }

    if (req.param('attributes') === undefined) {
      return res.json({status: "error", info: sails.__("ATTRIBUTE_PARAMETER_REQUIRED")});
    }

    var attributes = req.param('attributes');

    //Search if there is an Animator with the new attributes.
    Animator.findOne(attributes).exec(function (err, founded) {
      if (err) {
        return res.json({status: "error", info: sails.__("ERROR_SEARCHING_ANIMATOR")});
      }

      if (founded) {
        return res.json({status: "error", info: sails.__("ANIMATOR_EXIST")});
      }

      Animator.findOne({id: req.param('id')}).exec(function (err, AnimatorFounded) {
        if (err || !AnimatorFounded) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_ANIMATOR")});
        }

        Animator.update({id: req.param('id')}, attributes)
          .exec(function (err, AnimatorUpdated) {
            if (err) {
              return res.json({status: "error", info: sails.__("ERROR_UPDATING_ANIMATOR")});
            }

            return res.json({status: "ok", data: AnimatorUpdated});
          });
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
        return res.json({err: sails.__("ERROR_PAGE_INVALID")});
      }
    }

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      } else {
        return res.json({err: sails.__("ERROR_LEN_INVALID")});
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
          where: { formationCenter: FC.id },
          skip: page * len,
          limit: len,
          sort: 'updatedAt DESC'
        };

        Animator.find(query).exec(function (err, Animators) {
          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_ANIMATORS")});
          }

          Animator.count({ formationCenter: FC.id }).exec(function (err, AnimatorsCounted) {
            if (err) {
              return res.json({status: "error", info: sails.__("ERROR_COUNTING_ANIMATORS")});
            }

            return res.json({status: "ok", data: Animators, maxSize: AnimatorsCounted});

          });//Animator count.
        });//Animator find.
      }); //Formation Center findOne
  }

};

