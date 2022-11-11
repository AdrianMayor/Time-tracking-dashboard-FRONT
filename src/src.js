"use strict";

// Main url
const apiUrl = "http://localhost:4005";

let isUserLogged = false;
// Select DOM items to modify
const currentTime = document.querySelectorAll(".timeCard__info--time");
const recordedTime = document.querySelectorAll(".timeCard__info--pastTime");

// Select elements
// signup form
const signupForm = document.forms.signUpForm;
// login form
const loginForm = document.forms.loginForm;
// edit form
let editUserForm;
// rgister hours form
let registerHoursForm;

// signup / login popups
const signupButton = document.querySelector(".signUpButton");
let loginButton = document.querySelector(".loginButton");
const signupPopUp = document.querySelector(".signUp__popUp");
const loginPopUp = document.querySelector(".login__popUp");
let editPopUp;
const closeSignupPopUpButton = document.querySelector(".signUpPopup__closeBtn");
const closeLoginPopUpButton = document.querySelector(".loginPopup__closeBtn");
let closeEditPopUpButton;
let logoutButton;

// Edit user submit
let editUserButton;

// select hours to register
let hoursRegisterSelect;
let hoursRecord;
let registerHoursButton;

// time select
const dailyButton = document.querySelector("#daily");
const weeklyButton = document.querySelector("#weekly");
const monthlyButton = document.querySelector("#monthly");

// user login control
isUserLogged = checkUserLogged();

