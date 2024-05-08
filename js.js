"use strict";

const div = document.createElement("div");
const backgroundDiv = document.createElement("div");
const p = document.createElement("p");
p.style.cssText = "font-size:30px; color:white;";
div.id = "aboo";
div.style.cssText =
  "height:130px;width:160px;margin:25px; display:flex; position: fixed; left:0; bottom:0; z-index:2038; ";
backgroundDiv.style.cssText =
  "background: rgb(245,39,109);background: linear-gradient(73deg, rgba(245,39,109,1) 24%, rgba(18,230,228,1) 81%);color:white; width:100%; height:100%; display:flex; justify-content:center;align-items:center;";

backgroundDiv.appendChild(p);

backgroundDiv.classList.add("na");

div.appendChild(backgroundDiv);

const timerFn = () => {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  setInterval(() => {
    // if (localStorage.getItem("the-time") === null) {
    //   let date = new Date();
    //   console.log(date.getDate());
    //   //   localStorage.setItem("m-date", newDate());
    // }

    if (localStorage.getItem("the-time") !== null) {
      let timeArray = localStorage.getItem("the-time").split(":");
      let hours2 = timeArray[0];
      let minutes2 = timeArray[1];
      let seconds2 = timeArray[2];
      hours = hours2;
      minutes = minutes2;
      seconds = seconds2;
    }

    seconds++;

    if (seconds === 60) {
      seconds = 0;
      seconds++;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    if (seconds < 10) {
      p.textContent = `${hours}:${minutes}:0${seconds}`;
    }
    if (minutes < 10) {
      p.textContent = `${hours}:0${minutes}:${seconds}`;
    }
    if (hours < 10) {
      p.textContent = `0${hours}:${minutes}:${seconds}`;
    }

    localStorage.setItem("the-time", `${hours}:${minutes}:${seconds}`);
  }, 4000);
};
timerFn();
showAndHideFn = (e) => {
  if (e.ctrlKey === true && e.shiftKey === true && e.key === "H") {
    console.log("youtube.com");
    div.style.display = "flex";

    document.body.appendChild(div);
    return;
  }

  if (e.shiftKey === true && e.key === "A") {
    div.style.display = "none";
    document.body.appendChild(div);
  }
};

window.addEventListener("keydown", showAndHideFn);