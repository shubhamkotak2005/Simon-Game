var started = false;
function start() {
  $(document).keypress(function () {
    if (!started) {
      $("#" + "level-title").text("Level " + level);
      nextSequence();
      started = true;
      // console.log("gamePattern" + " " + gamePattern);
    }
  });
}
start();

var level = 0;
var userClickedPattern = [];
var gamePattern = [];
$(".btn").click(function () {
  //handler function
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  // console.log(userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//1
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  //2
  var buttonColors = ["green", "red", "yellow", "blue"];
  //3
  var randomChosenColor = buttonColors[randomNumber];
  //4
  gamePattern.push(randomChosenColor);
  //5 using jquery to select the id of the randomChosenColor and then applying fade in and fade out effect
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  //6 playing the sound of the randomChosenColor
  playSound(randomChosenColor);
}

//Sound Function
function playSound(name) {
  var playAudio = new Audio("sounds/" + name + ".mp3");
  playAudio.play();
}

//Animation Function
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Game over function
function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      console.log("User Pattern", userClickedPattern);
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
        console.log(gamePattern);
        console.log(userClickedPattern);
      }, 1000);
    }
  } else {
    console.log("game over");
    // $(document).css("body", "red");
    playSound("wrong");
    gameOver();
    $("#" + "level-title").text("Game Over, Press Any Key to Restart");
    started = false;
    startOver();
    start();
  }
}

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}
