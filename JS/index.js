const LOCAL_STORAGE = "Users";
const Session_Storage = "login";
const LINK = window.location.href;

class Profile {
  _carts = [];
  _favors = [];
  _email;
  _password;
  constructor(email, pass, firstName, lastName) {
    this._email = email;
    this._password = pass;
    this.firstName = firstName;
    this.lastName = lastName;
  }
  setEmail(email) {
    this._email = email;
  }
  getEmail() {
    return this._email;
  }
  setPassword(pass) {
    this._password = pass;
  }
  getPassword() {
    return this._password;
  }
  setCart(cart) {
    this._carts.push(cart);
  }
  getCart() {
    return this._carts;
  }
  setFavour(fav) {
    this._favours.push(fav);
  }
  getCart() {
    return this._favours;
  }
}
function saveToStorage(currUser, carts, favors) {
  currUser.profile._carts = carts;
  currUser.profile._favors = favors;
  // console.log(currUser);
  sessionStorage.setItem(Session_Storage, JSON.stringify(currUser));
}

export { Profile, LOCAL_STORAGE, LINK, Session_Storage, saveToStorage };
