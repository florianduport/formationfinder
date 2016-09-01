/**
 * Created by XPS15 on 19/08/2016.
 */


var faker;
faker = require('faker');

faker.locale = "fr"
module.exports =
  function(done) {

    var registerSize = 10;
    typeOptionArray = ['Paid', 'No']
    currenDate = new Date()
    // date: faker.date.past(),
    var faqArray = []
    for ( var iValue = 1 ; iValue <  registerSize; iValue++) {
      today = new Date ()
      faqArray.push( {
        date: new Date (today.setDate(today.getDate() - faker.random.number(30))) ,
        amount: faker.commerce.price(50, 250),
        billNumber: faker.finance.account(),
        billState: faker.random.boolean(),
      })
    }
    done(null, faqArray);

  };
