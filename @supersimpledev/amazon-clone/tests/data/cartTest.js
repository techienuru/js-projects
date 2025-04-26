import { cart } from "../../data/cart-class.js";

describe("Test suite: addToCart()", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem"); // Mock saveCartToStorage(removes localStorage.setItem())

    // Mock document.querySelector to return a qtty of 1
    spyOn(document, "querySelector").and.callFake(() => {
      return { value: 1 };
    });

    // Giving a default value to cart array
    cart.cartItems = [];
  });

  it("Add a new value to cart", () => {
    /*
    // Mock cart
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    */

    cart.addToCart("bc2847e9-5323-403f-b7cf-57fde044a955");
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(
      "bc2847e9-5323-403f-b7cf-57fde044a955"
    );
    expect(cart.cartItems[0].deliveryId).toEqual("1");
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart.cartItems)
    );
  });

  it("Add an existing product to cart", () => {
    /*
    // Mock cart
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "bc2847e9-5323-403f-b7cf-57fde044a955",
          quantity: 1,
          deliveryId: "1"
        }
      ]);
    });
    */

    // Giving a default value to cart array
    cart.cartItems = [
      {
        productId: "bc2847e9-5323-403f-b7cf-57fde044a955",
        quantity: 1,
        deliveryId: "1"
      }
    ];

    cart.addToCart("bc2847e9-5323-403f-b7cf-57fde044a955");
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual(
      "bc2847e9-5323-403f-b7cf-57fde044a955"
    );
    expect(cart.cartItems[0].deliveryId).toEqual("1");
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart.cartItems)
    );
  });
});

describe("Test suite: removeFromCart()", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem"); // Mock saveCartToStorage

    // Giving a default value to cart array
    cart.cartItems = [
      {
        productId: "bc2847e9-5323-403f-b7cf-57fde044a955",
        quantity: 1,
        deliveryId: "1"
      }
    ];

    /*
    // Mock localStorage.getItem
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    */
  });

  it("Remove existing product from the cart", () => {
    // Remove an existing product from cart
    cart.removeFromCart("bc2847e9-5323-403f-b7cf-57fde044a955");
    // Check if the product has been removed & cart is intact
    expect(cart.cartItems.length).toEqual(0);
    // check if localStorage.setItem is really called once
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("remove non-existing product from cart", () => {
    // Remove a non-existing product from cart
    cart.removeFromCart("123");
    // Check if the product has'nt been removed & cart is intact
    expect(cart.cartItems.length).toEqual(1);
    // check if localStorage.setItem is really called once
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});

describe("Test suite: updateDeliveryOption()", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem"); // Mock saveCartToStorage

    /*
    // Mock localStorage.getItem
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "bc2847e9-5323-403f-b7cf-57fde044a955",
          quantity: 1,
          deliveryId: "1"
        }
      ]);
    });
    */

    // Giving a default value to cart array
    cart.cartItems = [
      {
        productId: "bc2847e9-5323-403f-b7cf-57fde044a955",
        quantity: 1,
        deliveryId: "1"
      }
    ];
  });

  it("Update an existing product deliveryOption", () => {
    cart.updateDeliveryOption("bc2847e9-5323-403f-b7cf-57fde044a955", "3");
    // Check if the cart is still intact
    expect(cart.cartItems.length).toEqual(1);
    // Check if localStorage.setItem was called with correct values
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "bc2847e9-5323-403f-b7cf-57fde044a955",
          quantity: 1,
          deliveryId: "3"
        }
      ])
    );
  });

  it("Update a non-existing product's deliveryOption", () => {
    cart.updateDeliveryOption("2478", "3");
    // Check that the cart is intact & correct
    expect(cart.cartItems[0].deliveryId).toEqual("1");
    // Check if localStorage.setItem was not called
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("Update with a non-existing deliveryOptionId", () => {
    cart.updateDeliveryOption("bc2847e9-5323-403f-b7cf-57fde044a955", "5");
    // Check if the cart looks intact
    expect(cart.cartItems[0].deliveryId).toEqual("1");
    // Check if localStorage.setItem was not called
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
