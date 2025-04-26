import { getDeliveryOption } from "./deliveryOptions.js";

function generateCart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadCartFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },

    saveCartToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      const qttySelected = 1; // Getting qtty fom selector

      let matchingItem; // Stores the product already in cart
      // checking if the product is in cart
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });

      // If product is found to be in cart
      if (matchingItem) {
        matchingItem.quantity += qttySelected;
      } else {
        this.cartItems.push({
          productId,
          quantity: qttySelected,
          deliveryId: "1",
        });
      }
      this.saveCartToStorage();
    },

    calcCartQtty() {
      let cartQtty = 0;
      this.cartItems.forEach((cartItem) => {
        cartQtty += cartItem.quantity;
      });
      return cartQtty;
    },

    removeFromCart(productId) {
      // Looping through the cart to get the cartItem to remove
      for (let i = 0; i < this.cartItems.length; i++) {
        if (productId == this.cartItems[i].productId) {
          this.cartItems.splice(i, 1);
          break; // Exit the loop once found
        }
      }
      this.saveCartToStorage();
    },

    updateQtty(productId, newQuantity) {
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId == productId) {
          cartItem.quantity = newQuantity;
        }
      });
      this.saveCartToStorage();
    },

    validateUpdateQtty(newQuantity) {
      if (newQuantity > 0 && newQuantity < 1000) {
        return true;
      } else {
        return false;
      }
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      // Create a variable to store the cart Item that matches the productId in cart
      // Then loops through the cart and
      // checks which cart Item match
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
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
      this.saveCartToStorage(); // Save To localStorage
    },
  };

  return cart;
}

const cart = generateCart("cart-oop");
const businessCart = generateCart("business-cart");

cart.loadCartFromStorage();
businessCart.loadCartFromStorage();

console.log(cart);
console.log(businessCart);
