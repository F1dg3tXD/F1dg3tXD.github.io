console.log("Input Recieved");
// make button change <body> and #text
// Grab button and bg
let theButton = document.querySelector("#aButton");
let theBody = document.querySelector("body");
let text = document.querySelector("#text");
// listener clicks
theButton.addEventListener("click", function(){
  if (text.innerHTML == "Off") {
    // A. Change background
    theBody.style.backgroundColor = "white";
    // B. Change text
    text.innerHTML = "On";
    text.style.color = "black";
  }
  else if (text.innerHTML == "On") {
    // A. Change background
    theBody.style.backgroundColor = "grey";
    // B. Change text
    text.innerHTML = "Off";
    text.style.color = "white";
  }
});

// interactive backgroundColor
theBody.addEventListener("mousemove", function(){
  if (event.clientY < window.innerHeight/2) {
    theBody.style.backgroundColor = "red";
    theButton.innerHTML = "UP";
  }else {
    theBody.style.backgroundColor = "blue";
    theButton.innerHTML = "DOWN";
  }
});
