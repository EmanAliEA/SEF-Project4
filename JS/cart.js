import { Session_Storage, saveToStorage, LOCAL_STORAGE } from "./index.js";
// {profile , login}
let currProfile = JSON.parse(sessionStorage.getItem(Session_Storage));
let users = JSON.parse(localStorage.getItem(LOCAL_STORAGE));
// {quantity: 1, product: {…}, index: '1'}
let carts = currProfile?.profile._carts;
// {product: {…}, index: '0'}
let favors = currProfile?.profile._favors;
const products = document.querySelector(".products");
const favProducts = document.querySelector(".favProducts");
const total_price = document.querySelector(".total-price");
const homePage = document.querySelector(".homePage");
const logoutBtn = document.querySelector(".logoutBtn");

// Code

// create cart of favorite item
function createItem(item, parent, type) {
  const element =
    type === "cart"
      ? `
         <div
            class="card mb-3 p-0 rounded-3 bg-secondary-subtle col-6"
            style="max-width: 550px"
            data-id=${item.index}
          >
            <div class="row g-0 align-items-center">
              <div class="col-md-5 px-3 py-2">
                <img
                  src=${item.product.img}
                  class="img-fluid rounded-start rounded-1"
                  alt="..."
                />
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <p class="fw-bold">Product: ${item.product.name}</p>
                  <p class="fw-bold">Category: ${item.product.category}</p>
                  <p class="fw-bold">Price: ${item.product.price}</p>
                  <div
                    class="btns d-flex align-items-center justify-content-between"
                  >
                    <div class="icons d-flex gap-2 align-items-center">
                      <span class="quantity fw-bold fs-5">${item.quantity}</span>
                      <i
                        class="fa-solid fa-plus text-success fw-bold plusBtn"
                      ></i>
                      <i
                        class="fa-solid fa-minus text-danger fw-bold minBtn"
                      ></i>
                    </div>
                    <button class="btn btn-danger "><i class="bi bi-trash remove-cart"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `
      : `
  <div
        class="card fav-card p-2 col-4 rounded-5 bg-secondary-subtle"
        style="width: 18rem"
        data-id=${item.index}
      >
        <div class="image p-2">
          <img
            src=${item.product.img}
            class="card-img-top mb-2 rounded-4"
            alt="..."
            style='height:12rem'
          />
        </div>
        <div
          class="card-body py-1 fw-bold d-flex align-items-center justify-content-between"
        >
          <div class="details g-3">
            <p class="mb-1">Product: ${item.product.name}</p>
            <p class="mb-4">Category: ${item.product.category}</p>
          </div>
          <i class="bi bi-heart-fill text-danger fs-5 fav-icon"></i>
        </div>
      </div>
`;

  parent.insertAdjacentHTML("beforeend", element);
}
//  render carts in container
function renderCarts() {
  products.innerHTML = "";
  carts.map((item) => {
    createItem(item, products, "cart");
  });
}
renderCarts();

// calculate total price of products in cart
function calculateTotalPrice() {
  const price = carts.reduce((acc, curr) => {
    acc += curr.quantity * Number(curr.product.price.slice(0, -1));
    return acc;
  }, 0);
  total_price.innerHTML = `Total price: ${price}$`;
}
calculateTotalPrice();

// render favorite items in container
function renderFav() {
  favProducts.innerHTML = "";
  if (window.innerWidth < 321) {
    favProducts.style.setProperty("padding-left", "635px", "important");
  } else if (favors.length > 3 && favors.length % 2 === 0)
    favProducts.style.setProperty("padding-left", "320px", "important");
  else if (favors.length > 3 && favors.length % 2 !== 0)
    favProducts.style.setProperty("padding-left", "632px", "important");
  else favProducts.style.removeProperty("padding-left");
  favors.map((item) => {
    createItem(item, favProducts, "fav");
  });
}
renderFav();

// function saveToStorage() {
//   currProfile.profile._carts = carts;
//   currProfile.profile._favors = favors;
//   console.log(currProfile);
//   sessionStorage.setItem(Session_Storage, JSON.stringify(currProfile));
// }

// Events
// Do events on cart item
products.addEventListener("click", (e) => {
  const id = e.target.closest(".card")?.dataset.id;
  // to remove cart from list
  if (e.target.classList.contains("remove-cart")) {
    // console.log(carts);
    carts = carts.filter((item) => {
      return Number(item.index) !== +id;
    });
  }
  // to increase quantity of specific cart
  if (e.target.classList.contains("plusBtn")) {
    carts.forEach((item) => {
      +item.index === +id && item.quantity++;
    });
  }
  // to decrease quantity of specific cart
  if (e.target.classList.contains("minBtn")) {
    carts.forEach((item) => {
      +item.index === +id && item.quantity > 0 && item.quantity--;
    });
  }
  renderCarts();
  calculateTotalPrice();
});

// Save carts & favors when go back to home page
homePage.addEventListener("click", () => {
  saveToStorage(currProfile, carts, favors);
});

// event to show all favorite items
favProducts.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("fav-icon")) {
    const id = e.target.closest(".card").dataset.id;
    favors = favors.filter((item) => {
      return +item.index !== +id;
    });
    // console.log(favors);
    renderFav();
  } else {
    const items = favProducts.querySelectorAll(".card");
    console.log(items[items.length - 1].getBoundingClientRect().left);
    if (window.innerWidth < 321) {
      items[items.length - 1].getBoundingClientRect().left > 100
        ? items.forEach((item) => {
            item.style.transform += "translateX(-245px)";
          })
        : items.forEach((item) => {
            item.style.transform += `translateX(200px)`;
          });
    } else if (items.length > 3) {
      items[items.length - 1].getBoundingClientRect().left > 1000
        ? items.forEach((item) => {
            item.style.transform += "translateX(-310px)";
          })
        : items.forEach((item) => {
            item.style.transform += `translateX(${(items.length - 3) * 310}px)`;
          });
    }
  }
});

logoutBtn.addEventListener("click", () => {
  currProfile.login = false;
  currProfile.profile._carts = carts;
  currProfile.profile._favors = favors;
  // {profile , login}
  // console.log(currProfile);
  // [{profile , login}]
  users = users.map((item) => {
    return item.profile._email === currProfile.profile._email
      ? currProfile
      : item;
  });
  // console.log(users);
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(users));
  sessionStorage.clear();
});
