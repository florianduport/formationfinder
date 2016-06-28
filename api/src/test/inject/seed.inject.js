/**
 * Created by dionis on 6/26/2016.
 */
var FormationCenterData = require('../../api/models/FormationCenter')

describe('data seeding', function(){
  it('should seed data', function(done){
         ///console.log("Variable de ambiente ", sails.config.environment )

    Configuration.create( {
      name:"mail",
      type:"smtp",
      emailsystemadress:"formationfinder@localhost.com",
      emailport:"25",
      emailhost:"127.0.0.1",
      emailuser:"dionis@localhost.com",
      emailpassword:"",
      emailsecure:false
    }).then(function (Configurations){
      configuration = Configurations[0];
      //console.log("Creado el objeto en BD");
    });


    FormationCenter.find({}).then(function(formationCenters){
         ///Get id for formation
             async.each(formationCenters, function (formationCenter, callback) {
               var formationid = formationCenter.id;

               var placeFormationAsociation = {
                 formation:[],
                 place:[],
                 customers:[]
               }

               ////Asociate formation
               async.series({
                 one: function(callback){
                   ///Asociate place
                   Place.update({},{formationCenter:formationid}).exec( function(err, Places) {
                     if (err)
                       console.log(err)

                     Places.forEach(function (iPlaces, i){
                       placeFormationAsociation.place.push(iPlaces.id)
                     })

                     callback(null, placeFormationAsociation);

                   });

                   //return formationsArray


                 },
                 two: function(callback){

                   Formation.update({},{formationCenter:formationid}).exec( function(err, Formations) {
                     if (err)
                       console.log(err)

                     Formations.forEach(function (iFormation, i){

                       placeFormationAsociation.formation.push(iFormation.id)
                     })

                     callback(null, placeFormationAsociation);
                   });


                 },
                 three: function(callback){

                   Customer.update({},{formationCenter:formationid}).exec( function(err, Customers) {
                     if (err)
                       console.log(err)

                     Customers.forEach(function (iCustomers, i){


                       placeFormationAsociation.formation.forEach(function (iFormation, i){

                         ObjectCustomers = Customers[i]

                         Customer.update({id:ObjectCustomers.id},{formation:iFormation}).exec( function(err, CustomersArray) {
                           if (err)
                             console.log(err)
                         })
                       })

                     });

                     callback(null,placeFormationAsociation );
                   })

                 }
                 }, function(err, results) {
                   // results is now equal to: {one: 1, two: 2}
                   if (err)
                     return next(err);
                 });


                callback();
             })
        done();
      })
      .catch(done);
  });


  ////Read al formation

  ////Read al place

  ////For each place asig one formation
});
