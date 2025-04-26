import { getProduct, loadProductsFetch } from "../data/products.js";
// import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

class Tracking {
  ordersArray;
  URLOrderId;
  URLProductId;
  matchingOrder;
  matchingProduct;

  constructor() {
    this.loadOrdersFromStorage();
    this.getURLParams();
    this.getMatchingOrder(); // From Orders Array (For URL Param "orderId")
    this.getMatchingProduct(); // From Orders.products (For URL Param "productId")
    console.log(this.matchingProduct);
  }

  loadOrdersFromStorage() {
    this.ordersArray = JSON.parse(localStorage.getItem("orders")) || [];
  }

  getURLParams() {
    const url = new URL(window.location.href);
    this.URLOrderId = url.searchParams.get("orderId");
    this.URLProductId = url.searchParams.get("productId");
  }

  // From Orders Array (For URL Param "orderId")
  getMatchingOrder() {
    this.ordersArray.forEach((order) => {
      if (order.id === this.URLOrderId) {
        this.matchingOrder = order;
      }
    });
  }

  // From Orders.products (For URL Param "productId")
  getMatchingProduct() {
    this.matchingOrder.products.forEach((productDetails) => {
      if (productDetails.productId == this.URLProductId) {
        this.matchingProduct = productDetails;
      }
    });
  }

  formatDate(date, format) {
    return dayjs(`${date}`).format(`${format}`);
  }

  calcDeliveryProgress() {
    const currentTime = dayjs();
    const orderTime = this.matchingOrder.orderTime;
    const deliveryTime = this.matchingProduct.estimatedDeliveryTime;

    const deliveryProgress =
      ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

    return deliveryProgress;
  }

  generateOrdersProduct() {
    let orderProductsHTML = "";

    this.matchingOrder.products.forEach((product) => {
      let matchingProduct = getProduct(product.productId);

      orderProductsHTML += `
            <div class="delivery-date">Arriving on ${this.formatDate(
              product.estimatedDeliveryTime,
              "dddd, MMMM DD"
            )}
            </div>

            <div class="product-info">
                ${matchingProduct.name}
            </div>

            <div class="product-info">
                Quantity: ${product.quantity}
            </div>

            <img
            class="product-image"
            src="${matchingProduct.image}"
            />

        `;
    });

    return orderProductsHTML;
  }

  async renderTrackingHTML() {
    await loadProductsFetch();

    let deliveryProgress = this.calcDeliveryProgress();

    let trackingHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        ${this.generateOrdersProduct()}

        <div class="progress-labels-container">
          <div class="progress-label ${
            deliveryProgress >= 0 && deliveryProgress < 50
              ? "current-status"
              : ""
          }">
            Preparing
          </div>
          <div class="progress-label ${
            deliveryProgress >= 50 && deliveryProgress < 100
              ? "current-status"
              : ""
          }">
            Shipped
          </div>
          <div class="progress-label ${
            deliveryProgress >= 100 ? "current-status" : ""
          }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${this.calcDeliveryProgress()}%;"></div>
        </div>
    `;

    document.querySelector(".js-order-tracking").innerHTML = trackingHTML;
  }
}

export const tracking = new Tracking();

tracking.renderTrackingHTML();
