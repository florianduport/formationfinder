/**
 * FaqController
 *
 * @description :: Server-side logic for managing faqs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findFaq: function(req,res, next) {
    answerToSearch= ""
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

      config.question = { contains:answerToSearch}
    }


  Faq.find(config)
    .exec(function  (err, fomationCentersFounded) {
      // body...
      if(err) {
        return res.json(err);
      }

      return res.json(fomationCentersFounded);
    });

},

  countFaq: function(req,res, next) {
    answerToSearch= ""
    if (req.param('question')) {
      answerToSearch = req.param('question')
    }


    config =  {
    }

    if ( answerToSearch != "") {

      config.question = { contains:answerToSearch}
    }

    Faq.count(config)
      .exec(function  (err, fomationCentersFounded) {
        // body...
        if(err) {
          return res.json({response: "ERROR", message: sails.__("ERROR_COUNTING_FAQS")});
        }

        return res.json( {response:"OK", size: fomationCentersFounded});
      });

  }
};

