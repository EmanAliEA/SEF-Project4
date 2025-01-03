import { LOCAL_STORAGE, LINK, Session_Storage } from "./index.js";

// Deceleration
const formLogin = document.querySelector(".formLogin");
const users = !localStorage.getItem(LOCAL_STORAGE)
  ? []
  : JSON.parse(localStorage.getItem(LOCAL_STORAGE));
// console.log(users);
let user = {};
// Code
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = formLogin.querySelector(`input[type='email']`).value;
  const password = formLogin.querySelector(`input[type='password']`).value;
  checkLogin(email, password);
});

function checkLogin(curEmail, curPass) {
  if (!curEmail || !curPass) return alert("Complete Data");
  const link = LINK.slice(0, LINK.indexOf("HTML") - 1);
  if (!users?.length) {
    alert("This data isn't logged");
    return window.location.replace(link + "/HTML/register.html");
  }
  user = users.find((element) => {
    return (
      element.profile._email === curEmail &&
      element.profile._password === curPass
    );
  });
  if (!user) {
    alert("Invalid data");
    return window.location.replace(link + "/HTML/register.html");
  }
  formLogin.reset();
  user.login = true;
  // {profile: {…}, login: true}
  console.log(user);
  // [{profile: {…}, login: true}]
  console.log(users);

  sessionStorage.setItem(Session_Storage, JSON.stringify(user));
  window.location.replace(link);
}
