/**
 * Created by dionis on 6/17/2016.
 */

var faker = require('faker');
// email: faker.internet.email(),
faker.locale = "fr"
module.exports = [ {
  name: faker.internet.userName(),

  firstName: faker.internet.userName(),

  email: faker.internet.email(),

  address: faker.address.streetAddress(),

  zipCode:faker.address.zipCode(),

  city:faker.address.city(),

  phoneNumber:faker.phone.phoneNumber(),


  isActivated: faker.random.boolean(),

  walletid:faker.random.words(),

  mangouserid:faker.random.words(),
  mangobankid:faker.random.words(),
  mangobankbic:faker.random.words()

},
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipCode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    walletid:faker.random.words(),

    mangouserid:faker.random.words(),
    mangobankid:faker.random.words(),
    mangobankbic:faker.random.words()

  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipCode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    walletid:faker.random.words(),

    mangouserid:faker.random.words(),
    mangobankid:faker.random.words(),
    mangobankbic:faker.random.words()

  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipCode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    walletid:faker.random.words(),

    mangouserid:faker.random.words(),
    mangobankid:faker.random.words(),
    mangobankbic:faker.random.words()

  }
];
