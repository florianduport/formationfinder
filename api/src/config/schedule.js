/**
 * Created by dionis on 6/9/2016.
 */
module.exports.schedule = {
  sailsInContext : true, //If sails is not as global and you want to have it in your task
  tasks : {
    //Every monday at 1am
    firstTask: {
      cron: "0 1 * * 1",
      task: function (context, sails) {
        console.log("cron ok");
      },
      context: {}
    }
  }

};
