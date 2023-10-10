document.addEventListener("DOMContentLoaded", function() {
    const breakLengthElement = document.getElementById("break-length");
    const sessionLengthElement = document.getElementById("session-length");
    const timeLeftElement = document.getElementById("time-left");
    const timerLabelElement = document.getElementById("timer-label");
    const startStopButton = document.getElementById("start_stop");
    const resetButton = document.getElementById("reset");
    const beepAudio = document.getElementById("beep");

beepAudio.addEventListener("loadedmetadata", function() {
    if (beepAudio.duration < 1) {
        beepAudio.currentTime = 0;
        beepAudio.pause();
        beepAudio.src = "beep.mp3"; 
    }
});

    let breakLength = 5;
    let sessionLength = 25;
    let timerRunning = false;
    let isBreak = false;
    let timeLeft = sessionLength * 60 * 1000;
    let intervalID;

function updateDisplay() {
  breakLengthElement.textContent = breakLength;
  sessionLengthElement.textContent = sessionLength;
  
  timerLabelElement.textContent = isBreak ? "Break" : "Session";

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = ((timeLeft % 60000) / 1000).toFixed(0);

  timeLeftElement.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startStopTimer() {
  if (timerRunning) {
     clearInterval(intervalID);
     timerRunning = false;
  } else {
     intervalID = setInterval(updateTimer, 1000);
     timerRunning = true;
 }
}

function updateTimer() {
  timeLeft -= 1000;
  if (timeLeft < 0) {
     beepAudio.play();
     if (isBreak) {
        timeLeft = sessionLength * 60 * 1000;
        timerLabelElement.textContent = "Session";
     } else {
        timeLeft = breakLength * 60 * 1000;
        timerLabelElement.textContent = "Break";
    }
    isBreak = !isBreak;
  }
  updateDisplay();
}


function resetTimer() {
  clearInterval(intervalID);
  timerRunning = false;
  isBreak = false;
  timeLeft = sessionLength * 60 * 1000;
  updateDisplay();
  beepAudio.pause();
  beepAudio.currentTime = 1;
}

document.getElementById("break-increment").addEventListener("click", function() {
  if (breakLength < 60) {
      breakLength++;
      if (breakLength <= 60 && !timerRunning && !isBreak) {
         timeLeft = breakLength * 60 * 1000;
      }
     updateDisplay();
   }
});

document.getElementById("break-decrement").addEventListener("click", function() {
  if (breakLength > 1) { 
      breakLength--;
      if (breakLength <= 60 && !timerRunning && !isBreak) {
          timeLeft = breakLength * 60 * 1000;
      }
      updateDisplay();
   }
});


document.getElementById("session-decrement").addEventListener("click", function() {
  if (sessionLength > 1) {
      sessionLength--;
      if (sessionLength <= 60 && !timerRunning && isBreak) {
          timeLeft = sessionLength * 60 * 1000;
      }
     updateDisplay();
   }
});


document.getElementById("session-increment").addEventListener("click", function() {
  if (sessionLength < 60) {
      sessionLength++;
      if (sessionLength <= 60 && !timerRunning && isBreak) {
         timeLeft = sessionLength * 60 * 1000;
      }
     updateDisplay();
   }
});

startStopButton.addEventListener("click", startStopTimer);

resetButton.addEventListener("click", function() {
  resetTimer();
  breakLength = 5;
  sessionLength = 25;
  updateDisplay();
  beepAudio.pause();       
  beepAudio.currentTime = 0; 
});

 updateDisplay();
// I don't know what }); closing, but I prefer don't move/touch because is working hahaha
});



  
