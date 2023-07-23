console.log("js load");
 // Var
let body = document.querySelector("body");
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let p3 = document.querySelector("#p3");
let theText = document.querySelector("#theText");
let counter = 01

 // Events
let p1newPos = setInterval( function(){
  let marginT = Math.random() * 50;
  p1.style.marginLeft = marginT + "%";
  // console.log("NewPos");

  let p1newWeight = Math.random() * 800;
  p1.style.fontWeight = p1newWeight

  let p1NewLineWidth = 10+ Math.random() * 600;
  p1.style.width = p1NewLineWidth+"px";
}, 700);
let p2newPos = setInterval( function(){
  let marginT = Math.random() * 50;
  let marginY = Math.random() * 20;
  p2.style.marginLeft = marginT + "%";
  p2.style.marginTop = marginY + "%"
  // console.log("NewPos");

  let p1newWeight = Math.random() * 800;
  p2.style.fontWeight = p1newWeight

  let p1NewLineWidth = 10+ Math.random() * 600;
  p2.style.width = p1NewLineWidth+"px";
}, 500);
let p3newPos = setInterval( function(){
  let marginT = Math.random() * 50;
  p3.style.marginLeft = marginT + "%";
  // console.log("NewPos");

  let p1newWeight = Math.random() * 800;
  p3.style.fontWeight = p1newWeight

  let p1NewLineWidth = 10+ Math.random() * 600;
  p3.style.width = p1NewLineWidth+"px";
  if (counter > 98) {
    p3.innerHTML = "null00";
  } else {
    counter = counter+1;
    p3.innerHTML = counter;
  }
}, 300);

body.addEventListener("mousemove", function(){
  let topP = event.clientY;
  theText.style.top = -300+topP+"px";

  let leftP = event.clientX;
  theText.style.left = -300+leftP+"px";
});
