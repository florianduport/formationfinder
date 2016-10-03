/**
 * Created by dionis on 6/28/2016.
 */
var faker;
faker = require('faker');

faker.locale = "fr"
module.exports =
  function(done) {
    var registerSize = 50;

    var faqArray = []
    for ( var iValue = 1 ; iValue <  registerSize; iValue++) {
      faqArray.push( {
        text: faker.lorem.sentence(),
      })
    }
    done(null, faqArray);

  };

 /* [{
  question: faker.lorem.sentence(),

  answer: faker.lorem.paragraph(),


},
  {
    question: faker.lorem.sentence(),

    answer: faker.lorem.paragraph(),


  },
  {
    question: faker.lorem.sentence(),

    answer: faker.lorem.paragraph(),


  },
  {
    question: faker.lorem.sentence(),

    answer: faker.lorem.paragraph(),


  },
  {
    question: faker.lorem.sentence(),

    answer: faker.lorem.paragraph(),


  },
  {
    question: faker.lorem.sentence(),

    answer: faker.lorem.paragraph(),


  },
  {
    question: faker.lorem.sentence(),

    answer: faker.lorem.paragraph(),


  },
  {
    question: faker.lorem.sentence(),

    answer: faker.lorem.paragraph(),


  },{
    question: faker.lorem.sentence(),

    answer: faker.lorem.paragraph(),


  },{
    question: faker.lorem.sentence(),

    answer: faker.lorem.paragraph(),


  },{
    question: faker.lorem.sentence(),

    answer: faker.lorem.paragraph(),


  }
  ]*/;
