// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAZSBPjscSAImrvWt8CWS44RDvJMAh72Z0",
    authDomain: "train-activity-9cfbe.firebaseapp.com",
    databaseURL: "https://train-activity-9cfbe.firebaseio.com",
    projectId: "train-activity-9cfbe",
    storageBucket: "",
    messagingSenderId: "412187997189",
    appId: "1:412187997189:web:9b1b63056486c6e17c986c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
var database = firebase.database();

var index = 0;

// Function to Remove Train
function removeRow () {
  $(".row-" + $(this).attr("data-index")).remove();
  database.ref().child($(this).attr("data-key")).remove();
};

// Only allow numeric input for this form field
$("#frequency-input").on("keypress keyup blur",function (event) {    
  $(this).val($(this).val().replace(/[^\d].+/, ""));
   if ((event.which < 48 || event.which > 57)) {
       event.preventDefault();
   }
});

// Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    $(".error").remove();
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();
    
    if (trainName == "" ||
    trainDestination == "" ||
    trainStart == "Invalid date" ||
    trainFrequency == "") {
      $('button').after('<span class="error">You Must Complete The Entire Form</span>')
    }
    else {
    // Creates local "temporary" object for holding train data
    var newTrain = {
      trainName: trainName,
      trainDestination: trainDestination,
      trainStart: trainStart,
      trainFrequency: trainFrequency,
      date_added: firebase.database.ServerValue.TIMESTAMP
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.trainDestination);
    console.log(newTrain.trainStart);
    console.log(newTrain.trainFrequency);
  
    $(".error").remove();

    // Modal (no alert!) to notify user new train added
    var message = trainName + ' has been successfully added!';
    $('#alertModal').find('.modal-body p').text(message);
    $('#alertModal').modal('show')
    
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
}});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  
  // Create remove button for train, assign index and key data
  var removeButton = $("<img>").addClass("removeButton").attr("src", 'assets/images/trash-bin.jpg').attr("data-index", index).attr("data-key", childSnapshot.key);

  // Create local variables to store data from firebase
  var trainName = childSnapshot.val().trainName;
  var trainDestination = childSnapshot.val().trainDestination;
  var trainStart = childSnapshot.val().trainStart;
  var trainFrequency = childSnapshot.val().trainFrequency;

  var trainStartConverted = moment(trainStart, "HH:mm").subtract(1, "years");

  // Difference between times
  var timeDiff = moment().diff(moment(trainStartConverted), "minutes");

  // Time Apart (Remainder)
  var timeRemainder = timeDiff % trainFrequency;

  // Minutes Until Train
  var trainMinAway = trainFrequency - timeRemainder;

  // Next Train
  var nextTrain = moment().add(trainMinAway, "minutes").format("hh:mm A");

  //Conditional to see if train has run yet
  if (timeRemainder < 0) {
    nextTrain = trainStart;
    console.log(nextTrain);

    minToTrain = -timeDiff;
    console.log(minToTrain);
  }

  // Create the new row
  var newRow = $("<tr>")
  newRow.addClass("row-" + index);
  newRow.append(
    $("<td class='trainname'>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(trainMinAway),
    $("<td>").html(removeButton)
  );
  
  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

  index++;
});

$(document).on("click", ".removeButton", removeRow);