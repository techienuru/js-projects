import { loadCart, loadCartFetch } from "../data/cart.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

// import "../data/cart-class.js";
// import "../data/car.js";
// import "../data/backend-practice.js";

async function loadPage() {
  try {
    // throw "error 1";
    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      loadCartFetch();
      loadCart(() => {
        // reject("error 3");
        resolve("await Value");
      });
    });

    console.log("<b>Exercise 18i</b>");

    await Promise.all([loadProductsFetch(), loadCartFetch()]);
  } catch (error) {
    console.log(`Unexpected error! Please try again later. Cause: ${error}`);
  }

  renderOrderSummary();
  renderPaymentSummary();

  // console.log(value);
}

loadPage();

/*
async function loadPage() {
  console.log("Load Page!");

  await loadProductsFetch();
  return "Value2";
}

loadPage().then((value) => {
  console.log("Next step for load page");

  console.log(value);
});
*/

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("Value 1");
  });
})
  .then((value) => {
    console.log(value);

    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
