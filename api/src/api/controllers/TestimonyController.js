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