// Get JSON or API data
async function getData(endpoint = "/hours/daily") {
  const demoData = "../src/data.json";

  let response;
  try {
    if (isUserLogged) {
      response = await fetch(apiUrl + endpoint, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    } else {
      response = await fetch(demoData);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error("Something went wrong", err);
  }
}

/* ------ Adding triggers events to buttons ------- */

// signup / login popups
signupButton.addEventListener("click", () => {
  signupPopUp.classList.add("active");
});
closeSignupPopUpButton.addEventListener("click", () => {
  signupPopUp.classList.remove("active");
});
loginButton?.addEventListener("click", () => {
  loginPopUp.classList.add("active");
});
closeLoginPopUpButton.addEventListener("click", () => {
  loginPopUp.classList.remove("active");
});
closeEditPopUpButton?.addEventListener("click", () => {
  editPopUp.classList.remove("active");
  location.reload();
  setTimeout(() => {}, 500);
});

// signup
signupForm.addEventListener("submit", handleSignupForm);
// login
loginForm.addEventListener("submit", handleLoginForm);
// Logout
logoutButton?.addEventListener("click", handleLogout);
// Edit user
editUserButton?.addEventListener("click", handleEditUserForm);

// Show category hours
hoursRegisterSelect?.addEventListener("change", handleRegisteredHours);

// Register hour
registerHoursForm?.addEventListener("submit", handleRegisterHourButton);

// time selector button
dailyButton.addEventListener("click", (event) => {
  printHours(event.target.id, "Yesterday", "/hours/daily");
});
weeklyButton.addEventListener("click", (event) => {
  printHours(event.target.id, "Last week", "/hours/weekly");
});
monthlyButton.addEventListener("click", (event) => {
  printHours(event.target.id, "Last month", "/hours/monthly");
});

// To hover visual card design
addEventListener("mouseover", handleNotHoverThreeDotsButton);

/* ------ Function that prints data with DOM id ------- */
async function printHours(event, sentence, endpoint) {
  let data = await getData(endpoint);
  selectedTime(event);
  printProfile();

  if (isUserLogged) data = data.data.hours;

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

// Print profile
async function printProfile() {
  try {
    if (isUserLogged) {
      const profileName = document.querySelector(".userCard__info--name");
      const profilePic = document.querySelector(".userCard__img");

      const data = await getData("/users");
      const { name, lastname, avatar } = data.data.user;

      const avatarUrl = apiUrl + "/" + avatar;
      profileName.textContent = name + " " + (lastname ? lastname : "");

      profilePic.removeAttribute("src");

      profilePic.setAttribute("src", avatarUrl);
    }
  } catch (err) {
    console.error(err);
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

// change buttons utility once user logged
function changeButton() {
  signupButton.innerHTML = "Edit";
  signupButton.classList.add("editButton");
  signupButton.classList.remove("signUpButton");

  loginButton.innerHTML = "Log out";
  loginButton.classList.add("logoutButton");
  loginButton.classList.remove("loginButton");
  loginButton = document.querySelector(".logoutButton");
  logoutButton = document.querySelector(".logoutButton");
  editButton();
}

async function editButton() {
  const editView = document.querySelector(".signUp__popUp");
  editView.classList.add("edit__popUp");
  editView.classList.remove("signUp__popUp");
  editView.innerHTML = `
    <div class=" popup">
    <h2>Edit User</h2>
    <form id="editUser">
        <label for="editUsername">Username</label>
        <input type="text" id="editUsername" placeholder="Enter username">

        <label for="editLastname">Lastname</label>
        <input type="text" id="editLastname" placeholder="Enter lastname">

        <label for="editAvatar">Profile Pic</label>
        <input type="file" id="editAvatar">
        <button class="editUser__button">Edit</button>
    </form>
    <p>	</p>

    <h2>Register hours</h2>
    <form id="registerHours">
        <select name="category">
            <option disabled selected hidden value="">Category</option>
            <option value="Work">Work</option>
            <option value="Play">Play</option>
            <option value="Study">Study</option>
            <option value="Exercise">Exercise</option>
            <option value="Social">Social</option>
            <option value="SelfCare">Self Care</option>
        </select>

        <label for="hours">hours</label>
        <input type="number" id="hours" placeholder="Enter hours">

        <label for="workDate">Date</label>
        <input type="date" id="workDate" placeholder="Enter Date">
        <button class = "registerHours__button">Send</button>
    </form>
    <p>	</p>
    
    <div class="hoursRecord"></div>

    <button class="editPopup__closeBtn popup__closeBtn">
        <img src="./assets/icons/close.png" alt="close icon">
    </button>
</div>`;

  editPopUp = document.querySelector(".edit__popUp");
  closeEditPopUpButton = document.querySelector(".editPopup__closeBtn");
  editUserButton = document.querySelector(".editUser__button");
  editUserForm = document.forms.editUser;
  hoursRegisterSelect = document.querySelector("#registerHours select");
  hoursRecord = document.querySelector(".hoursRecord");
  registerHoursButton = document.querySelector(".registerHours__button");
  registerHoursForm = document.forms.registerHours;
}

// Check user logged
function checkUserLogged() {
  if (localStorage.getItem("token")) {
    changeButton();
    return true;
  } else {
    return false;
  }
}

async function getAllHours() {
  const data = await getData("/hours");

  return data;
}

function printAllHoursFromCategory(array) {
  hoursRecord.textContent = "";

  const register = document.createDocumentFragment();

  const registerHourTitles = document.createElement("div");
  const hourTitle = document.createElement("p");
  const workDateTitle = document.createElement("p");

  hourTitle.textContent = "Hours";
  workDateTitle.textContent = "Date";

  registerHourTitles.append(workDateTitle);
  registerHourTitles.append(hourTitle);

  register.append(registerHourTitles);

  for (const hour of array) {
    const hourRegisterContent = document.createElement("div");
    const hourRegister = document.createElement("p");
    const hourWorkDate = document.createElement("p");

    hourRegister.textContent = hour.hours;
    hourWorkDate.textContent = hour.workDate;

    hourRegisterContent.append(hourWorkDate);
    hourRegisterContent.append(hourRegister);

    register.append(hourRegisterContent);
  }

  hoursRecord.append(register);
}

// Controller functions

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

// handle sign up
async function handleSignupForm(e) {
  e.preventDefault();

  const signupUsername = signupForm.elements.signupUsername;
  const signupPassword = signupForm.elements.signupPassword;

  try {
    const response = await fetch(apiUrl + "/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: signupUsername.value,
        password: signupPassword.value,
      }),
    });

    const data = await response.json();

    const message = document.querySelector(".signUp__popUp p");

    if (data.status === "error") {
      message.classList.add("error");
      message.innerHTML = data.message;
      setTimeout(() => {
        message.innerHTML = "";
        message.classList.remove("error");
      }, 5000);
    } else {
      message.classList.add("success");
      message.innerHTML = data.message;
      setTimeout(() => {
        message.innerHTML = "";
        message.classList.remove("success");
        signupPopUp.classList.remove("active");
      }, 5000);
    }
  } catch (err) {
    console.error(err);
  } finally {
    signupForm.reset();
  }
}

// handle login
async function handleLoginForm(e) {
  e.preventDefault();

  const loginUsername = loginForm.elements.loginUsername;
  const loginPassword = loginForm.elements.loginPassword;

  try {
    const response = await fetch(apiUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: loginUsername.value,
        password: loginPassword.value,
      }),
    });

    const data = await response.json();

    const message = document.querySelector(".login__popUp p");

    if (data.status === "error") {
      message.classList.add("error");
      message.innerHTML = data.message;
      setTimeout(() => {
        message.innerHTML = "";
        message.classList.remove("error");
      }, 5000);
    } else {
      message.classList.add("success");
      message.innerHTML = data.message;
      localStorage.setItem("token", data.data.token);
      setTimeout(() => {
        isUserLogged = checkUserLogged();
        printHours("daily", "Yesterday");
        printProfile();
        message.innerHTML = "";
        message.classList.remove("success");
        loginPopUp.classList.remove("active");
        location.reload();
      }, 1500);
    }
  } catch (err) {
    console.error(err);
  } finally {
    loginForm.reset();
  }
}
// handle logout
function handleLogout() {
  localStorage.removeItem("token");
  location.reload();
}

