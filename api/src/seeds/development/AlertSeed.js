/**
 * Created by dionis on 8/20/2016.
 */



var faker;
faker = require('faker');

faker.locale = "fr"
module.exports =
  function(done) {
    var registerSize = 50;
    typeOptionArray = ['New_Costumer', 'Formation_Full', 'Place_Unable']
    var faqArray = []
    for ( var iValue = 1 ; iValue <  registerSize; iValue++) {
      seedDate = faker.date.future()
      faqArray.push( {
        text: faker.lorem.sentence(),
        type: typeOptionArray[faker.random.number(typeOptionArray.length)],
        date: seedDate,
        timestamp : seedDate.getTime()
      })
    }
    done(null, faqArray);

  };
