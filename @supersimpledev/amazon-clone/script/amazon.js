import { loadProducts, products } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let filteredProducts = getSearchResult() || products;

  let poductsHTML = "";
  // Generating the HTML for the products
  filteredProducts.forEach((product) => {
    poductsHTML += `
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image" src="${product.image}" />
        </div>

        <div class="product-name limit-text-to-2-lines">${product.name}</div>

        <div class="product-rating-container">
        <img
            class="product-rating-stars"
            src="${product.getStarsURL()}"
        />
        <div class="product-rating-count link-primary">${
          product.rating.count
        }</div>
        </div>

        <div class="product-price">${product.getPrice()}</div>

        <div class="product-quantity-container">
        <select class="js-qtty-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png" />
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id="${
          product.id
        }">Add to Cart</button>
    </div>

    `;
  });

  // Displaying all the products
  document.querySelector(".js-products-grid").innerHTML = poductsHTML;

  // All "Add to cart" buttons listener
  document.querySelectorAll(".js-add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset; // Getting the Product ID from data attribute
      cart.addToCart(productId);
      renderCartQtty();
      renderAddedSuccess(productId);
    });
  });
}

function renderCartQtty() {
  document.querySelector(".js-cart-quantity").innerHTML =
    cart.calcCartQtty() || 0;
}
renderCartQtty(); // Display Cart Quantity on page load

let lastAdded;
let timeoutId;
function renderAddedSuccess(productId) {
  // Display success(added) message above add to cart btn
  const addedMsgDisplayer = document.querySelector(
    `.js-added-to-cart-${productId}`
  );
  addedMsgDisplayer.classList.add("added-to-cart-success");

  /* Making the message dissappear after 2 secs */

  // If you add to cart for the first time
  if (!timeoutId) {
    timeoutId = setTimeout(() => {
      addedMsgDisplayer.classList.remove("added-to-cart-success");
    }, 2000);
    lastAdded = productId;
  } else if (lastAdded == productId && timeoutId) {
    // If the same product is added to cart for the 2nd/more time
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      addedMsgDisplayer.classList.remove("added-to-cart-success");
    }, 2000);
    return;
  } else {
    // If another product is added to cart
    timeoutId = setTimeout(() => {
      addedMsgDisplayer.classList.remove("added-to-cart-success");
    }, 2000);
    lastAdded = productId;
  }
}

function getSearchResult() {
  const url = new URL(window.location.href);
  const searchUrlValue = url.searchParams.get("search");

  let searchResult = [];
  if (searchUrlValue) {
    searchResult = products.filter((product) => {
      let matchingKeywords = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(searchUrlValue.toLowerCase())) {
          matchingKeywords = true;
        }
      });

      return (
        product.keywords.includes(searchUrlValue) ||
        product.name.toLowerCase().includes(searchUrlValue.toLowerCase())
      );
    });
    return searchResult;
  }
}

// Making search button interractive
document.querySelector(".js-search-button").addEventListener("click", () => {
  const searchBarValue = document.querySelector(".js-search-bar").value;

  window.location.href = `amazon.html?search=${searchBarValue}`;
});

// Searching by pressing "Enter" keyboard
document.querySelector(".js-search-bar").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const searchBarValue = document.querySelector(".js-search-bar").value;

    window.location.href = `amazon.html?search=${searchBarValue}`;
  }
});
