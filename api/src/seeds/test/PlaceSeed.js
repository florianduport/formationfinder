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

  zipcode:faker.address.zipCode(),

  city:faker.address.city(),

  phoneNumber:faker.phone.phoneNumber(),


  isActivated: faker.random.boolean(),

  agreementNumber:faker.random.number(),

  agreementName:faker.random.words(),

  latitude: 47.27376285505203,
  longitude :4.848631918430328

},
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipcode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),
    latitude : 47.98452935790991,
    longitude : 4.760741293430328,
    location:{
      type: "Point",
      coordinates: [
        4.760741293430328,
        47.98452935790991
      ]
    }

  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipcode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),

    latitude: 48.090066452554424,
    longitude  :1.7543940842151642,
    location:{
      type: "Point",
      coordinates: [
        1.7543940842151642,
        48.090066452554424
      ]
    }

  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipcode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),

    latitude: 47.27376285505203,
    longitude :2.848631918430328,
    location:{
      type: "Point",
      coordinates: [
        2.848631918430328,
        47.27376285505203
      ]
    }

  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipcode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),
    latitude : 47.98452935790991,
    longitude : 3.760741293430328,
    location:{
      type: "Point",
      coordinates: [
        3.760741293430328,
        47.98452935790991
      ]
    }

  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipcode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),

    latitude: 48.090066452554424,
    longitude  :1.7543940842151642,
    location:{
      type: "Point",
      coordinates: [
        1.7543940842151642,
        48.090066452554424
      ]
    }


  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipcode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),

    latitude: 45.27376285505203,
    longitude :4.848631918430328,
    location:{
      type: "Point",
      coordinates: [
        4.848631918430328,
        45.27376285505203
      ]
    }

  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipcode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),
    latitude : 46.98452935790991,
    longitude : 4.760741293430328,
    location:{
      type: "Point",
      coordinates: [
        4.760741293430328,
        46.98452935790991
      ]
    }

  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipcode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),

    latitude: 47.090066452554424,
    longitude  :2.5543940842151642,
    location:{
      type: "Point",
      coordinates: [
        2.5543940842151642,
        47.090066452554424
      ]
    }


  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipcode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),

    latitude: 47.27376285505203,
    longitude :5.848631918430328,
    location:{
      type: "Point",
      coordinates: [
        5.848631918430328,
        47.27376285505203
      ]
    }

  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipcode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),
    latitude : 45.98452935790991,
    longitude : 2.760741293430328,
    location:{
      type: "Point",
      coordinates: [
        2.760741293430328,
        45.98452935790991
      ]
    }

  },
  {
    name: faker.internet.userName(),

    email: faker.internet.email(),

    address: faker.address.streetAddress(),

    zipcode:faker.address.zipCode(),

    city:faker.address.city(),

    phoneNumber:faker.phone.phoneNumber(),


    isActivated: faker.random.boolean(),

    agreementNumber:faker.random.words(),

    agreementName:faker.random.words(),

    latitude: 44.090066452554424,
    longitude  :3.7543940842151642,

  location:{
  type: "Point",
    coordinates: [
      3.7543940842151642,
      44.090066452554424
  ]
}


  }];


