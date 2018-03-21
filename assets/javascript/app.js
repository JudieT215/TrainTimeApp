$(document).ready(function() {
  var database = firebase.database();

  console.log(database);
  var name = "";
  var destination = "";
  var firstTime = "";
  var frequency = "";
  //submit button... will do something
  $("#trainSubmit").on("click", function(event) {
    event.preventDefault();

    name = $("#trainName")
      .val()
      .trim();
    destination = $("#trainDestination")
      .val()
      .trim();
    firstTime = $("#trainFirstTime").val();
    frequency = $("#trainFreq").val();

    //linking and push input values to firebase fields
    database.ref().push({
      name: name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    }); // firebase function closer
  }); //submit function closer

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    //  // Store everything into a variable.
    var trainNameVal = childSnapshot.val().name;
    var trainDestinationVal = childSnapshot.val().destination;
    var trainFirstTimeVal = childSnapshot.val().firstTime;
    var trainFreqVal = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainNameVal);
    console.log(trainDestinationVal);
    console.log(trainFirstTimeVal);
    console.log(trainFreqVal);

    var trainFirstConverted = moment(trainFirstTimeVal, "hh:mm").subtract(
      1,
      "years"
    );
    console.log(trainFirstConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainFirstConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    //Difference between the 2 times
    var tRemainder = diffTime % trainFreqVal;
    console.log(tRemainder);
    //
    var tMinutesTillTrain = trainFreqVal - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //push 
   // $("#currentTrainArrival").append("<p>" + trainNameVal + "</p><p>" + "MINUTES TILL TRAIN: " + moment(tMinutesTillTrain).format("hh:mm") + "</p><p>" + "ARRIVAL TIME: " + moment(nextTrain).format("hh:mm") + "</p>");

    // Pushing submited train vals from the firebase database to the DOM
    $("#train-table > thead").append(
      "<tr><td>" +
        trainNameVal +
        "</td><td>" +
        trainDestinationVal +
        "</td><td>" +
        trainFirstTimeVal +
        "</td><td>" +
        trainFreqVal +
        "</td></tr>"
    );
  
  

      $("#currentTrainArrival").text(moment(nextTrain).format("hh:mm"));
    });
});


 //over all program closer
