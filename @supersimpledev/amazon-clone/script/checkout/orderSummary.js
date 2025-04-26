import { cart } from "../../data/cart-class.js";
import {
  calculateDeliveryDate,
  deliveryOptions,
  getDeliveryOption
} from "../../data/deliveryOptions.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
// import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";
// import dayjs from "../dayjs/esm/index.js";

export function renderOrderSummary() {
  function renderCartQtty() {
    document.querySelector(
      ".js-cart-quantity"
    ).innerHTML = `${cart.calcCartQtty()} items`;
  }
  renderCartQtty();

  let cartSummaryHTML = ""; // Holds all the Cart UI generated

  cart.cartItems.forEach((cartItem) => {
    const { productId, quantity } = cartItem; // Product ID & Qtty for the cart Item

    // Getting other details of the cartItem from product array
    const matchingProduct = getProduct(productId);

    // Getting the delivery option that matches the ID in cartItem
    const matchingdeliveryOption = getDeliveryOption(cartItem.deliveryId);

    //  Calculating the delivery date
    const dateString = calculateDeliveryDate(matchingdeliveryOption);

    // Generating the UI for cart to be displayed on the page
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${
        matchingProduct.id
      }">
          <div class="delivery-date">
          Delivery date: ${dateString}
          </div>
  
          <div class="cart-item-details-grid">
              <img
              class="product-image"
              src="${matchingProduct.image}"
              />
  
              <div class="cart-item-details">
              <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
              </div>
              <div class="product-price js-product-price-${
                matchingProduct.id
              }">${matchingProduct.getPrice()}</div>
              <div class="product-quantity js-product-quantity-${
                matchingProduct.id
              }">
                  <span> Quantity: <span class="quantity-label js-quantity-label">${quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                    matchingProduct.id
                  }">
                  Update
                  </span>
                  <input type="text" class="quantity-input js-quantity-input" data-product-id="${productId}" />
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${
                    matchingProduct.id
                  }">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link-${
                    matchingProduct.id
                  } js-delete-link" data-product-id="${matchingProduct.id}">
                  Delete
                  </span>
              </div>
              </div>
  
              <div class="delivery-options">
              <div class="delivery-options-title">
                  Choose a delivery option:
              </div>
              <!-- Displaying/rendering Delivery options -->
                  ${renderDeliveryOptions(matchingProduct, cartItem)}
              </div>
          </div>
          </div>
    `;
  });

  function renderDeliveryOptions(matchingProduct, cartItem) {
    let html = "";
    // Looping through the delivery options & generate each options UI
    deliveryOptions.forEach((deliveryOption) => {
      // Calculating the delivery date
      const dateString = calculateDeliveryDate(deliveryOption);
      // Calculating the priceCent
      // If its 0 => Free else Calculate & return a priceCent
      const priceCents =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)}`;
      // Checking the active delivery Option
      const isChecked =
        cartItem.deliveryId === deliveryOption.deliveryId ? "checked" : "";
      html += `
          <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.deliveryId}" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.deliveryId}">
              <input
              type="radio" ${isChecked}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
              />
              <div>
                  <div class="delivery-option-date">
                      ${dateString}
                  </div>
                  <div class="delivery-option-price">
                      ${priceCents} Shipping
                  </div>
              </div>
          </div>
      `;
    });
    return html;
  }

  // Display all the cart Items on the page
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // Deletes cart and update UI
  document.querySelectorAll(".js-delete-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const productId = deleteLink.dataset.productId;
      cart.removeFromCart(productId);
      renderOrderSummary();
      renderCartQtty();
      renderPaymentSummary();
    });
  });

  // Updates cart & update UI
  document
    .querySelectorAll(".js-update-quantity-link")
    .forEach((updateLink) => {
      updateLink.addEventListener("click", () => {
        const productId = updateLink.dataset.productId;
        // remove update link & quantity number
        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.add("is-editing-quantity");
      });
    });

  // Save new quantity & update UI
  document.querySelectorAll(".js-save-quantity-link").forEach((saveLink) => {
    saveLink.addEventListener("click", () => {
      const productId = saveLink.dataset.productId;
      /* Getting the value of the input box */
      const quantityBox = document.querySelector(
        `.js-cart-item-container-${productId} .js-quantity-input`
      ); // The input box
      const newQuantity = Number(quantityBox.value); // Value inside the input box

      // checks if the value is > 0 & < 1000
      if (cart.validateUpdateQtty(newQuantity)) {
        // remove save link & input box
        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.remove("is-editing-quantity");

        cart.updateQtty(productId, newQuantity); // update cart
        // Re-display the cart quantity on the page
        renderCartQtty();
        // Re-display the payment summary section
        renderPaymentSummary();
        // Change the value of the quantity number
        document.querySelector(
          `.js-cart-item-container-${productId} .js-quantity-label`
        ).innerHTML = newQuantity;
        // Clearing the qtty input box
        quantityBox.value = "";
        quantityBox.style.border = "1px solid black";
      } else {
        quantityBox.style.border = "2px solid red";
      }
    });
  });

  // Activating "Enter" key to save new quantity
  document.querySelectorAll(".js-quantity-input").forEach((qttyInput) => {
    const productId = qttyInput.dataset.productId;
    qttyInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const saveLink = document.querySelector(
          `.js-cart-item-container-${productId} .js-save-quantity-link`
        );
        saveLink.click();
      }
    });
  });

  // delivery Option's Selector Listener
  document
    .querySelectorAll(".js-delivery-option")
    .forEach((deliveryOptionSelector) => {
      deliveryOptionSelector.addEventListener("click", () => {
        const { productId, deliveryOptionId } = deliveryOptionSelector.dataset;
        cart.updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}
