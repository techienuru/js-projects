import { getDeliveryOption } from "./deliveryOptions.js";

export let cart;

loadCartFromStorage();
export function loadCartFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function resetCart() {
  cart = [];
  saveCartToStorage();
}

export function addToCart(productId) {
  // Getting qtty fom selector
  const qttyselector = document.querySelector(`.js-qtty-selector-${productId}`);

  const qttySelected = qttyselector ? Number(qttyselector.value) : 1;

  let matchingItem; // Stores the product already in cart
  // checking if the product is in cart
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  // If product is found to be in cart
  if (matchingItem) {
    matchingItem.quantity += qttySelected;
  } else {
    cart.push({
      productId,
      quantity: qttySelected,
      deliveryId: "1"
    });
  }
  saveCartToStorage();
}

export function calcCartQtty() {
  let cartQtty = 0;
  cart.forEach((cartItem) => {
    cartQtty += cartItem.quantity;
  });
  return cartQtty;
}

export function removeFromCart(productId) {
  // Looping through the cart to get the cartItem to remove
  for (let i = 0; i < cart.length; i++) {
    if (productId == cart[i].productId) {
      cart.splice(i, 1);
      break; // Exit the loop once found
    }
  }
  saveCartToStorage();
}

export function updateQtty(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
      cartItem.quantity = newQuantity;
    }
  });
  saveCartToStorage();
}

export function validateUpdateQtty(newQuantity) {
  if (newQuantity > 0 && newQuantity < 1000) {
    return true;
  } else {
    return false;
  }
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  // Create a variable to store the cart Item that matches the productId in cart
  // Then loops through the cart and
  // checks which cart Item match
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  // Exit the function if the product doesn't exist in the cart
  if (!matchingItem) {
    return;
  }
  // Exit the function if the deliveryId doesn't exist
  if (!getDeliveryOption(deliveryOptionId)) {
    return;
  }
  matchingItem.deliveryId = deliveryOptionId; // Change the delivery ID of the product
  saveCartToStorage(); // Save To localStorage
}

export async function loadCartFetch() {
  const response = await fetch("https://supersimplebackend.dev/cart");
  const cartData = await response.text();
  console.log(cartData);
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(`"${xhr.response}" successfully`);
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}
