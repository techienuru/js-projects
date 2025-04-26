import { cart } from "../../data/cart-class.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";
import { renderOrderSummary } from "../../script/checkout/orderSummary.js";

function removeOrderSummaryFromPage() {
  document.querySelector(".js-test-container").innerHTML = "";
}

describe("OrderSummaryTest.js", () => {
  describe("Test Suite: renderOrderSummary()", () => {
    const productId1 = "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f";
    const productId2 = "bc2847e9-5323-403f-b7cf-57fde044a955";

    /*
      beforeAll((done) => {
        loadProductsFetch().then(() => {
          done();
        });
      });
      */

    beforeAll(async () => {
      await loadProductsFetch();
    });

    beforeEach(() => {
      // Mock savecart
      spyOn(localStorage, "setItem");

      // Giving a default value to cart array
      cart.cartItems = [
        { productId: productId1, quantity: 2, deliveryId: "1" },
        {
          productId: productId2,
          quantity: 1,
          deliveryId: "1"
        }
      ];
      /*
      // Mock cart
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([
          {
            productId: productId1,
            quantity: 2,
            deliveryId: "1"
          },
          {
            productId: productId2,
            quantity: 1,
            deliveryId: "1"
          }
        ]);
      });
       cart.loadCartFromStorage(); //Reload the cart variable to set it to []
       */
      document.querySelector(".js-test-container").innerHTML = `
        <div class="js-cart-quantity"></div>
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `;
      renderOrderSummary();
    });

    afterEach(() => {
      removeOrderSummaryFromPage();
    });

    it("Displays cart items correctly", () => {
      // Checking how many items are displayed
      expect(
        document.querySelectorAll(".js-cart-item-container").length
      ).toEqual(2);
      // Checking if the qtty are the same
      expect(
        document.querySelector(`.js-product-quantity-${productId1}`).innerText
      ).toContain("Quantity: 2");

      expect(
        document.querySelector(`.js-product-quantity-${productId2}`).innerText
      ).toContain("Quantity: 1");
      // Checking product name
      expect(
        document.querySelector(`.js-product-name-${productId1}`).innerText
      ).toEqual("2-Ply Kitchen Paper Towels - 30 Pack");
      expect(
        document.querySelector(`.js-product-name-${productId2}`).innerText
      ).toEqual("Men's Full-Zip Hooded Fleece Sweatshirt");
      // Checking product price
      expect(
        document.querySelector(`.js-product-price-${productId1}`).innerText
      ).toEqual("$57.99");
      expect(
        document.querySelector(`.js-product-price-${productId2}`).innerText
      ).toEqual("$24.00");
    });

    it("removes from cart", () => {
      // Click delete btn for 1st product
      document.querySelector(`.js-delete-link-${productId1}`).click();
      // Checks product on page after deleting product
      expect(
        document.querySelectorAll(".js-cart-item-container").length
      ).toEqual(1);
      // Checks how many items are in cart after deletion
      expect(cart.cartItems.length).toEqual(1);
      // Check if the correct product was deleted
      expect(cart.cartItems[0].productId).not.toEqual(productId1);
      expect(
        document.querySelector(`.js-product-name-${productId2}`).innerText
      ).toEqual("Men's Full-Zip Hooded Fleece Sweatshirt");
      expect(
        document.querySelector(`.js-product-price-${productId2}`).innerText
      ).toEqual("$24.00");
    });

    it("Update delivery option", () => {
      // Check the default deliveryId b4 alterring it
      expect(cart.cartItems[0].deliveryId).toEqual(`1`);

      // Click the 3rd delivery option for 1st product
      document.querySelector(`.js-delivery-option-${productId1}-3`).click();
      // Check if the delivery option is checked
      expect(
        document.querySelector(`.js-delivery-option-${productId1}-3 > input`)
          .checked
      ).toEqual(true);
      // Check if the cart is still intact
      expect(cart.cartItems.length).toEqual(2);
      expect(cart.cartItems[0].productId).toEqual(`${productId1}`);
      expect(cart.cartItems[0].deliveryId).toEqual(`3`);
      // Check if the payment summary are well calculated
      expect(document.querySelector(".js-shipping-money").innerText).toEqual(
        "$9.99"
      );
      expect(document.querySelector(".js-total-money").innerText).toEqual(
        "$164.97"
      );
    });
  });
});
