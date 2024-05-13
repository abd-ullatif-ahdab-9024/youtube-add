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
const addZeroFn = (a) => {
  if (a < 10) {
    return `0${a}`;
  }
  return a;
};
const timerFn = () => {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  setInterval(() => {
    let date = new Date();
    if (localStorage.getItem("the-time") === null) {
      localStorage.setItem("the-date", date.getDay());
    }

    if (+localStorage.getItem("the-date") !== date.getDay()) {
      localStorage.removeItem("the-time");
    }

    if (localStorage.getItem("the-time") != null) {
      let arr = localStorage.getItem("the-time").split(":");

      hours = arr[0];
      minutes = arr[1];
      seconds = arr[2];
    }

    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      seconds++;
      minutes++;
    }
    if (minutes >= 60) {
      minutes = 0;

      hours++;
    }
    p.textContent = `${addZeroFn(hours)}:${addZeroFn(minutes)}:${addZeroFn(
      seconds
    )}`;
    localStorage.setItem("the-time", `${hours}:${minutes}:${seconds}`);
  }, 1000);
};

timerFn();

const showAndHideFn = (e) => {
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
