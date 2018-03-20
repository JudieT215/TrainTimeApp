$(document).ready(function() {
    var database = firebase.database();

   console.log(database);
    var name = "";
    var destination = "";
    var firstTime = "";
    var frequency = "";

    $("#trainSubmit").on("click", function(event) {
        event.preventDefault();

        name = $("#trainName")
          .val()
          .trim();
        destination = $("#trainDestination")
          .val()
          .trim();
        firstTime = $("#trainFirstTime")
          .val()
          .trim();
        frequency = $("#trainFreq")
            .val()
            .trim();
  

        database
          .ref()
          .push({
            name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });

        });

}) //over all program closer