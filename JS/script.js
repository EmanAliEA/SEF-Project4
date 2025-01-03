import { Session_Storage, LOCAL_STORAGE, saveToStorage } from "./index.js";

// Deceleration
// currUser -> {profile: {…}, login: true}
let users = JSON.parse(localStorage.getItem(LOCAL_STORAGE));
let currUser = JSON.parse(sessionStorage.getItem(Session_Storage));
const productsList = document.querySelector(".list");
const nav = document.querySelector(".nav");
const categoryList = document.querySelector(".categoryList");
const searchInp = document.querySelector(".searchInp");
// Variables
const products = [
  {
    name: "shoes",
    img: "https://th.bing.com/th/id/OIP.GKqtvWfc4zNEhm6yy-28AwAAAA?rs=1&pid=ImgDetMain",
    price: "80$",
    category: "sport",
    fav: false,
  },
  {
    name: "T-shirt adidas",
    img: "https://th.bing.com/th/id/OIP.-AvQD2X_Kcj-8l9Gbq3THgHaHa?rs=1&pid=ImgDetMain",
    price: "100$",
    category: "fashion",
    fav: false,
  },
  {
    name: "Bag adidas",
    img: "https://th.bing.com/th/id/OIP.hAb_f_fxNbmnpAmfCHAV3QHaIq?rs=1&pid=ImgDetMain",
    price: "110$",
    category: "Bags",
    fav: false,
  },
  {
    name: "Glasses",
    img: "https://www.bfgcdn.com/1500_1500_90/205-1683-0111/adidas-eyewear-jaysor-polarized-s3-vlt-13-sunglasses.jpg",
    price: "80$",
    category: "Men accessories",
    fav: false,
  },
  {
    name: "Cap",
    img: "https://th.bing.com/th/id/OIP.UAa90Y1NkcHtAKM-aiD0CAHaF7?rs=1&pid=ImgDetMain",
    price: "20$",
    category: "Men accessories",
    fav: false,
  },
  {
    name: "Bottle",
    img: "https://th.bing.com/th/id/OIP.pR5rCNslesSXZ6-85Vku-AHaD4?rs=1&pid=ImgDetMain",
    price: "50$",
    category: "sport",
    fav: false,
  },
  {
    name: "Jacket",
    img: "https://th.bing.com/th/id/R.55cc2cf0ac8c827005973dab4b0a0dbe?rik=FTVUj3hnKHhfIw&riu=http%3a%2f%2fs7ondemand1.scene7.com%2fis%2fimage%2fMoosejawMB%2f10229507x1080909_zm%3f%24product1000%24&ehk=X%2fMMuwfYwu6QT3ZLxgXZznN6p88P69r9gck%2f9%2bzi3ic%3d&risl=&pid=ImgRaw&r=0",
    price: "120$",
    category: "fashion",
    fav: false,
  },
  {
    name: "Earpods",
    img: "https://th.bing.com/th/id/OIP.zOwcvciMswNXsty-sjKxNQHaHW?rs=1&pid=ImgDetMain",
    price: "150$",
    category: "phone accessories",
    fav: false,
  },
];

console.log(currUser);

let carts = currUser?.profile._carts;
let favors = currUser?.profile._favors;

// console.log(carts);
// console.log(favors);

// Code

// create productItem
function createElement(product, index) {
  const html = `
       <div class="card p-2 mb-4 col-4 item-list" data-id=${index} style="width: 20rem">
            <img
              src=${product.img}
              class="card-img-top mb-2 rounded-1"
              alt="..."
              width='300px'
              height='200px'
            />
            <div
              class="card-body fw-bold d-flex flex-column justify-content-between"
            >
              <div class="details g-3">
                <p class="mb-1">Product: ${product.name}</p>
                <p class="mb-1">Price: ${product.price}</p>
                <p class="mb-4">Category: ${product.category}</p>
              </div>
              <div class="footer d-flex justify-content-between">
                <button  class="${
                  carts?.find((item) => +item.index === +index)
                    ? "btn-danger"
                    : "btn-primary"
                } btn btn-primary ">${
    carts?.find((item) => +item.index === +index)
      ? "Remove from cart"
      : "Add to cart"
  }</button>
                <i
                  class="${
                    favors?.find((item) => +item.index === +index)
                      ? "fav"
                      : "text-secondary"
                  } 
                  bi bi-heart-fill fs-5 pointer-event "
                ></i>
              </div>
            </div>
          </div>
  `;
  productsList.insertAdjacentHTML("beforeend", html);
}

// create cartItem in carts list
function createCartItem(item, parent) {
  const html = `
                <li class="dropdown-item rounded-1 py-2 px-1 mb-1 bg-light d-flex justify-content-between "data-id=${item.index}>
                    <p class='m-0 text-primary'>${item.product.name}</p>
                    <div>
                      <span class='countItem fw-bold text-primary numQuant'>${item.quantity}</span>
                      <i class="fa-solid fa-plus text-success fw-bold plusBtn"
                      ></i>
                      <i class="fa-solid fa-minus text-danger fw-bold minBtn"
                      ></i>

                    </div>
                  </li>
`;
  parent.insertAdjacentHTML("beforeend", html);
}

// Display products in carts
function renderCart() {
  const cart_List = nav.querySelector(".cart-list");
  const numCart = nav.querySelector(".numCart");
  cart_List.innerHTML = "";
  // element =>{quantity , product , i}
  carts.map((element) => {
    createCartItem(element, cart_List);
  });
  numCart.innerHTML = carts.length;
}

if (currUser?.login) setTimeout(renderCart, 500);
// Display products i
function renderProducts(products) {
  productsList.innerHTML = "";
  products.forEach((element, i) => {
    createElement(element, i);
  });
}

