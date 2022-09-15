let paramString = window.location.search.replace("?", "");
let queryString = new URLSearchParams(paramString);

window.onload = init;

let second = 0;
let minute = 0;
let hour = 0;
let day = new Date(Date.now()).getDay();

function init() {
  setReloadButtonSecondary();
  if (Array.from(queryString).length == 0) {
    hideDiv("timer-div");
  } else {
    hideDiv("timer-form");
    second = queryString.get("formSeconds");
    minute = queryString.get("formMinutes");
    hour = queryString.get("formHours");
    (function () {
      let end = new Date(Date.now());
      end.setHours(end.getHours() + Number(hour));
      end.setMinutes(end.getMinutes() + Number(minute));
      end.setSeconds(end.getSeconds() + Number(second));

      const countDown = new Date(end).getTime(),
        x = setInterval(function () {
          const now = new Date(Date.now());
          const remainingTime = end.getTime() - now.getTime();
          let diff = remainingTime;

          const remainDays = Math.floor(diff / (1000 * 60 * 60 * 24));
          diff -= remainDays * (1000 * 60 * 60 * 24);

          const remainHours = Math.floor(diff / (1000 * 60 * 60));
          diff -= remainHours * (1000 * 60 * 60);

          const remainMins = Math.floor(diff / (1000 * 60));
          diff -= remainMins * (1000 * 60);

          const remainSeconds = Math.floor(diff / 1000);
          diff -= remainSeconds * 1000;

          document.getElementById("days").innerText = remainDays;
          document.getElementById("hours").innerText = remainHours;
          document.getElementById("minutes").innerText = remainMins;
          document.getElementById("seconds").innerText = remainSeconds;

          //do something later when date is reached
          if (remainingTime < 0) {
            document.getElementById("headline").innerText = "Times over!";
            document.getElementById("countdown").style.display = "none";
            setReloadButtonPrimary();

            clearInterval(x);
          }
          //seconds
        }, 0);
    })();
  }
}

function hideDiv(id) {
  document.getElementById(id).style.display = "none";
}

function playEndSound() {
  document.getElementById("timer-alarm").play();
  alert("Thank you!");
}

function reload() {
  let baseUrl = window.location.href.split("?")[0];
  window.location.replace(baseUrl);
}

function setReloadButtonPrimary() {
  const buttonClasses = document.getElementById("Reload").classList;
  buttonClasses.remove("btn-secondary");
  buttonClasses.add("btn-primary");
}

function setReloadButtonSecondary() {
  const buttonClasses = document.getElementById("Reload").classList;
  buttonClasses.remove("btn-primary");
  buttonClasses.add("btn-secondary");
}
