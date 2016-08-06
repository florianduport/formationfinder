/**
 * Created by XPS15 on 28/07/2016.
 */


describe('PayServices', function() {
  request = require('supertest'),
    assert = require('assert');
  moment  = require("moment")
  var walletid = ""
  var formationcentername = ""

  testPayVariablesBuyer = {}
  testPayVariablesSeller = {}
  describe('#Payment makepayment()', function () {
   it('Create Mangopay user legal for Formation Center', function (done) {
      // var app = sails();
     var legalUserData =  {
       Tag: "custom meta",
       HeadquartersAddress: {
         AddressLine1: "1 Mangopay Street",
         AddressLine2: "The Loop",
         City: "Paris",
         Region: "Ile de France",
         PostalCode: "75001",
         Country: "FR"
       },
       LegalPersonType: "BUSINESS",
       Name: "Mangopay Ltd",
       LegalRepresentativeAddress: {
         AddressLine1: "1 Mangopay Street",
         AddressLine2: "The Loop",
         City: "Paris",
         Region: "Ile de France",
         PostalCode: "75001",
         Country: "FR"
       },
       LegalRepresentativeBirthday: 1463496101,
       LegalRepresentativeCountryOfResidence: "ES",
       LegalRepresentativeNationality: "FR",
       LegalRepresentativeEmail: "support@mangopay.com",
       LegalRepresentativeFirstName: "Joe",
       LegalRepresentativeLastName: "Blogs",
       Email: "support@mangopay.com"
     }

      config  = { currency:"EUR"}
      PaymentService.createwallet( config,legalUserData,   // var CustomerServices = require('../../api/services/CustomerService')
        function resultServices ( err, result ) {
          //console.log(result)
          console.log("ERROR: ", result.message)
          assert.equal("OK", result.response )

          assert.equal(true,  typeof result.wallet != "undefined" )
          assert.equal(true,  typeof result.user != "undefined" )

          testPayVariablesSeller.wallet =  result.wallet
          testPayVariablesSeller.user = result.user
          done();
        });
    });

    it('Create Mangopay user natural user ', function (done) {
      // var app = sails();
      var naturalUserData = {
        FirstName: "Dionis", // Required
        LastName: "HugoSI",    // Required
        Birthday:  moment('300680', 'DDMMYY').unix(),  // Required,  // Required
        Nationality: "FR", // Required, default: 'FR'
        CountryOfResidence: "FR", // Required, default: 'FR'
        Address: {
          AddressLine1: "1 Mangopay Street",
          AddressLine2: "The Loop",
          City: "Paris",
          Region: "Ile de France",
          PostalCode: "75001",
          Country: "FR"

        },
        Occupation: "Writer",
        IncomeRange: "6",
        ProofOfIdentity: null,
        ProofOfAddress: null,
        PersonType: "NATURAL",
        Email: "victor@hugo.com",
        Tag: "custom tag"

      }

      //Blog workflow
      //var naturalUserData = {
      //  Email: "ada.lovelace@gmail.com",
      //  FirstName: "Ada",
      //  LastName: "Lovelace",
      //  Address: "C/ Larios, 1, 29015, Málaga",
      //  Birthday: 1300186358,
      //  Nationality: "ES",
      //  CountryOfResidence: "ES"
      //}
      config  = { currency:"EUR"}
      PaymentService.createNaturalWallet( config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
        function resultServices ( err, result ) {
          if (err) done(err)
          console.log(result)
          assert.equal("OK", result.response )
          assert.equal(true,  typeof result.wallet != "undefined" )
          assert.equal(true,  typeof result.user != "undefined" )
          done();
        });
    });

    it('Create Mangopay user natural user and register back account target To seller', function (done) {
      // var app = sails();
      var naturalUserData = {
        FirstName: "Dionis", // Required
        LastName: "HugoSI",    // Required
        Birthday:  moment('300680', 'DDMMYY').unix(),  // Required,  // Required
        Nationality: "FR", // Required, default: 'FR'
        CountryOfResidence: "FR", // Required, default: 'FR'
        Address: {
          AddressLine1: "1 Mangopay Street",
          AddressLine2: "The Loop",
          City: "Paris",
          Region: "Ile de France",
          PostalCode: "75001",
          Country: "FR"

        },
        Occupation: "Writer",
        IncomeRange: "6",
        ProofOfIdentity: null,
        ProofOfAddress: null,
        PersonType: "NATURAL",
        Email: "victor@hugo.com",
        Tag: "custom tag"

      }

      //Blog workflow
      //var naturalUserData = {
      //  Email: "ada.lovelace@gmail.com",
      //  FirstName: "Ada",
      //  LastName: "Lovelace",
      //  Address: "C/ Larios, 1, 29015, Málaga",
      //  Birthday: 1300186358,
      //  Nationality: "ES",
      //  CountryOfResidence: "ES"
      //}
      config = {currency: "ES"}
      PaymentService.createNaturalWallet(config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
        function resultServices(err, result) {
          if (err) done(err)
          console.log(result)
          assert.equal("OK", result.response)
          assert.equal(true, typeof result.wallet != "undefined")
          assert.equal(true, typeof result.user != "undefined")

          testPayVariablesBuyer.wallet = testPayVariablesSeller.wallet
          testPayVariablesBuyer.user = testPayVariablesSeller.user


          //backCountData = {
          //  ownername: "Simone de Beauvoir",
          //  type: "IBAN",
          //  ownerAddress: "Gran Vía, Madrid",
          //  iban: "FR3020041010124530725S03383",
          //  bic: "CRLYFRPP"
          //}


          backCountData =   {
            Id: "8494514",
            Tag: "custom meta",
            Type: "IBAN",
            OwnerAddress: {
            AddressLine1: "1 Mangopay Street",
              AddressLine2: "The Loop",
              City: "Paris",
              Region: "Ile de France",
              PostalCode: "75001",
              Country: "FR"
          },
            OwnerName: "Joe Blogs",
            UserId: "8494514",
            Active: true,
            IBAN: "FR3020041010124530725S03383",
            BIC: "CRLYFRPP"
          }
          backCountData.Id = result.user
          backCountData.UserId = result.user
          PaymentService.createBankCount(backCountData, result.user,  // var CustomerServices = require('../../api/services/CustomerService')
            function resultServices(err, result) {
              if (err) done(err)
              assert.equal("OK", result.response)
              assert.equal(true, typeof result.bankcount != "undefined")

              testPayVariablesSeller.bankcount = result.bankcount
              done();
            })
        });
    });
   // it('Create Mangopay user natural user and register back count target IBAN ', function (done) {
   //     // var app = sails();
   //     var naturalUserData = {
   //       FirstName: "Dionis", // Required
   //       LastName: "HugoSId",    // Required
   //       Birthday:  moment('300680', 'DDMMYY').unix(),  // Required,  // Required
   //       Nationality: "FR", // Required, default: 'FR'
   //       CountryOfResidence: "FR", // Required, default: 'FR'
   //       Address: {
   //         AddressLine1: "1 Mangopay Street",
   //         AddressLine2: "The Loop",
   //         City: "Paris",
   //         Region: "Ile de France",
   //         PostalCode: "75001",
   //         Country: "FR"
   //
   //       },
   //       Occupation: "Writer",
   //       IncomeRange: "6",
   //       ProofOfIdentity: null,
   //       ProofOfAddress: null,
   //       PersonType: "NATURAL",
   //       Email: "victor@hugo.com",
   //       Tag: "custom tag"
   //
   //     }
   //
   //     //Blog workflow
   //     //var naturalUserData = {
   //     //  Email: "ada.lovelace@gmail.com",
   //     //  FirstName: "Ada",
   //     //  LastName: "Lovelace",
   //     //  Address: "C/ Larios, 1, 29015, Málaga",
   //     //  Birthday: 1300186358,
   //     //  Nationality: "ES",
   //     //  CountryOfResidence: "ES"
   //     //}
   //     config  = { currency:"ES"}
   //     PaymentService.createNaturalWallet( config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
   //       function resultServices ( err, result ) {
   //         if (err) done(err)
   //         console.log(result)
   //         assert.equal("OK", result.response )
   //         assert.equal(true,  typeof result.wallet != "undefined" )
   //         assert.equal(true,  typeof result.user != "undefined" )
   //
   //         testPayVariablesBuyer.wallet = result.wallet
   //         testPayVariablesBuyer.user = result.user
   //
   //
   //         //backCountData = {
   //         //  ownername: "Simone de Beauvoir",
   //         //  type: "IBAN",
   //         //  ownerAddress: "Gran Vía, Madrid",
   //         //  iban: "FR3020041010124530725S03383",
   //         //  bic: "CRLYFRPP"
   //         //}
   //
   //         backCountData =   {
   //           Id: "8494514",
   //           Tag: "custom meta",
   //           Type: "US",
   //           OwnerAddress: {
   //             AddressLine1: "1 Mangopay Street",
   //             AddressLine2: "The Loop",
   //             City: "Paris",
   //             Region: "Ile de France",
   //             PostalCode: "75001",
   //             Country: "FR"
   //           },
   //           OwnerName: "Joe Blogs",
   //           AccountNumber: "11696419",
   //           ABA: "071000288",
   //           "DepositAccountType": "CHECKING"
   //         }
   //         backCountData.Id = result.user
   //         backCountData.UserId = result.user
   //
   //         PaymentService.createBankCount( backCountData, result.user,  // var CustomerServices = require('../../api/services/CustomerService')
   //           function resultServices ( err, result ) {
   //             if (err) fail(err)
   //             assert.equal("OK", result.response )
   //             assert.equal(true,  typeof result.bankcount != "undefined" )
   //
   //             testPayVariablesBuyer.bankcount = result.bankcount
   //             done();
   //           })
   //       });
   // });
   //
   // it('Create Mangopay user natural user and register back count target US ', function (done) {
   //   // var app = sails();
   //   var naturalUserData = {
   //     FirstName: "Dionisss", // Required
   //     LastName: "HugoSId",    // Required
   //     Birthday:   moment('300680', 'DDMMYY').unix(),  // Required,  // Required
   //     Nationality: "FR", // Required, default: 'FR'
   //     CountryOfResidence: "FR", // Required, default: 'FR'
   //     Address: {
   //       AddressLine1: "1 Mangopay Street",
   //       AddressLine2: "The Loop",
   //       City: "Paris",
   //       Region: "Ile de France",
   //       PostalCode: "75001",
   //       Country: "FR"
   //
   //     },
   //     Occupation: "Writer",
   //     IncomeRange: "6",
   //     ProofOfIdentity: null,
   //     ProofOfAddress: null,
   //     PersonType: "NATURAL",
   //     Email: "victor@hugo.com",
   //     Tag: "custom tag"
   //
   //   }
   //
   //   //Blog workflow
   //   //var naturalUserData = {
   //   //  Email: "ada.lovelace@gmail.com",
   //   //  FirstName: "Ada",
   //   //  LastName: "Lovelace",
   //   //  Address: "C/ Larios, 1, 29015, Málaga",
   //   //  Birthday: 1300186358,
   //   //  Nationality: "ES",
   //   //  CountryOfResidence: "ES"
   //   //}
   //   config  = { currency:"ES"}
   //   PaymentService.createNaturalWallet( config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
   //     function resultServices ( err, result ) {
   //       if (err) done(err)
   //       console.log(result)
   //       assert.equal("OK", result.response )
   //       assert.equal(true,  typeof result.wallet != "undefined" )
   //       assert.equal(true,  typeof result.user != "undefined" )
   //
   //       testPayVariablesBuyer.wallet = result.wallet
   //       testPayVariablesBuyer.user = result.user
   //
   //
   //       //backCountData = {
   //       //  ownername: "Simone de Beauvoir",
   //       //  type: "IBAN",
   //       //  ownerAddress: "Gran Vía, Madrid",
   //       //  iban: "FR3020041010124530725S03383",
   //       //  bic: "CRLYFRPP"
   //       //}
   //
   //       backCountData =   {
   //         Id: "8494514",
   //
   //         Tag: "custom meta",
   //         Type: "US",
   //         OwnerAddress: {
   //           AddressLine1: "1 Mangopay Street",
   //           AddressLine2: "The Loop",
   //           City: "Paris",
   //           Region: "Ile de France",
   //           PostalCode: "75001",
   //           Country: "FR"
   //         },
   //         OwnerName: "Joe Blogs",
   //         AccountNumber: "11696419",
   //         ABA: "071000288",
   //         "DepositAccountType": "CHECKING"
   //       }
   //       backCountData.Id = result.user
   //       backCountData.UserId = result.user
   //
   //       PaymentService.createBankCount( backCountData, result.user,  // var CustomerServices = require('../../api/services/CustomerService')
   //         function resultServices ( err, result ) {
   //           if (err) fail(err)
   //           assert.equal("OK", result.response )
   //           assert.equal(true,  typeof result.bankcount != "undefined" )
   //
   //           testPayVariablesBuyer.bankcount = result.bankcount
   //           done();
   //         })
   //     });
   // });
   //
   // it('Create Mangopay user natural user and register back count target IBAN ', function (done) {
   //   // var app = sails();
   //   var naturalUserData = {
   //     FirstName: "Diovbnis", // Required
   //     LastName: "HugoSI",    // Required
   //     Birthday:  moment('300680', 'DDMMYY').unix(),  // Required,  // Required
   //     Nationality: "FR", // Required, default: 'FR'
   //     CountryOfResidence: "FR", // Required, default: 'FR'
   //     Address: {
   //       AddressLine1: "1 Mangopay Street",
   //       AddressLine2: "The Loop",
   //       City: "Paris",
   //       Region: "Ile de France",
   //       PostalCode: "75001",
   //       Country: "FR"
   //
   //     },
   //     Occupation: "Writer",
   //     IncomeRange: "6",
   //     ProofOfIdentity: null,
   //     ProofOfAddress: null,
   //     PersonType: "NATURAL",
   //     Email: "victor@hugo.com",
   //     Tag: "custom tag"
   //
   //   }
   //
   //   //Blog workflow
   //   //var naturalUserData = {
   //   //  Email: "ada.lovelace@gmail.com",
   //   //  FirstName: "Ada",
   //   //  LastName: "Lovelace",
   //   //  Address: "C/ Larios, 1, 29015, Málaga",
   //   //  Birthday: 1300186358,
   //   //  Nationality: "ES",
   //   //  CountryOfResidence: "ES"
   //   //}
   //   config  = { currency:"ES"}
   //   PaymentService.createNaturalWallet( config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
   //     function resultServices ( err, result ) {
   //       if (err) done(err)
   //       console.log(result)
   //       assert.equal("OK", result.response )
   //       assert.equal(true,  typeof result.wallet != "undefined" )
   //       assert.equal(true,  typeof result.user != "undefined" )
   //
   //       testPayVariablesBuyer.wallet = result.wallet
   //       testPayVariablesBuyer.user = result.user
   //
   //
   //       //backCountData = {
   //       //  ownername: "Simone de Beauvoir",
   //       //  type: "IBAN",
   //       //  ownerAddress: "Gran Vía, Madrid",
   //       //  iban: "FR3020041010124530725S03383",
   //       //  bic: "CRLYFRPP"
   //       //}
   //
   //       backCountData =   {
   //         Id: "8494514",
   //
   //         Tag: "custom meta",
   //         Type: "IBAN",
   //         OwnerAddress: {
   //           AddressLine1: "1 Mangopay Street",
   //           AddressLine2: "The Loop",
   //           City: "Paris",
   //           Region: "Ile de France",
   //           PostalCode: "75001",
   //           Country: "FR"
   //         },
   //         OwnerName: "Joe Blogs",
   //         UserId: "8494514",
   //         Active: true,
   //         IBAN: "FR3020041010124530725S03383",
   //         BIC: "CRLYFRPP"
   //       }
   //       backCountData.Id = result.user
   //       backCountData.UserId = result.user
   //
   //       PaymentService.createBankCount( backCountData, result.user,  // var CustomerServices = require('../../api/services/CustomerService')
   //         function resultServices ( err, result ) {
   //           if (err) fail(err)
   //           assert.equal("OK", result.response )
   //           assert.equal(true,  typeof result.bankcount != "undefined" )
   //
   //           testPayVariablesBuyer.bankcount = result.bankcount
   //           done();
   //         })
   //     });
   // });
   ////
   // it('Create Mangopay user natural user and register back count target CA ', function (done) {
   //   // var app = sails();
   //   var naturalUserData = {
   //     FirstName: "Diovbnis", // Required
   //     LastName: "HugoSI",    // Required
   //     Birthday:  moment('300680', 'DDMMYY').unix(),  // Required,  // Required
   //     Nationality: "FR", // Required, default: 'FR'
   //     CountryOfResidence: "FR", // Required, default: 'FR'
   //     Address: {
   //       AddressLine1: "1 Mangopay Street",
   //       AddressLine2: "The Loop",
   //       City: "Paris",
   //       Region: "Ile de France",
   //       PostalCode: "75001",
   //       Country: "FR"
   //
   //     },
   //     Occupation: "Writer",
   //     IncomeRange: "6",
   //     ProofOfIdentity: null,
   //     ProofOfAddress: null,
   //     PersonType: "NATURAL",
   //     Email: "victor@hugo.com",
   //     Tag: "custom tag"
   //
   //   }
   //
   //   //Blog workflow
   //   //var naturalUserData = {
   //   //  Email: "ada.lovelace@gmail.com",
   //   //  FirstName: "Ada",
   //   //  LastName: "Lovelace",
   //   //  Address: "C/ Larios, 1, 29015, Málaga",
   //   //  Birthday: 1300186358,
   //   //  Nationality: "ES",
   //   //  CountryOfResidence: "ES"
   //   //}
   //   config  = { currency:"ES"}
   //   PaymentService.createNaturalWallet( config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
   //     function resultServices ( err, result ) {
   //       if (err) done(err)
   //       console.log(result)
   //       assert.equal("OK", result.response )
   //       assert.equal(true,  typeof result.wallet != "undefined" )
   //       assert.equal(true,  typeof result.user != "undefined" )
   //
   //       testPayVariablesBuyer.wallet = result.wallet
   //       testPayVariablesBuyer.user = result.user
   //
   //
   //       //backCountData = {
   //       //  ownername: "Simone de Beauvoir",
   //       //  type: "IBAN",
   //       //  ownerAddress: "Gran Vía, Madrid",
   //       //  iban: "FR3020041010124530725S03383",
   //       //  bic: "CRLYFRPP"
   //       //}
   //
   //       backCountData =   {
   //         Id: "8494514",
   //
   //         Tag: "custom meta",
   //         Type: "CA",
   //         OwnerAddress: {
   //           AddressLine1: "1 Mangopay Street",
   //           AddressLine2: "The Loop",
   //           City: "Paris",
   //           Region: "Ile de France",
   //           PostalCode: "75001",
   //           Country: "FR"
   //         },
   //         OwnerName: "Joe Blogs",
   //         BranchCode: "00152",
   //         InstitutionNumber: "614",
   //         AccountNumber: "11696419",
   //         BankName: "The Big Bank"
   //       }
   //       backCountData.Id = result.user
   //       backCountData.UserId = result.user
   //
   //       PaymentService.createBankCount( backCountData, result.user,  // var CustomerServices = require('../../api/services/CustomerService')
   //         function resultServices ( err, result ) {
   //           if (err) fail(err)
   //           assert.equal("OK", result.response )
   //           assert.equal(true,  typeof result.bankcount != "undefined" )
   //
   //           testPayVariablesBuyer.bankcount = result.bankcount
   //           done();
   //         })
   //     });
   // });
   // //
   // //
   // it('Create Mangopay user natural user and register back count target GB ', function (done) {
   //   // var app = sails();
   //   var naturalUserData = {
   //     FirstName: "Diovvvbnis", // Required
   //     LastName: "HugvvoSI",    // Required
   //     Birthday:  moment('300680', 'DDMMYY').unix(),  // Required,  // Required
   //     Nationality: "FR", // Required, default: 'FR'
   //     CountryOfResidence: "FR", // Required, default: 'FR'
   //     Address: {
   //       AddressLine1: "1 Mangopay Street",
   //       AddressLine2: "The Loop",
   //       City: "Paris",
   //       Region: "Ile de France",
   //       PostalCode: "75001",
   //       Country: "FR"
   //
   //     },
   //     Occupation: "Writer",
   //     IncomeRange: "6",
   //     ProofOfIdentity: null,
   //     ProofOfAddress: null,
   //     PersonType: "NATURAL",
   //     Email: "victor@hugo.com",
   //     Tag: "custom tag"
   //
   //   }
   //
   //   //Blog workflow
   //   //var naturalUserData = {
   //   //  Email: "ada.lovelace@gmail.com",
   //   //  FirstName: "Ada",
   //   //  LastName: "Lovelace",
   //   //  Address: "C/ Larios, 1, 29015, Málaga",
   //   //  Birthday: 1300186358,
   //   //  Nationality: "ES",
   //   //  CountryOfResidence: "ES"
   //   //}
   //   config  = { currency:"ES"}
   //   PaymentService.createNaturalWallet( config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
   //     function resultServices ( err, result ) {
   //       if (err) done(err)
   //       console.log(result)
   //       assert.equal("OK", result.response )
   //       assert.equal(true,  typeof result.wallet != "undefined" )
   //       assert.equal(true,  typeof result.user != "undefined" )
   //
   //       testPayVariablesBuyer.wallet = result.wallet
   //       testPayVariablesBuyer.user = result.user
   //
   //
   //       //backCountData = {
   //       //  ownername: "Simone de Beauvoir",
   //       //  type: "IBAN",
   //       //  ownerAddress: "Gran Vía, Madrid",
   //       //  iban: "FR3020041010124530725S03383",
   //       //  bic: "CRLYFRPP"
   //       //}
   //
   //       backCountData =   {
   //         Id: "8494514",
   //
   //         Tag: "custom meta",
   //         Type: "GB",
   //         OwnerAddress: {
   //           AddressLine1: "1 Mangopay Street",
   //           AddressLine2: "The Loop",
   //           City: "Paris",
   //           Region: "Ile de France",
   //           PostalCode: "75001",
   //           Country: "FR"
   //         },
   //         OwnerName: "Joe Blogs",
   //         SortCode: "00152",
   //         AccountNumber: "11696419"
   //       }
   //       backCountData.Id = result.user
   //       backCountData.UserId = result.user
   //
   //       PaymentService.createBankCount( backCountData, result.user,  // var CustomerServices = require('../../api/services/CustomerService')
   //         function resultServices ( err, result ) {
   //           if (err) fail(err)
   //           assert.equal("OK", result.response )
   //           assert.equal(true,  typeof result.bankcount != "undefined" )
   //
   //           testPayVariablesBuyer.bankcount = result.bankcount
   //           done();
   //         })
   //     });
   // });
    //
    //
    //it('Create Mangopay user natural user and register back count target GB ', function (done) {
    //  // var app = sails();
    //  var naturalUserData = {
    //    FirstName: "Diovvvbnis", // Required
    //    LastName: "HugvvoSI",    // Required
    //    Birthday:  moment('300680', 'DDMMYY').unix(),  // Required,  // Required
    //    Nationality: "FR", // Required, default: 'FR'
    //    CountryOfResidence: "FR", // Required, default: 'FR'
    //    Address: {
    //      AddressLine1: "1 Mangopay Street",
    //      AddressLine2: "The Loop",
    //      City: "Paris",
    //      Region: "Ile de France",
    //      PostalCode: "75001",
    //      Country: "FR"
    //
    //    },
    //    Occupation: "Writer",
    //    IncomeRange: "6",
    //    ProofOfIdentity: null,
    //    ProofOfAddress: null,
    //    PersonType: "NATURAL",
    //    Email: "victor@hugo.com",
    //    Tag: "custom tag"
    //
    //  }
    //
    //  //Blog workflow
    //  //var naturalUserData = {
    //  //  Email: "ada.lovelace@gmail.com",
    //  //  FirstName: "Ada",
    //  //  LastName: "Lovelace",
    //  //  Address: "C/ Larios, 1, 29015, Málaga",
    //  //  Birthday: 1300186358,
    //  //  Nationality: "ES",
    //  //  CountryOfResidence: "ES"
    //  //}
    //  config  = { currency:"ES"}
    //  PaymentService.createNaturalWallet( config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
    //    function resultServices ( err, result ) {
    //      if (err) done(err)
    //      console.log(result)
    //      assert.equal("OK", result.response )
    //      assert.equal(true,  typeof result.wallet != "undefined" )
    //      assert.equal(true,  typeof result.user != "undefined" )
    //
    //      testPayVariablesBuyer.wallet = result.wallet
    //      testPayVariablesBuyer.user = result.user
    //
    //
    //      //backCountData = {
    //      //  ownername: "Simone de Beauvoir",
    //      //  type: "IBAN",
    //      //  ownerAddress: "Gran Vía, Madrid",
    //      //  iban: "FR3020041010124530725S03383",
    //      //  bic: "CRLYFRPP"
    //      //}
    //
    //      backCountData =   {
    //        Id: "8494514",
    //        Tag: "custom meta",
    //        Type: "OTHER",
    //        OwnerAddress: {
    //          AddressLine1: "1 Mangopay Street",
    //          AddressLine2: "The Loop",
    //          City: "Paris",
    //          Region: "Ile de France",
    //          PostalCode: "75001",
    //          Country: "FR"
    //        },
    //        OwnerName: "Joe Blogs",
    //        Country: "FR",
    //        BIC: "CRLYFRPP",
    //        AccountNumber: "11696419"
    //      }
    //      backCountData.Id = result.user
    //      backCountData.UserId = result.user
    //
    //      PaymentService.createBankCount( backCountData, result.user,  // var CustomerServices = require('../../api/services/CustomerService')
    //        function resultServices ( err, result ) {
    //          if (err) fail(err)
    //          assert.equal("OK", result.response )
    //          assert.equal(true,  typeof result.bankcount != "undefined" )
    //
    //          testPayVariablesBuyer.bankcount = result.bankcount
    //          done();
    //        })
    //    });
    //});
    //
    it('Create Mangopay user natural user and register CARD target ', function (done) {
      // var app = sails();
      var naturalUserData = {
        FirstName: "Dionis", // Required
        LastName: "HugoSI",    // Required
        Birthday:  moment('300680', 'DDMMYY').unix(),  // Required,  // Required
        Nationality: "FR", // Required, default: 'FR'
        CountryOfResidence: "FR", // Required, default: 'FR'
        Address: {
          AddressLine1: "1 Mangopay Street",
          AddressLine2: "The Loop",
          City: "Paris",
          Region: "Ile de France",
          PostalCode: "75001",
          Country: "FR"

        },
        Occupation: "Writer",
        IncomeRange: "6",
        ProofOfIdentity: null,
        ProofOfAddress: null,
        PersonType: "NATURAL",
        Email: "victor@hugo.com",
        Tag: "custom tag"

      }

      //Blog workflow
      //var naturalUserData = {
      //  Email: "ada.lovelace@gmail.com",
      //  FirstName: "Ada",
      //  LastName: "Lovelace",
      //  Address: "C/ Larios, 1, 29015, Málaga",
      //  Birthday: 1300186358,
      //  Nationality: "ES",
      //  CountryOfResidence: "ES"
      //}
      config  = { currency:"EUR"}
      PaymentService.createNaturalWallet( config, naturalUserData,  // var CustomerServices = require('../../api/services/CustomerService')
        function resultServices ( err, result ) {
          if (err) done (err)
          console.log(result)
          assert.equal("OK", result.response )
          assert.equal(true,  typeof result.wallet != "undefined" )
          assert.equal(true,  typeof result.user != "undefined" )

          testPayVariablesBuyer.wallet = result.wallet
          testPayVariablesBuyer.user = result.user


          cardValueEx = {
            CardNumber: '4706750000000033',
            CardExpirationDate: "1623",  //12-06-2023  moment('0623', 'MMDD').unix()
            CardCvx: '342',
          }

          console.log("CALL FUNCTION")

          PaymentService.createCard( cardValueEx, config, result.user,  // var CustomerServices = require('../../api/services/CustomerService')
            function resultServices ( err, result ) {
              if (err) fail(err)
              //User card parameter card number undefined

              //console.log("=======" +  result.card)
              assert.equal("OK", result.response )
              assert.equal(true,  typeof result.card != "undefined" )


              testPayVariablesBuyer.card = result.card
              done();
            })


        });
    });


   //
    it('Make the payment to the buyer wallet PAYIN  ', function (done) {

   ///Remmeber money count is in cents 1100 centes
      testAmount = 12; //It's 120 euro
      debiteFundsEx =  {
        Currency: "EUR",
        Amount: (testAmount*1)
      }

      ///10% money for may platform
      feesEx = {
        Currency: "EUR",
        Amount:  ((testAmount-2))
      }

      console.log( "Product cost + mangopay services + my marketplace payment " ,debiteFundsEx.Amount)
      console.log( "Mangopay services + my marketplace payment " ,feesEx.Amount)
      console.log("Verification init");
      assert.equal(true,  typeof  testPayVariablesBuyer.wallet != "undefined" )
      assert.equal(true,  typeof  testPayVariablesBuyer.user != "undefined" )

      console.log("Verificando")
      assert.equal(true,  typeof  testPayVariablesSeller.wallet != "undefined" )
      assert.equal(true,  typeof  testPayVariablesSeller.user != "undefined" )
      assert.equal(true,  typeof  testPayVariablesBuyer.card  != "undefined" )
      console.log("End verification");
      console.log("IDENTIFICADOR--", testPayVariablesBuyer.card)
      PaymentService.makeBuyToMango( testPayVariablesBuyer.user,testPayVariablesBuyer.user,testPayVariablesBuyer.wallet  , testPayVariablesBuyer.card ,debiteFundsEx, feesEx,  // var CustomerServices = require('../../api/services/CustomerService')
        function resultServices ( err, result ) {
              if (err) done(err)

          assert.equal("OK",  result.response)
          assert.equal(true,  typeof  result.payin != "undefined" )
        });
    });
   //
   //
   // it('Transfer money between buyer and seller wallet  ', function (done) {
   //
   //        ///Remmeber money count is in cents 1100 centes
   //
   //   testAmount = 120; //It's 120 euro
   //   debiteFundsEx =  {
   //     Currency: "EUR",
   //     Amount: String(testAmount*100)
   //   }
   //
   //   ///10% money for may platform
   //   feesEx = {
   //     Currency: "EUR",
   //     Amount:  String((testAmount*100)/10)
   //   }
   //
   //   console.log( "Product cost + mangopay services + my marketplace payment " ,debiteFundsEx.Amount)
   //   console.log( "Mangopay services + my marketplace payment " ,feesEx.Amount)
   //
   //   assert.equal(true,  typeof  testPayVariablesBuyer.wallet != "undefined" )
   //   assert.equal(true,  typeof  testPayVariablesBuyer.card != "undefined" )
   //   assert.equal(true,  typeof  testPayVariablesBuyer.user != "undefined" )
   //   PaymentService.transferWalletToWallet( testPayVariablesBuyer.user, testPayVariablesBuyer.wallet, testPayVariablesSeller.user, testPayVariablesSeller.wallet ,debiteFundsEx, feesEx,  // var CustomerServices = require('../../api/services/CustomerService')
   //     function resultServices ( err, result ) {
   //       if (err) fail(err)
   //
   //       assert.equal("OK",  result.response)
   //       assert.equal(true,  typeof  result.payin != "undefined" )
   //     });
   // });
   //
   //
    it('Make a PayOut transfer to the seller bank account: withdraw ', function (done) {

      ///Remmeber money count is in cents 1100 centes

      testAmount = 150; //It's 120 euro
      debiteFundsEx =  {
        Currency: "EUR",
        Amount: (testAmount*100)
      }

      ///10% money for may platform
      feesEx = {
        Currency: "EUR",
        Amount:  ((testAmount*100)/10)
      }

      console.log( "Product cost + mangopay services + my marketplace payment " ,debiteFundsEx.Amount)
      console.log( "Mangopay services + my marketplace payment " ,feesEx.Amount)

      assert.equal(true,  typeof  testPayVariablesSeller.wallet != "undefined" )
      assert.equal(true,  typeof  testPayVariablesSeller.user != "undefined" )
      assert.equal(true,  typeof  testPayVariablesSeller.bankcount != "undefined" )
      //assert.equal(true,  typeof  testPayVariablesSeller.bic != "undefined" )

      PaymentService.withdrawWalletToBank(  testPayVariablesSeller.user, testPayVariablesSeller.wallet, testPayVariablesSeller.bankcount, testPayVariablesSeller.bic,debiteFundsEx, feesEx,  // var CustomerServices = require('../../api/services/CustomerService')
        function resultServices ( err, result ) {
          if (err) done(err)

          assert.equal("OK",  result.response)
          assert.equal(true,  typeof  result.wire != "undefined" )
        });
    });

 ///Other test know money in user legal and natural wallet
 ///know money withdraw to Bank count
 ///know card or cards register en magopay user
    })
  })
