/**
 * Created by dionis on 6/28/2016.
 */

var faker = require('faker');

faker.locale = "fr"
////faker.internet.email()

module.exports = [
  {
  name: faker.internet.userName(),
  firstName:faker.name.firstName(),
  email: "inoid2007@gmail.com",
  address: faker.address.streetAddress(),
  zipCode:faker.address.zipCode(),
  city:faker.address.city(),
  phoneNumber:faker.phone.phoneNumber(),
  birthDate:faker.date.past(),
  birthCity:faker.address.city(),
  reasonOfFormation:faker.lorem.paragraph(),
  civility:"M",
  number:  faker.random.number()

},

  {
    name: faker.internet.userName(),
    firstName:faker.name.firstName(),
    email: "inoid2007@gmail.com",
    address: faker.address.streetAddress(),
    zipCode:faker.address.zipCode(),
    city:faker.address.city(),
    phoneNumber:faker.phone.phoneNumber(),
    birthDate:faker.date.past(),
    birthCity:faker.address.city(),
    reasonOfFormation:faker.lorem.paragraph(),
    civility:"M",
    number:  faker.random.number()

  },
  {
    name: faker.internet.userName(),
    firstName:faker.name.firstName(),
    email: "inoid2007@gmail.com",
    address: faker.address.streetAddress(),
    zipCode:faker.address.zipCode(),
    city:faker.address.city(),
    phoneNumber:faker.phone.phoneNumber(),
    birthDate:faker.date.past(),
    birthCity:faker.address.city(),
    reasonOfFormation:faker.lorem.paragraph(),
    civility:"M",
    number:  faker.random.number()

  },
  {
    name: faker.internet.userName(),
    firstName:faker.name.firstName(),
    email: "inoid2007@gmail.com",
    address: faker.address.streetAddress(),
    zipCode:faker.address.zipCode(),
    city:faker.address.city(),
    phoneNumber:faker.phone.phoneNumber(),
    birthDate:faker.date.past(),
    birthCity:faker.address.city(),
    reasonOfFormation:faker.lorem.paragraph(),
    civility:"M",
    number:  faker.random.number()
  }
];
