/**
 * Created by dionis on 6/26/2016.
 */

var faker;
faker = require('faker');

faker.locale = "fr"
module.exports = [{

  maxPeople: faker.random.number(),

  isConfirmed: faker.random.boolean(),

  isFull: faker.random.boolean(),

  price:faker.commerce.price(),

  agreementName:faker.random.words(),

  initdate:faker.date.past()


},
  {

    maxPeople: faker.random.number(),

    isConfirmed: faker.random.boolean(),

    isFull: faker.random.boolean(),

    price:faker.commerce.price(),

    agreementName:faker.random.words(),

    initdate:faker.date.past()


  },
  {

    maxPeople: faker.random.number(),

    isConfirmed: faker.random.boolean(),

    isFull: faker.random.boolean(),

    price:faker.commerce.price(),

    agreementName:faker.random.words(),

    initdate:faker.date.past()


  }];
