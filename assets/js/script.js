// Loads JS after HTML/CSS
$(document).ready(function () {
  var currentDay = moment().format("dddd, MMMM do YYYY");
  // display currentDay on page //
  $("#currentDay").text(currentDay);

  // Sets user input to a variable to save to local storage
  var events = [];

  $(".saveBtn").on("click", function () {
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    var dateAdded = moment().format("dddd, MMMM do");

    events.push({ description: value, time: time, date: dateAdded });

    localStorage.setItem("events", JSON.stringify(events));
  });

  // Loads saved data from localStorage
  var storedEvents = JSON.parse(localStorage.getItem("events"));

  if (storedEvents !== null) {
    events = storedEvents;
  }

  for (var i = 0; i < events.length; i++) {
    var userDescription = events[i].description;
    $("#" + events[i].time)
      .children(".description")
      .text(userDescription);
  }

  // Create Function for tracking hours and color code
  function hourTracker() {
    var currentHour = moment().hour();

    // Grabs each time block and converted to an individual integer
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("hour")[1]);
      console.log(blockHour);

      // Color codes for Present, Past, Future
      if (blockHour === currentHour) {
        $(this).css("background-color", "yellow");
      }

      if (blockHour < currentHour) {
        $(this).css("background-color", "gray");
      }

      if (blockHour > currentHour) {
        $(this).css("background-color", "green");
      }
    });
  }

  return hourTracker();
});
