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
      return res.json({err: 'The page parameter is an invalid string number'});
    }


    if(req.param('len') !== undefined){
      if(!isNaN(parseInt(req.param('len')))){
        len = Math.abs(parseInt(req.param('len')));
      }
      else
      {
        return res.json({err: 'The len parameter is an invalid string number'});
      }
    }
    else
    {
      return res.json({err:'The len parameter is an invalid string number'});
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
				err: 'No Id provided'
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
				err: 'Missing Data'
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
							err: 'An error has ocurred at create Testimony'
						});
			}
		});
	}


};