// Function handle edit user form
async function handleEditUserForm(e) {
  e.preventDefault();

  const editUsername = editUserForm.elements.editUsername;
  const editLastname = editUserForm.elements.editLastname;
  const editAvatar = editUserForm.elements.editAvatar;
  const formData = new FormData();

  formData.append("name", editUsername.value);
  formData.append("lastname", editLastname.value);
  formData.append("avatar", editAvatar.files[0]);

  try {
    const response = await fetch(apiUrl + "/users", {
      method: "PUT",
      body: formData,
      contentType: false,
      processData: false,
      dataType: "json",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await response.json();

    const message = document.querySelector(".edit__popUp p:first-of-type");

    if (data.status === "error") {
      message.classList.add("error");
      message.innerHTML = data.message;
      setTimeout(() => {
        message.innerHTML = "";
        message.classList.remove("error");
      }, 5000);
    } else {
      message.classList.add("success");
      message.innerHTML = data.message;
      setTimeout(() => {
        message.innerHTML = "";
        message.classList.remove("success");
      }, 2500);
    }
  } catch (err) {
    console.error(err);
  } finally {
    editUserForm.reset();
  }
}

async function handleRegisteredHours(event) {
  const allHours = await getAllHours();

  const option = event.target.options[event.target.selectedIndex].text;

  const allHoursFromCategory = allHours.data.hours.filter((hours) => {
    return hours.category === option;
  });

  printAllHoursFromCategory(allHoursFromCategory);
}

async function handleRegisterHourButton(e) {
  e.preventDefault();

  const option = document.querySelector("#registerHours select");

  const category = option[option.selectedIndex].text;
  const hourWorked = document.querySelector("#hours").value;
  const workDate = document.querySelector("#workDate").value;

  console.log(category, hourWorked, workDate);

  try {
    const response = await fetch(apiUrl + "/hours", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        hours: hourWorked,
        workDate: workDate,
        category: category,
      }),
    });

    const data = await response.json();

    const message = document.querySelector(".edit__popUp  p:last-of-type");

    if (data.status === "error") {
      message.classList.add("error");
      message.innerHTML = data.message;
      setTimeout(() => {
        message.innerHTML = "";
        message.classList.remove("error");
      }, 5000);
    } else {
      message.classList.add("success");
      message.innerHTML = data.message;
      hoursRecord.textContent = "";
      setTimeout(() => {
        message.innerHTML = "";
        message.classList.remove("success");
      }, 5000);
    }
  } catch (err) {
    console.error(err);
  } finally {
    registerHoursForm.reset();
  }
}

// Initialize app with daily data
printHours("daily", "Yesterday");
