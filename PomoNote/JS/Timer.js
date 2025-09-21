//default values
let breakLength = 5;
document.getElementById("breakLength").innerHTML = breakLength;

let focusLength = 25;
document.getElementById("focusLength").innerHTML = focusLength;

let longBreakLength = 15;
document.getElementById("longBreakLength").innerHTML = longBreakLength;

let sessionName = "START";
document.getElementById("sessionName").innerHTML = sessionName;

//session length functions
function increaseBreakLength() {
  breakLength++;
  document.getElementById("breakLength").innerHTML = breakLength;
}

function decreaseBreakLength() {
  if(breakLength == 1){
    alert("Minimum break legnth of 1");
  }
  if(breakLength > 1){
    breakLength--;
    document.getElementById("breakLength").innerHTML = breakLength;
  }
}

function increaseFocusLength() {
  focusLength++;
  document.getElementById("focusLength").innerHTML = focusLength;
}

function decreaseFocusLength() {
  if(focusLength == 1){
    alert("Minumum focus length of 1");
  }
  
  if(focusLength > 1){
    focusLength--;
    document.getElementById("focusLength").innerHTML = focusLength;
  }
}

function increaseLongBreakLength() {
  longBreakLength++;
  document.getElementById("longBreakLength").innerHTML = longBreakLength;
}


function decreaseLongBreakLength() {
  if(longBreakLength == 1){
    alert("Minimum break legnth of 1");
  }
  if(longBreakLength > 1){
    longBreakLength--;
    document.getElementById("longBreakLength").innerHTML = longBreakLength;
  }
}

let run = false;
let breakBool = false;
let variable2 = document.getElementById("variable2");
let startbtn = document.getElementById("startbtn");
let session_Name = document.getElementById("sessionName");
let focusCounter = document.getElementById("focusCount");
let shortBreakCount = document.getElementById("shortBreakCount");
let longBreakCount = document.getElementById("longBreakCount");
let breakCount = 0;
let focusCount = 0;
focusCounter = 0;
shortBreakCount = 0;
longBreakCount = 0;

function start(){
  if(!run){
    run = true;
    sessionName = "Focus";
    
    let seconds = 59;
    let time = focusLength-1;
  
    let timerFunction = () => {
      document.getElementById('minutes').innerHTML = time;
      document.getElementById('sessionName').innerHTML = sessionName;
      document.getElementById('seconds').innerHTML = seconds;
      document.getElementById('focusCount').innerHTML = focusCounter;
      document.getElementById('shortBreakCount').innerHTML = shortBreakCount;
      document.getElementById('longBreakCount').innerHTML = longBreakCount;
      document.body.style.backgroundColor = "rgb(186, 73, 73)";
      variable2.classList.remove("hide");
      session_Name.classList.remove("hide");

      seconds = seconds - 1;
  
      if(seconds === 0){
          time = time-1;
        if(time === -1){
            if(focusCount === 3){
                focusCount = 0;
                focusCounter++;
                run = true;
                clearInterval(interval);
                breakBool = false;
                longBreakStart();
            }
            else{
                run = true;
                focusCount++;
                focusCounter++;
                clearInterval(interval);
                breakBool = false;
                breakStart();
            }
          
        }
        seconds = 59;
      }
    }
  
    interval = setInterval(timerFunction, 1000);
  }
  
}


function breakStart(){
  if(!breakBool){
    run = true;
    time = breakLength;
    sessionName = "Break";
    breakBool = true;
    let breakSeconds = 59;
    let breakTime = breakLength-1;

    let timerFunc = () => {
      document.getElementById('minutes').innerHTML = breakTime;
      document.getElementById('sessionName').innerHTML = sessionName;
      document.getElementById('seconds').innerHTML = breakSeconds;
      document.getElementById('focusCount').innerHTML = focusCounter;
      document.getElementById('shortBreakCount').innerHTML = shortBreakCount;
      document.getElementById('longBreakCount').innerHTML = longBreakCount;
      document.body.style.backgroundColor = "#76A5AF";
      
      breakSeconds = breakSeconds - 1;

      if(breakSeconds === 0){
        breakTime = breakTime-1;
        if(breakTime === -1){
          breakBool = true;
          breakCount++;
          shortBreakCount++;
          clearInterval(interval);
          run = false;
          start();
        }
        breakSeconds = 59;
      }
    }

    interval = setInterval(timerFunc, 1000);
  }
}

function longBreakStart(){
  if(!breakBool){
    run = true;
    sessionName = "Long";
    breakBool = true;
    let breakSeconds = 59;
    time = longBreakLength-1;
  
    let timerFunc = () => {
      document.getElementById('minutes').innerHTML = time;
      document.getElementById('sessionName').innerHTML = sessionName;
      document.getElementById('seconds').innerHTML = breakSeconds;
      document.getElementById('focusCount').innerHTML = focusCounter;
      document.getElementById('shortBreakCount').innerHTML = shortBreakCount;
      document.getElementById('longBreakCount').innerHTML = longBreakCount;
      document.body.style.backgroundColor = "#134F5C";
      
      breakSeconds = breakSeconds - 1;
  
      if(breakSeconds === 0){
        time = time-1;
        if(time === -1){
          breakBool = true;
          breakCount++;
          longBreakCount++;
          clearInterval(interval);
          run = false;
          start();
        }
        breakSeconds = 59;
      }
    }
  
    interval = setInterval(timerFunc, 1000);

  }
}

function pause(){
  clearInterval(interval);
  run = false;
}

function skip(){
  clearInterval(interval);
  run = false;
  if(sessionName === "Focus"){
    if(focusCount === 3){
      focusCount = 0;
      focusCounter++;
      run = true;
      clearInterval(interval);
      breakBool = false;
      longBreakStart();
    }
    else{
      run = true;
      focusCount++;
      focusCounter++;
      clearInterval(interval);
      breakBool = false;
      breakStart();
    }
  }
  else if(sessionName === "Break"){
    breakBool = true;
    breakCount++;
    shortBreakCount++;
    clearInterval(interval);
    run = false;
    start();
  }
  else if(sessionName === "Long"){
    breakBool = true;
    breakCount++;
    longBreakCount++;
    clearInterval(interval);
    run = false;
    start();
  }
}

function reset(){
  clearInterval(interval);
  
  if(sessionName === "Focus"){
    clearInterval(interval);
    run = false;
    breakBool = false;
    start();
  }

  else if(sessionName === "Break"){
    clearInterval(interval);
    breakBool = false;
    breakStart();
  }

  else if(sessionName === "Long"){
    clearInterval(interval);

    breakBool = false;
    longBreakStart();
  }
}
