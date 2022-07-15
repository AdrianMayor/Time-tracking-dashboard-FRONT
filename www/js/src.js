"use strict";

// Select DOM items to modify
const currentTime = document.querySelectorAll(".timeCard__info--time");
const recordedTime = document.querySelectorAll(".timeCard__info--pastTime");

// Select elements
const dailyButton = document.querySelector("#daily");
const weeklyButton = document.querySelector("#weekly");
const monthlyButton = document.querySelector("#monthly");
const threeDots = document.querySelectorAll("button");

// Get JSON data
async function getData() {
  const response = await fetch("../../data.json");

  const data = await response.json();

  return data;
}

// Adding triggers events to buttons | To time selector button | To hover visual card design
dailyButton.addEventListener("click", () => {
  printHours(event.target.id, "Yesterday");
});
weeklyButton.addEventListener("click", () => {
  printHours(event.target.id, "Last week");
});
monthlyButton.addEventListener("click", () => {
  printHours(event.target.id, "Last month");
});
addEventListener("mouseover", handleNotHoverThreeDotsButton);

// Function that prints data with DOM id
async function printHours(event, sentence) {
  const data = await getData();
  selectedTime(event);

  for (let i = 0; i < data.length; i++) {
    const { current, previous } = data[i].timeframes[event];

    currentTime[i].classList.remove("fade");
    recordedTime[i].classList.remove("fade");

    setTimeout(() => {
      currentTime[i].innerHTML = `${current}hrs`;
      recordedTime[i].innerHTML = `${sentence} - ${previous}hrs`;

      currentTime[i].classList.add("fade");
      recordedTime[i].classList.add("fade");
    }, 225);
  }
}

// Styles in time selected
function selectedTime(event) {
  switch (event) {
    case "daily":
      dailyButton.classList.add("selected");
      weeklyButton.classList.remove("selected");
      monthlyButton.classList.remove("selected");
      break;

    case "weekly":
      dailyButton.classList.remove("selected");
      weeklyButton.classList.add("selected");
      monthlyButton.classList.remove("selected");
      break;

    case "monthly":
      dailyButton.classList.remove("selected");
      weeklyButton.classList.remove("selected");
      monthlyButton.classList.add("selected");
      break;
  }
}

// initialize card background while hover over the three dots button
let changedClassName;
function handleNotHoverThreeDotsButton(event) {
  const { alt } = event.target;
  if (alt === "Three dots") {
    const className = event.target.offsetParent.offsetParent.classList[1];
    const card = document.querySelector(`.${className} .timeCard__info`);
    changedClassName = className;
    card.classList.add("notHover");
  }
  if (changedClassName && alt !== "Three dots") {
    const card = document.querySelector(`.${changedClassName} .timeCard__info`);
    card.classList.remove("notHover");
  }
}

// Initialize app with daily data
printHours("daily", "Yesterday");
