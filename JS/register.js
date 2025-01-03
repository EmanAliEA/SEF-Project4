import { Profile, LOCAL_STORAGE } from "./index.js";

// Deceleration
const regForm = document.querySelector(".regForm");
const users = !localStorage.getItem(LOCAL_STORAGE)
  ? []
  : JSON.parse(localStorage.getItem(LOCAL_STORAGE));
regForm.reset();
let user = {};

regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = regForm.querySelector(`input[id='fn']`).value;
  const lastName = regForm.querySelector(`input[id='ln']`).value;
  const email = regForm.querySelector(`input[type='email']`).value;
  const password = regForm.querySelector(`input[type='password']`).value;
  const newProfile = new Profile(email, password, firstName, lastName);
  user.profile = newProfile;
  user.login = false;
  // console.log(users);
  users.push(user);
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(users));
  regForm.reset();
  window.location.replace("http://127.0.0.1:8080/HTML/login.html");
});
