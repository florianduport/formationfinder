/**
 * Created by XPS15 on 03/08/2016.
 */
var assert = require('assert');

const Chance = require('chance');
const Promise = require('bluebird');

const Mangopay = require('mangopay-sdk');

const chance = new Chance();


var appuser = 'inoid2016';
var apppassphrase = '7GuneTv8QdsmMxLpfm2yWi0smLPaZ1szas9YZgRd2SeyzG47tG';


const mangopayApp = appuser;
const mangopaySecret = apppassphrase;

describe('users', function () {

  //it('create a user bank account', function *(done) {
  //  try {
  //    const mangopay = new Mangopay(mangopayApp, mangopaySecret);
  //    const user = yield mangopay.User.Natural.create({
  //      Email: chance.email(),
  //      FirstName: chance.first(),
  //      LastName: chance.last(),
  //      Birthday: chance.birthday(),
  //      Nationality: 'FR',
  //      CountryOfResidence: 'FR'
  //    });
  //    yield user.BankAccount.create('IBAN', {
  //      OwnerName: user.FirstName,
  //      OwnerAddress: {
  //        AddressLine1: '20 Rue de la Santé',
  //        City: 'Rennes',
  //        PostalCode: '35000',
  //        Country: 'FR'
  //      },
  //      IBAN: "FR7618829754160173622224154",
  //      BIC: "CMBRFR2BCME",
  //      Tag: "custom tag"
  //    });
  //    return done();
  //  } catch (e) {
  //    console.error(e);
  //    return done(e);
  //  }
  //});
  //
  //it('create user', function *(done) {
  //  try {
  //    const mangopay = new Mangopay(mangopayApp, mangopaySecret);
  //    yield mangopay.User.Natural.create({
  //      Email: chance.email(),
  //      FirstName: chance.first(),
  //      LastName: chance.last(),
  //      Birthday: chance.birthday(),
  //      Nationality: 'FR',
  //      CountryOfResidence: 'FR'
  //    });
  //    return done();
  //  } catch (e) {
  //    console.error(e);
  //    return done(e);
  //  }
  //});
  //
  //it('list user transactions', function *(done) {
  //  try {
  //    const mangopay = new Mangopay(mangopayApp, mangopaySecret);
  //    const user = yield mangopay.User.Natural.create({
  //      Email: chance.email(),
  //      FirstName: chance.first(),
  //      LastName: chance.last(),
  //      Birthday: chance.birthday(),
  //      Nationality: 'FR',
  //      CountryOfResidence: 'FR'
  //    });
  //    yield user.Transaction.list({
  //      page: 1,
  //      per_page: 100
  //    });
  //    return done();
  //  } catch (e) {
  //    return done(e);
  //  }
  //});



  it('try to create a user and asociated card tarjet', function *(done) {
    try {
      const mangopay = new Mangopay(mangopayApp, mangopaySecret);
      const user = yield mangopay.User.Natural.create({
        Email: chance.email(),
        FirstName: chance.first(),
        LastName: chance.last(),
        Birthday: chance.birthday(),
        Nationality: 'FR',
        CountryOfResidence: 'FR'
      });
      try {

        cardValueEx = {
          CardNumber: '4706750000000017',
          CardExpirationDate:'0216',
          CardCvx: '435',
        };

      const carddata = yield  mangopay.CardRegistration.create({
         UserId: user.Id,
         CardNumber: cardValueEx.CardNumber,
         CardExpirationDate: cardValueEx.CardExpirationDate,
         CardCvx: cardValueEx.CardCvx,
       });

        assert.equal(true,typeof carddata != "undefined");
      } catch (e) {
        fail ( Mangopay.errors.ParamError);
        return done();
      }
      return done('Should have thrown');
    } catch (e) {
      return done(e);
    }
  });

});
