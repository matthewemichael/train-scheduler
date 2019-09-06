var config = {
    apiKey: "AIzaSyAZSBPjscSAImrvWt8CWS44RDvJMAh72Z0",
    authDomain: "train-activity-9cfbe.firebaseapp.com",
    databaseURL: "https://train-activity-9cfbe.firebaseio.com",
    projectId: "train-activity-9cfbe",
    storageBucket: "",
    messagingSenderId: "412187997189",
    appId: "1:412187997189:web:9b1b63056486c6e17c986c"
};
  
firebase.initializeApp(config);
  
var database = firebase.database();
  
// Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = $("#start-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // First Train Start, set back 1 year to make sure date comes before current time
    var trainStartConverted = moment(trainStart, "hh:mm").subtract(1, "years");

    // Difference between times
    var timeDiff = moment().diff(moment(trainStartConverted), "minutes");

    // Time Apart (Remainder)
    var timeRemainder = timeDiff % trainFrequency;

    // Minutes Until Train
    var trainMinAway = trainFrequency - timeRemainder;

    // Next Train
    var nextTrain = moment().add(trainMinAway, "minutes");

    // Arrival Time
    var nextArrival = moment(nextTrain).format("hh:mm a");

    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainFrequency,
      minutesAway: trainMinAway,
      nextArrival: nextArrival,
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
    console.log(newTrain.minutesAway);
    console.log(newTrain.nextArrival);
  
   ////////////////////////////////////
  //         NO MORE ALERTS!        //
 ////////////////////////////////////
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});
  
// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().nextArrival;
    var trainMinAway = childSnapshot.val().minutesAway;
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextTrain),
      $("<td>").text(trainMinAway),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});