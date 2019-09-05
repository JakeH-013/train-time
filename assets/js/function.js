var firebaseConfig = {
    apiKey: "AIzaSyC6GDC8FOnBn1PU5JSrghl60D6OZbBMWd4",
    authDomain: "train-time-2e1bf.firebaseapp.com",
    databaseURL: "https://train-time-2e1bf.firebaseio.com",
    projectId: "train-time-2e1bf",
    storageBucket: "",
    messagingSenderId: "685306532538",
    appId: "1:685306532538:web:4ebdc096376cccb5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var dataRef = firebase.database();

  //click event for button
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    //pull form inputs
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirst = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    //creates local temp storage for data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: trainFirst,
        frequency: trainFrequency
    };
    //uploads inputs to the database
    dataRef.ref().push(newTrain);

    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.first);
    // console.log(newTrain.frequency);

    alert("New line added");

    // Clears text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

  });

  //firebase event for adding new trains to the html
  dataRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    //store items in variables
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainfrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainfrequency);
    //adds new row to the table, which contains each piece of input/information
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(firstTrain),
        $("<td>").text(trainfrequency)
    );
    //appends the row
    $("#train-table > tbody").append(newRow);
  });



// //assumptions
// var aFrequency = 10;
// //first departure
// var firstTime = "7:30";
// //first departure converted
// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);
// //current time
// var currentTime = moment();
// console.log(moment(currentTime).format("hh:mm"));
// //difference between times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log(diffTime);
// //time between the train and now
// var aDifference = diffTime % aFrequency;
// console.log(aDifference);
// //time until next train
// var aMinTilTrain = aFrequency - aDifference;
// console.log(aMinTilTrain);
// //time when next train arrives
// var nextTrain = moment().add(aMinTilTrain, "minutes");
// console.log(moment(nextTrain).format("hh:mm"));