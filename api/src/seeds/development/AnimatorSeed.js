/**
 * Created by Piterson on 19/08/2016.
 */

var faker = require('faker');

faker.locale = "fr"
module.exports = [
  {
    name: faker.internet.userName(),
    firstName: faker.internet.userName(),
    type: "BAFM",
    zipcode: faker.address.zipCode(),
    city: "Stgo"
  },
  {
    name: faker.internet.userName(),
    firstName: faker.internet.userName(),
    type: "PSY",
    zipcode: faker.address.zipCode(),
    city: "La Habana"
  },
  {
    name: faker.internet.userName(),
    firstName: faker.internet.userName(),
    type: "BAFM",
    zipcode: faker.address.zipCode(),
    city: "Palma"
  },
  {
    name: faker.internet.userName(),
    firstName: faker.internet.userName(),
    type: "BAFM",
    zipcode: faker.address.zipCode(),
    city: "Ciego"
  },
  {
    name: faker.internet.userName(),
    firstName: faker.internet.userName(),
    type: "PSY",
    zipcode: faker.address.zipCode(),
    city: "villa Clara"
  },
  {
    name: faker.internet.userName(),
    firstName: faker.internet.userName(),
    type: "PSY",
    zipcode: faker.address.zipCode(),
    city: "Camaguey"
  },
]

