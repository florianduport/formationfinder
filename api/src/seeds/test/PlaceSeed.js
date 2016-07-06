/**
 * Created by dionis on 6/26/2016.
 */

var faker;
faker = require('faker');

faker.locale = "fr"
module.exports = [{
  name: faker.internet.userName(),

  email: faker.internet.email(),

  address: faker.address.streetAddress(),

  zipCode:faker.address.zipCode(),

  city:faker.address.city(),

  phoneNumber:faker.phone.phoneNumber(),


  isActivated: faker.random.boolean(),

  agreementNumber:faker.random.words(),

  agreementName:faker.random.words(),

},
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipCode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),

  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipCode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),


  }];


