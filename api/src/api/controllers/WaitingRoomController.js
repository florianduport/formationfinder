/**
 * WaitingRoomController
 *
 * @description :: Server-side logic for managing waitingrooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  createWithFormationCenterID: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_ID_REQUIRED")});
    }

    //check that the formation center exist,
    FormationCenter.findOne({id: req.param('formationCenter')})
      .exec(function (err, FormationCenterFounded) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FormationCenterFounded) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        //if i get here, the formation center exist, so i can create the waiting room.
        WaitingRoom.create({
          formationCenter: FormationCenterFounded.id,
        }).exec(function (err, waitingRoomCreated) {
          if (err || !waitingRoomCreated) {
            return res.json({status: "error", info: sails.__("ERROR_CREATING_WAITING_ROOM")});
          }

          return res.json({status: "ok", info: sails.__("WAITING_ROOM_CREATED")});
        })
      })

  },

  createWithFormationCenterName: function (req, res, next) {
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
    }

    //check that the formation center exist,
    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FormationCenterFounded) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FormationCenterFounded) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        //if i get here, the formation center exist, so i can create the waiting room.
        WaitingRoom.create({
          formationCenter: FormationCenterFounded.id,
        }).exec(function (err, waitingRoomCreated) {
          if (err || !waitingRoomCreated) {
            return res.json({status: "error", info: sails.__("ERROR_CREATING_WAITING_ROOM")});
          }

          return res.json({status: "ok", info: sails.__("WAITING_ROOM_CREATED")});
        })
      })

  },

  //addCustomer: function (req, res, next) {
  //
  //  if (req.param('waitingroom') === undefined) {
  //    return res.json({status: "error", info: sails.__("WAITING_ROOM_REQUIRED")});
  //  }
  //
  //  if (req.param('customer') === undefined) {
  //    return res.json({status: "error", info: sails.__("ERROR_CUSTOMER_REQUIRED")});
  //  }
  //
  //  var waitingroom = req.params('waitingroom');
  //
  //  var customer = req.params('customer');
  //
  //  //check if the waiting room exist
  //  WaitingRoom.findOne({id: waitingroom}).exec(function (err, waitingroomfounded) {
  //    if(err){
  //      return res.json({status: "error", info: sails.__("ERROR_SEARCHING_WAITING_ROOM")});
  //    }
  //
  //    if(!waitingroomfounded){
  //      return res.json({status: "error", info: sails.__("WAITING_ROOM_NO_FOUNDED")});
  //    }
  //
  //    //now check if the customer exist.
  //    Customer.findOne({id: customer}).exec(function (err, customerFounded) {
  //      if(err){
  //        return res.json({status: "error", info: sails.__("ERROR_SEARCHING_CUSTOMER")});
  //      }
  //
  //      if(!customerFounded){
  //        return res.json({status: "error", info: sails.__("CUSTOMER_NO_FOUNDED")});
  //      }
  //
  //      //now add the customer to the waiting room
  //      waitingroomfounded.customers.add(customer);
  //      waitingroomfounded.save();
  //    });
  //  });
  //},

  addCustomer: function (req, res, next) {

    console.log("***************************************************************************");
    console.log("*********** ENTERING TO ADD CUSTOMER TO WAITING ROOM **********************");
    console.log("***************************************************************************");

    //Check parameters
    if (req.param('formationCenter') === undefined) {
      return res.json({status: "error", info: sails.__("FORMATION_CENTER_NAME_REQUIRED")});
    }

    if (req.param('customerData') === undefined) {
      return res.json({status: "error", info: sails.__("CUSTOMER_DATA_REQUIRED")});
    }

    if (req.param('paymentData') === undefined) {
      return res.json({status: "error", info: sails.__("PAYMENT_DATA_REQUIRED")});
    }


    //Get the customer data
    var customerData = req.param('customerData');
    console.log("customerData: ", customerData);

    //Get the payment data
    var paymentData = req.param('paymentData');
    console.log("paymentData: ", paymentData);

    var PaymentMount = 10; //Here we need to define the payment mount.
    console.log("PaymentMount: ", PaymentMount);

    //Search formation center, and then get the waiting room ID.
    FormationCenter.findOne({name: req.param('formationCenter')})
      .exec(function (err, FC) {
        if (err) {
          return res.json({status: "error", info: sails.__("ERROR_SEARCHING_FORMATION_CENTER")});
        }

        if (!FC) {
          return res.json({status: "error", info: sails.__("FORMATION_CENTER_NO_FOUNDED")});
        }

        //verify if the customer doesn't exist.
        Customer.findOne({
          "driverLicence.number": customerData.driverLicence.number
        }).exec(function (err, CustomerFounded) {

          if (err) {
            return res.json({status: "error", info: sails.__("ERROR_SEARCHING_CUSTOMER")});
          }

          //If the customer exist, send an error.
          if (CustomerFounded) {
            return res.json({status: "error", info: sails.__("ERROR_CUSTOMER_EXIST")});
          }

          //if i get here, the customer doesn't exist in the system
          //and the formation center exist, create the customer.
          customerData.formationCenter = FC.id;

          Customer.create(customerData)
            .exec(function (err, CustomerCreated) {

              if (err || !CustomerCreated) {
                return res.json({status: "error", info: sails.__("ERROR_CREATING_CUSTOMER")});
              }


              //Now create the customer bill.
              var CustomerBillData = {
                billNumber: CustomerCreated.id,         //Hay que definir esto.
                billState: false,                       //Luego del pago, actualizar true.
                formationCenter: FC.id,
                customer: CustomerCreated.id,
                date: new Date(),
                amount: PaymentMount                    //Ver de donde saco este valor. En principio debe ser el precio de una
              };                                        //Formacion

              CustomerBill.create(CustomerBillData)
                .exec(function (err, CustomerBillCreated) {

                  if (err || !CustomerBillCreated) {
                    return res.json({status: "error", info: sails.__("ERROR_CREATING_CUSTOMER_BILL")});
                  }

                  //Now create the mangopay natural user a his wallet.
                  var naturalUserData = {
                    FirstName: CustomerCreated.firstName, // Required
                    LastName: CustomerCreated.name,       // Required
                    Birthday: CustomerCreated.birthDate,  // Required,  // Required
                    Nationality: CustomerCreated.nationality, // Required, default: 'FR'
                    CountryOfResidence: CustomerCreated.residenceCountry, // Required, default: 'FR'
                    Address: {
                      AddressLine1: CustomerCreated.address,
                      AddressLine2: CustomerCreated.address,
                      City: CustomerCreated.city,
                      Region: CustomerCreated.city,
                      PostalCode: CustomerCreated.zipCode,
                      Country: CustomerCreated.residenceCountry

                    },
                    Occupation: "Management",
                    IncomeRange: "6",
                    ProofOfIdentity: null,
                    ProofOfAddress: null,
                    PersonType: "NATURAL",
                    Email: CustomerCreated.email,
                    Tag: "Formationfinder tag"

                  };

                  var config = {currency: paymentData.currency};
                  var cardValue = {};
                  cardValue.CardExpirationDate = paymentData.CardExpirationDate;
                  cardValue.CardNumber = paymentData.cardNumber;
                  cardValue.CardCvx = paymentData.cardCSV;

                  //the card expitation date must be in 'MMYY' format.
                  var moment = require('moment');
                  cardValue.CardExpirationDate = moment(cardValue.CardExpirationDate).format('MMYY');

                  //The Birthday must be in the format('DDMMYY')
                  naturalUserData.Birthday = moment(naturalUserData.Birthday).unix();

                  console.log("*** Antes de crear el wallet el objeto naturalUserData: ", naturalUserData);

                  //Create natural user wallet in mangopay.
                  PaymentService.createNaturalWallet(config, naturalUserData,
                    function (err, result) {

                      if (err) {
                        console.log("Error creating natural user wallet: ", err.message);
                        return res.json({status: "error", info: sails.__("ERROR_CREATING_NATURAL_USER_WALLET")});
                      }

                      console.log("Se creo el wallet (wallet, user): ", result);

                      //If i get here the wallet is created, the wallet Id and user Id are in result.
                      var walletId = result.wallet;
                      var userId = result.user;

                      //Create and register the credit card.
                      PaymentService.createCard(cardValue, config, userId,
                        function (err, resultCard) {

                          if (err) {
                            console.log("Error creating credit card: ", err.message);
                            return res.json({status: "error", info: sails.__("ERROR_CREATING_CARD")});
                          }

                          //Now perform the payin to mango.
                          console.log("********* Payin to mango *********");

                          var debiteFundsEx = {
                            Currency: paymentData.currency,
                            Amount: PaymentMount
                          };

                          //Get data about money pay to our marketplace
                          var ourMarketPlacePrice = 0;
                          var feesEx = {
                            Currency: paymentData.currency,
                            Amount: ourMarketPlacePrice
                          };

                          PaymentService.makeBuyToMango(userId, userId, walletId, resultCard.card, debiteFundsEx, feesEx,
                            function (err, resultObject) {

                              if (err) {
                                console.log("Error in payin process: ", err.message);
                                return res.json({status: "error", info: sails.__("ERROR_IN_PAYIN_PROCESS")});
                              }

                              //In order to perform a wallet to wallet transfer to the formation center,
                              //validate that the formation center has it's mangopay information.
                              if(!FC.mangouser || FC.mangouser === "" || !FC.mangowallet  || FC.mangowallet === ""){
                                return res.json({status: "error", info: sails.__("FORMATION_CENTER_HAS_NOT_MANGOPAY_DATA")});
                              }

                              //When a get here, the payin process is complit, now make the transfer to the formation center wallet;
                              PaymentService.transferWalletToWallet(userId, walletId, FC.mangouser, FC.mangowallet, debiteFundsEx, feesEx,
                                function (err, resultData) {

                                  if (err) {
                                    console.log("Error in transferWalletToWallet: ", err.message);
                                    return res.json({status: "error", info: sails.__("ERROR_IN_WALLET_TO_WALLET")});
                                  }

                                  //***** Payment process complit, now update objects *****

                                  //Update the customer bill, now is paid.
                                  CustomerBillCreated.state = true;
                                  CustomerBillCreated.save();

                                  //The customer has paid, then insert hem in to the waiting room
                                  CustomerCreated.waitingRoom = FC.waitingRoom;
                                  CustomerCreated.save();

                                  var resultObject = {
                                    CustomerWalleId: walletId,
                                    MangoUserId: userId,
                                    MangoUserCardId: resultCard.card,
                                    CustomerCreated: CustomerCreated
                                  };

                                  console.log("***************************************************************************");
                                  console.log("*********** FINAL RESULT OF ADD CUTOMER TO WAITING ROOM *******************");
                                  console.log("***************************************************************************");

                                  console.log(resultObject);

                                  return res.json({status: "ok", info: sails.__("CUSTOMER_ADDED_TO_WAITING_ROOM"), data: resultObject});

                                }); //End PaymentService.transferWalletToWallet

                            }); //End PaymentService.makeBuyToMango

                        }); //End PaymentService.createCard

                    }); //End PaymentService.createNaturalWallet.

                }); //End customer bill create.

            }); //End of create customer

        }); //End of search customer, (checking if the customer exist in the system)

      }); //End of FormationCenter findOne
  }

};