renderProducts(products);

function renderNav() {
  if (currUser?.login) {
    nav.querySelector(".welcomeName").classList.remove("hidden");
    const name = currUser?.profile.firstName + currUser?.profile.lastName;
    nav.querySelector(".welcomeName").innerHTML = `welcome ${name}`;
    createNav("cart", "Logout");
  } else {
    nav.querySelector(".welcomeName").classList.add("hidden");
    createNav("login", "register");
  }
}

// create nav
function createNav(link1, link2) {
  const el = ` <div class="btn-group text-primary fw-bold d-flex align-items-center ">
          ${
            link1 === "login"
              ? `<a class="btn text-capitalize" href="HTML/${link1}.html"> ${link1}</a>`
              : `

              <div class="dropdown bg-secondary-subtle">
                <button class="dropdown-btn text-primary fw-bold bg-body-secondary "><i class="bi bi-cart-fill me-0"></i> <sub class='numCart'>0</sub> ${link1}</button>
                <div class="dropdown-content pt-2 bg-secondary-subtle text-center"style='width:15rem;'>
                  <ul class='px-2 w-100 cart-list'>
                  </ul>
                  <a href='HTML/cart.html' class='text-decoration-none viewProduct' >View all product</a>
                </div>
              </div>
             `
          }

          <a class="btn text-capitalize ${
            link2 === "Logout" ? "logout" : ""
          }" href="HTML/${
    link2 === "Logout" ? "login" : link2
  }.html">${link2}</a>
        </div>`;
  nav.insertAdjacentHTML("beforeend", el);
}
renderNav();

// function saveToStorage(currUser) {
//   currUser.profile.carts = carts;
//   currUser.profile.favors = favors;
//   // console.log(currUser);
//   sessionStorage.setItem(Session_Storage, JSON.stringify(currUser));
// }

// Events

// handle favorite and add button
productsList.querySelectorAll(".card").forEach((element) => {
  element.addEventListener("click", (e) => {
    const element = e.target;
    if (
      (element.tagName === "I" || element.tagName === "BUTTON") &&
      !currUser?.login
    )
      window.location.replace("http://127.0.0.1:8080/HTML/login.html");
    else {
      if (element.tagName === "BUTTON") {
        // console.log(element);
        element.classList.contains("btn-danger")
          ? (element.textContent = "Add to cart")
          : (element.textContent = "Remove from cart");
        element.classList.toggle("btn-danger");
        const i = element.closest(".card").dataset.id;

        element.classList.contains("btn-danger")
          ? carts.push({ quantity: 1, product: products[i], index: i })
          : (carts = carts.filter((element) => element.index !== i));

        renderCart();
        // if (element.classList.contains("btn-danger")) {
        //   carts.push({ quantity: 1, product: products[i], index: i });
        //   // products[i].fav = true;
        //   // currUser.profile._carts.push(+i);
        // } else {
        //   carts = carts.filter((element) => element.index !== i);
        //   // products[i].fav = false;
        //   // currUser.profile._carts = currUser.profile._carts.filter(
        //   //   (id) => id !== +i
        //   // );
        // }
      }
      if (element.tagName === "I") {
        // console.log(element);
        element.classList.toggle("text-danger");
        const i = element.closest(".card").dataset.id;

        element.classList.contains("text-danger")
          ? favors.push({ product: products[i], index: i })
          : (favors = favors.filter((element) => element.index !== i));

        // if (element.classList.contains("text-danger")) {
        //   favours.push({ quantity: 1, product: products[i], index: i });
        //   products[i].fav = true;
        //   currUser.profile._favours.push(+i);
        // } else {
        //   favours = favours.filter((element) => element.index !== i);
        // }
      }
    }
  });
});

// handle search
searchInp.addEventListener("input", (e) => {
  // Search by category
  if (categoryList.value === "category") {
    const search = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.category.toLowerCase().includes(search)
    );
    renderProducts(filteredProducts);
  }

  // Search by name
  else {
    const search = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(search)
    );
    renderProducts(filteredProducts);
  }
});

nav.addEventListener("click", (e) => {
  // e.preventDefault();
  if (e.target.classList.contains("viewProduct")) {
    saveToStorage(currUser, carts, favors);
  }
  let cartIndex = +e.target.closest(".dropdown-item")?.dataset.id;
  // Decrease quantity of item
  if (e.target.classList.contains("minBtn")) {
    // carts =>{quantity , product , i}
    const item = carts.find((item) => +item.index === cartIndex);
    item.quantity < 1
      ? (carts = carts.filter((item) => +item.index !== cartIndex))
      : carts.forEach((item) => {
          return +item.index === cartIndex
            ? { ...item, quantity: item.quantity-- }
            : item;
        });
    renderCart();
  }
  // Increase quantity of item
  if (e.target.classList.contains("plusBtn")) {
    // carts =>{quantity , product , i}
    carts.forEach((item) => {
      return +item.index === cartIndex
        ? { ...item, quantity: item.quantity++ }
        : item;
    });
    renderCart();
  }
  // Show CartList
  if (e.target.classList.contains("dropdown-btn")) {
    const menu = document.querySelector(".dropdown-content");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
  if (e.target.classList.contains("logout")) {
    // e.preventDefault();
    currUser.login = false;
    currUser.profile._carts = carts;
    currUser.profile._favors = favors;
    // {profile , login}
    // console.log(currUser);
    // [{profile , login}]
    users = users.map((item) => {
      return item.profile._email === currUser.profile._email ? currUser : item;
    });
    // console.log(users);
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(users));
    sessionStorage.clear();
  }
});
