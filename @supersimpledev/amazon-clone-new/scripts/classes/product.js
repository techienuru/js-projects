import { General } from "./general.js";

class Product extends General {
  id;
  name;
  image;
  rating;
  priceCents;
  keywords;

  constructor(productDeails) {
    super(); // Of General class
    this.id = productDeails.id;
    this.name = productDeails.name;
    this.image = productDeails.image;
    this.rating = productDeails.rating;
    this.priceCents = productDeails.priceCents;
    this.keywords = productDeails.keywords;
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDeails) {
    super(productDeails);
  }

  extraInfoHTML() {
    return `<a href=""></a>`;
  }
}

// export const productObj = new Product();

export let products = [];

export async function fetchProducts() {
  try {
    const response = await fetch("https://supersimplebackend.dev/products");

    if (response.status >= 400) {
      throw response; // Throws an eror if there is one
    }

    let fetchProducts = await response.json();
    console.log("Products Loaded Successfully!");
    return fetchProducts;
  } catch (error) {
    if (error.status === 400 || error.status === 404 || error.status === 500) {
      const errorMessage = await error.json();
      console.log(errorMessage);
    } else {
      console.log(`Network error. Please try again later!`);
    }
  }
}

export async function classifyProducts() {
  let fetchedProducts = await fetchProducts();

  products = fetchedProducts.map((productDetails) => {
    if (productDetails.type === "clothing") {
      return new Clothing(productDetails);
    } else {
      return new Product(productDetails);
    }
  });
}

export function processSearch(searchBar) {
  let searchInput = searchBar.value;
  products = products.filter((product) => {
    return (
      product.name.includes(searchInput) ||
      product.keywords.includes(searchInput)
    );
  });
}
