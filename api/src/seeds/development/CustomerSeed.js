/**
 * Created by dionis on 6/28/2016.
 */

var faker = require('faker');
// email: "inoid2007@gmail.com",
// email: faker.internet.email(),
//"inoid2007@gmail.com"
faker.locale = "fr"
module.exports = [
  {
    name: faker.name.lastName(),
    firstName: faker.name.firstName(),
    email: "juan.piterson85@gmail.com",
    address: faker.address.streetAddress(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    phoneNumber: faker.phone.phoneNumber(),
    birthDate: faker.date.past(),
    birthCity: faker.address.city(),
    reasonOfFormation: faker.lorem.paragraph(),
    civility: "M",
    emailsend: 0,
    driverLicence: {
      "number": faker.random.number({max:999999999999, min:100000000000}).toString(),
      "placeOfDeliverance": faker.address.city(),
      "dateOfDeliverance": "2016-10-06T05:00:00.000Z",
      "dateOfProcuration": "2016-10-14T05:00:00.000Z"
    }

  },

  {
    name: faker.name.lastName(),
    firstName: faker.name.firstName(),
    email: "juan.piterson85@gmail.com",
    address: faker.address.streetAddress(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    phoneNumber: faker.phone.phoneNumber(),
    birthDate: faker.date.past(),
    birthCity: faker.address.city(),
    reasonOfFormation: faker.lorem.paragraph(),
    civility: "M",
    emailsend: 0,
    driverLicence: {
      "number": faker.random.number({max:999999999999, min:100000000000}).toString(),
      "placeOfDeliverance": faker.address.city(),
      "dateOfDeliverance": "2016-10-06T05:00:00.000Z",
      "dateOfProcuration": "2016-10-14T05:00:00.000Z"
    }

  },
  {
    name: faker.name.lastName(),
    firstName: faker.name.firstName(),
    email: "juan.piterson85@gmail.com",
    address: faker.address.streetAddress(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    phoneNumber: faker.phone.phoneNumber(),
    birthDate: faker.date.past(),
    birthCity: faker.address.city(),
    reasonOfFormation: faker.lorem.paragraph(),
    civility: "M",
    emailsend: 0,
    driverLicence: {
      "number": faker.random.number({max:999999999999, min:100000000000}).toString(),
      "placeOfDeliverance": faker.address.city(),
      "dateOfDeliverance": "2016-10-06T05:00:00.000Z",
      "dateOfProcuration": "2016-10-14T05:00:00.000Z"
    }

  },
  {
    name: faker.name.lastName(),
    firstName: faker.name.firstName(),
    email: "juan.piterson85@gmail.com",
    address: faker.address.streetAddress(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    phoneNumber: faker.phone.phoneNumber(),
    birthDate: faker.date.past(),
    birthCity: faker.address.city(),
    reasonOfFormation: faker.lorem.paragraph(),
    civility: "M",
    emailsend: 0,
    driverLicence: {
      "number": faker.random.number({max:999999999999, min:100000000000}).toString(),
      "placeOfDeliverance": faker.address.city(),
      "dateOfDeliverance": "2016-10-06T05:00:00.000Z",
      "dateOfProcuration": "2016-10-14T05:00:00.000Z"
    }
  }
];
