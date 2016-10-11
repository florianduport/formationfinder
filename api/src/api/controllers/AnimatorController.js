/**
 * AnimatorController
 *
 * @description :: Server-side logic for managing animators
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  searchByFormationCenter: function (req, res, next) {

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

        var where = {
          formationCenter: FC.id
        };

        // If there is a type parameter
        if (req.param('type') !== undefined) {

          //And it is correct. Then use the parameter in the search criteria.
          if (req.param('type') === "PSY" || req.param('type') === "BAFM") {
            where.type = req.param('type');

            console.log("Buscando Animator por formation center y type: " + JSON.stringify(where));
          } else {
            return res.json({status: "error", info: "Invalid 'type' parameter."});
          }
        }

        Animator.find({where, sort: 'type'}).exec(function (err, Animators) {
          if (err) {
            return res.json({status: "error", info: "Error searching Animators."});
          }

          return res.json({status: "ok", data: Animators});
        });

      });

  },

  searchFormationCenterAndID: function (req, res, next) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: "Animator 'ID' parameter is required."});
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

        Animator.findOne({
            id: req.param('id'),
            formationCenter: FC.id
          })
          .exec(function (err, AnimatorFounded) {
            if (err) {
              return res.json({status: "error", info: "Error searching Animator."});
            }

            if (!AnimatorFounded) {
              return res.json({status: "error", info: "That Animator doesn't exist."});
            }

            return res.json({status: "ok", data: AnimatorFounded});
          });
      });
  },

  deleteByID: function (req, res, next) {
    if (req.param('id') === undefined) {
      return res.json({status: "error", info: "ID parameter is required."});
    }

    Animator.destroy({id: req.param('id')})
      .exec(function (err) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred deleting Animator."});
        }
        return res.json({status: "ok", info: "Animator deleted."});
      });
  },

  create: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: "Formation Center Name is required."});
    }

    if (req.param('animator') === undefined) {
      return res.json({status: "error", info: "Animator object is required."});
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred searching the Formation Center."});
        }

        if (!FC) {
          return res.json({status: "error", info: "No Formation Center with that name."});
        }

        var vAnimator = req.param('animator');

        Animator.findOne(vAnimator).exec(function (err, founded) {
          if (err) {
            return res.json({status: "error", info: "Error searching the Animator."});
          }

          if (founded) {
            return res.json({status: "error", info: "Error the Animator already exist."});
          }

          vAnimator.formationCenter = FC.id;

          Animator.create(vAnimator).exec(function (err, created) {
            if (err || !created) {
              return res.json({status: "error", info: "Error creating the Animator."});
            }

            return res.json({status: "ok", info: "Animator created.", data: created});
          })
        })
      });
  },

  update: function (req, res, next) {

    if (req.param('id') === undefined) {
      return res.json({status: "error", info: "id parameter is required."});
    }

    if (req.param('attributes') === undefined) {
      return res.json({status: "error", info: "attributes parameter is required."});
    }

    var attributes = req.param('attributes');

    //Search if there is an Animator with the new attributes.
    Animator.findOne(attributes).exec(function (err, founded) {
      if (err) {
        return res.json({status: "error", info: "Error searching Animator."});
      }

      if (founded) {
        return res.json({status: "error", info: "The Animator already exist."});
      }

      Animator.findOne({id: req.param('id')}).exec(function (err, AnimatorFounded) {
        if (err || !AnimatorFounded) {
          return res.json({status: "error", info: "Error searching Animator."});
        }

        Animator.update({id: req.param('id')}, attributes)
          .exec(function (err, AnimatorUpdated) {
            if (err) {
              return res.json({status: "error", info: "Error updating Animator."});
            }

            return res.json({status: "ok", data: AnimatorUpdated});
          });
      });
    });
  },

  //-------------------------------------------------------------------------------------
  searchByFormationCenterWithPagination: function (req, res, next) {

    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: "Formation Center Name is required."});
    }

    var page = 0;
    var len = 10;

    if (req.param('page') !== undefined) {
      if (!isNaN(parseInt(req.param('page')))) {
        page = Math.abs(parseInt(req.param('page')));
      } else {
        return res.json({err: 'The page parameter is an invalid string number'});
      }
    }

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      } else {
        return res.json({err: 'The len parameter is an invalid string number'});
      }
    }

    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: "An error has ocurred searching the Formation Center."});
        }

        if (!FC) {
          return res.json({status: "error", info: "No Formation Center with that name."});
        }

        var query = {
          where: { formationCenter: FC.id },
          skip: page * len,
          limit: len,
          sort: 'updatedAt DESC'
        };

        Animator.find(query).exec(function (err, Animators) {
          if (err) {
            return res.json({status: "error", info: "Error searching Animators."});
          }

          Animator.count({ formationCenter: FC.id }).exec(function (err, AnimatorsCounted) {
            if (err) {
              return res.json({status: "error", info: "Error counting Animators."});
            }

            return res.json({status: "ok", data: Animators, maxSize: AnimatorsCounted});

          });//Animator count.
        });//Animator find.
      }); //Formation Center findOne
  }

};

