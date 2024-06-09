let theBody = document.querySelector("body");
let onScreen = document.querySelector("#onScreen")
let image = document.querySelector("#image")
let camOverlay = document.querySelector("#overlay img");
let lightButton = document.querySelector("#light");

theBody.addEventListener("mousemove", function(){
  console.log(event.clientY);
  console.log(event.clientX);
  if (event.clientY < 100) {
    onScreen.innerHTML = '<img src="img/eastHallway.png">'
  }else {
    onScreen.innerHTML = '<img src="img/office.png">'
  }
  if (event.clientX < 300) {
    onScreen.innerHTML = '<img src="img/westHallway.png">'
  }
  if (event.clientX > 900) {
    onScreen.innerHTML = '<img src="img/officeLight.png">'
  }
  if (event.clientY > 500) {
    onScreen.innerHTML = '<img src="img/static.gif">'
  }
});
