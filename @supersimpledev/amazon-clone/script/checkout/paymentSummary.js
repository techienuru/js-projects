import { cart } from "../../data/cart-class.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { orders } from "../../data/orders.js";
import { resetCart } from "../../data/cart.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  // Looping through the cart to get the
  // total price of items in cart & total shipping price
  cart.cartItems.forEach((cartItem) => {
    let product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const totalAfterTax = totalBeforeTax * 0.1; // 0.1 is 10%
  const totalOrder = totalBeforeTax + totalAfterTax;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
        <div>Items (${cart.calcCartQtty()}):</div>
        <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}
        </div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-shipping-money">
            $${formatCurrency(shippingPriceCents)}
        </div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTax)}
        </div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
            $${formatCurrency(totalAfterTax)}
        </div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-total-money">
            $${formatCurrency(totalOrder)}
        </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
        Place your order
    </button>
`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const backendOrder = await response.json();
        if (backendOrder) {
          orders.addOrder(backendOrder);
          resetCart();
          window.location.href = "orders.html";
        }
      } catch (error) {
        console.log(
          `Unexpected error occured! "${error}". Please try again later`
        );
      }
    });
}
