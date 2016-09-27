/**
 * TestimonyController
 *
 * @description :: Server-side logic for managing testimonies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	findAllTestimonies: function (req, res, next) {

		Testimony.find()
		.populate('customer')
		.populate('formation')
		.exec(function (err, testimonies){
			if(err){
				console.log(err);
				res.json(err);
			}

			res.json(testimonies);
		});

	},

  findTestimonies: function (req, res, next) {
    answerToSearch = ""
    if (req.param('question')) {
      answerToSearch = req.param('question')
    }
    if(!isNaN(parseInt(req.param('page')))){
      page = Math.abs(parseInt(req.param('page')));
    }
    else
    {
      return res.json({err: sails.__("ERROR_PAGE_INVALID")});
    }


    if(req.param('len') !== undefined){
      if(!isNaN(parseInt(req.param('len')))){
        len = Math.abs(parseInt(req.param('len')));
      }
      else
      {
        return res.json({err: sails.__("ERROR_LEN_INVALID")});
      }
    }
    else
    {
      return res.json({err: sails.__("ERROR_LEN_INVALID")});
    }


    config =  {
      skip: page * len,
      limit: len
    }

    if ( answerToSearch != "") {

      config.text = { contains:answerToSearch}
    }


    Testimony.find(config)
      .populate('customer')
      .populate('formation')
      .exec(function (err, testimonies){
        if(err){
          console.log(err);
          res.json(err);
        }

        res.json(testimonies);
      });

  },

  countAllTestimonies: function (req, res, next) {

    answerToSearch = ""
    if (req.param('question')) {
      answerToSearch = req.param('question')
    }

    config =  {

    }

    if ( answerToSearch != "") {

      config.text = { contains:answerToSearch}
    }

    Testimony.count(config)
      .exec(function (err, testimoniesSize){
        if(err){
          console.log(err);
          res.json(err);
        }

        return res.json( {response:"OK", size: testimoniesSize});
      });

  },

	findTestimoniesByFormation: function (req, res, next) {

		formationId = req.param('id');

		if(formationId === undefined){
			return res.json({
				err: sails.__("ID_PARAMETER_REQUIRED")
			});
		}

		where = {
			formation: formationId
		};

		Testimony.find(where)
		.populate('customer')
		.populate('formation')
		.exec(function (err, testimonies) {
			if(err){
				console.log(err);
				res.json(err);
			}

			res.json(testimonies);
		});
	},

	createTestimony: function (req, res, next) {
		// body...

		customerId = req.param('customerId');
		formationId = req.param('formationId');
		text = req.param('text');

		if(customerId === undefined || formationId === undefined || text === undefined){
			return res.json({
				err: sails.__("MISSING_DATA")
			});
		}

		Testimony.create({
			customer: customerId,
			formation: formationId,
			text: text
		}).exec(function (err, createdTestimony) {
			// body...

			if(err){
				console.log(err);
				return res.json(err);
			}

			if(createdTestimony){
				return res.json(createdTestimony);
			}
			else {
				return res.json({
							err: sails.__("ERROR_CREATING_TESTIMONY")
						});
			}
		});
	}


};

