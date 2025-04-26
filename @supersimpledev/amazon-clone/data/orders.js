import { formatCurrency } from "../script/utils/money.js";
import { addToCart } from "./cart.js";
import { getProduct, loadProductsFetch } from "./products.js";

class Orders {
  orderItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadOrdersFromStorage();
  }

  loadOrdersFromStorage() {
    this.orderItems =
      JSON.parse(localStorage.getItem(`${this.#localStorageKey}`)) || [];
  }

  addOrder(backendOrder) {
    this.orderItems.unshift(backendOrder);
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem(
      this.#localStorageKey,
      JSON.stringify(this.orderItems)
    );
  }

  formatDate(date, format) {
    return dayjs(`${date}`).format(`${format}`);
  }

  async renderOrdersHTML() {
    await loadProductsFetch();

    let ordersHTML = "";

    this.orderItems.forEach((orderItem) => {
      // const matchingProduct = getProduct(orderItem[0].products[0].productId)

      ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${this.formatDate(orderItem.orderTime, "MMMM DD")}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(orderItem.totalCostCents)}</div>
            </div>
          </div>
  
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderItem.id}</div>
          </div>
        </div>
  
        ${this.#generateOrdersProduct(orderItem.products, orderItem.id)}
      </div>
      `;
    });

    let ordersGrid = document.querySelector(".js-orders-grid");
    ordersGrid.innerHTML = ordersHTML;

    document.querySelectorAll(".js-buy-again-button").forEach((buyAgainBtn) => {
      buyAgainBtn.addEventListener("click", () => {
        const productId = buyAgainBtn.dataset.productId;
        addToCart(productId);

        const buyAgainBtnContents = buyAgainBtn.innerHTML;
        buyAgainBtn.innerHTML = "✅ Added";

        setTimeout(() => {
          buyAgainBtn.innerHTML = buyAgainBtnContents;
        }, 1000);
      });
    });
  }

  #generateOrdersProduct(products, orderId) {
    let productListHTML = "";

    products.forEach((product) => {
      let matchingProduct = getProduct(product.productId);

      productListHTML += `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img
              src="${matchingProduct.image}"
            />
          </div>

          <div class="product-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-delivery-date">Arriving on: ${this.formatDate(
              product.estimatedDeliveryTime,
              "MMMM DD"
            )}</div>
            <div class="product-quantity">Quantity: ${product.quantity}</div>
            <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${
              matchingProduct.id
            }">
              <img class="buy-again-icon" src="images/icons/buy-again.png" />
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${orderId}&productId=${
        matchingProduct.id
      }">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
      `;
    });
    return productListHTML;
  }
}

export const orders = new Orders("orders");
