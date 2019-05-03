//First thing we have to do is intialize firebase 
var config = {
  apiKey: "AIzaSyCQBm615kQeMuDOrHoIjBgJ2OLNGvjFg7U",
  authDomain: "train-project-c6547.firebaseapp.com",
  databaseURL: "https://train-project-c6547.firebaseio.com",
  projectId: "train-project-c6547",
  storageBucket: "train-project-c6547.appspot.com",
  messagingSenderId: "348024948281"
};
firebase.initializeApp(config);

//We then require a variable to reference the firebase database
var database = firebase.database();

//We require an on click fucntion
$("#submit-btn").on("click", function(event) {
  //We have to prevent the default nature of the on click
  event.preventDefault();
  //We create variables within the function to grab the user input from the form 
  var trainName = $("#name").val().trim();
  var destination = $("#destination").val().trim();
  var time = moment($("#time").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequency").val().trim();
  
  //we also must ensure that each input has a value 
  if (trainName =="") {
    alert("Please enter a valid train name");
    return false;
  };
  if (destination =="") {
    alert("Please enter a valid destination");
    return false;
  };
  if (time =="") {
    alert("Please enter a valid time");
    return false;
  };
  if (frequency =="") {
    alert("Please enter a valid frequency");
    return false;
  };
  
  //Verify the train data is being grabbed correctly from the user input 
  console.log(trainName);
  console.log(destination);
  console.log(time);
  console.log(frequency);

  
  //We create a temporary object to hold the train data
  var nTrain = {
    train: trainName,
    destination: destination,
    time: time,
    frequency: frequency
  };

  //Verify the train data is being stored correctly in the nTrain object
  console.log(nTrain.train);
  console.log(nTrain.destination);
  console.log(nTrain.time);
  console.log(nTrain.frequency);
  

  //Once the object is fufiled, we can then push our train data to firebase
  database.ref().push(nTrain);
  
  //fianlly, we make sure our form is cleared
  $("#name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});

//Create a function that allows you to update the page and add a row in real time when the firebase data gets pushed
database.ref().on("child_added", function (childSnapshot) {
console.log(childSnapshot.val());
  //We now set variables from the form input field equal to the stored values in firebase.
  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;
  
  //We create a new row to append to the body of the table with all the data required for the row
  $("#train-list>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + MinToNextTrain + "</td></tr>");
  
  //Trying to convert the time here.  I think I have it using some code from the class work
  //This is the intial time coversion
  var timeConversion = moment(time, "HH:mm");
  console.log(timeConversion);
  //This is the current time
  var currentTime = moment();
  console.log("CURRENT TIME: " + currentTime);
  //We store the difference between currentTime and timeCoversion converted in a variable.
  var difference = moment().diff(moment(timeConversion), "minutes");
  console.log("Difference in Time: " + difference);
  //We find Remainder of the time left and store in a variable
  var timeRemaining = difference % frequency;
  console.log(timeRemaining);
  //We also have to calculate the minutes until the next train and store it in a variable
  var MinToNextTrain = frequency - timeRemaining;
  console.log("Minutes until the next train passes: " + MinToNextTrain);
  //And finally we add the next train arrival time
  var nextTrain = moment().add(MinToNextTrain, "minutes").format("HH:mm");
  console.log(nextTrain);


});