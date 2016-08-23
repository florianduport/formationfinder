/**
 * Created by XPS15 on 19/08/2016.
 */


var faker;
faker = require('faker');

faker.locale = "fr"
module.exports =
  function(done) {

    var registerSize = 100;
    typeOptionArray = ['Paid', 'No']
    var faqArray = []
    for ( var iValue = 1 ; iValue <  registerSize; iValue++) {
      faqArray.push( {
        date: faker.date.past(),
        amount: faker.commerce.price(50, 250),
        billNumber: faker.finance.account(),
        billState: faker.random.boolean(),
      })
    }
    done(null, faqArray);

  };
