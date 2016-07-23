/**
 * FaqController
 *
 * @description :: Server-side logic for managing faqs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  countFaq: function(req,res, next) {
    Faq.count().exec(function countFaq(error, found) {
       if (error) {

         return  res.json({"res": error});
       }

         console.log('There are ' + found + ' Faq');

         return  res.json({"res":"OK", "size": found})


      // There are 1 users called 'Flynn'
      // Don't forget to handle your errors
    });
  },
  findFaq: function(req,res, next) {
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

  Faq.find({
      skip: page * len,
      limit: len
    })
    .exec(function  (err, fomationCentersFounded) {
      // body...
      if(err) {
        return res.json(err);
      }

      return res.json(fomationCentersFounded);
    });

}
};

