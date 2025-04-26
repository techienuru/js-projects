import { Appliance, Clothing, Product } from "../../data/products.js";
const product = new Product({
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  image: "images/products/athletic-cotton-socks-6-pairs.jpg",
  name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090,
  keywords: ["socks", "sports", "apparel"]
});

const clothing = new Clothing({
  id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
  name: "Adults Plain Cotton T-Shirt - 2 Pack",
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799,
  keywords: ["tshirts", "apparel", "mens"],
  type: "clothing",
  sizeChartLink: "images/clothing-size-chart.png"
});

const appliance = new Appliance({
  id: "54e0eccd-8f36-462b-b68a-8182611d9add",
  image: "images/products/black-2-slot-toaster.jpg",
  name: "2 Slot Toaster - Black",
  rating: {
    stars: 5,
    count: 2197
  },
  priceCents: 1899,
  keywords: ["toaster", "kitchen", "appliances"],
  type: "appliance",
  instructionsLink: "images/appliance-instructions.png",
  warrantyLink: "images/appliance-warranty.png"
});

describe("Test Suite: Product Class", () => {
  beforeEach(() => {});

  it("product ID", () => {
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(product.rating.stars).toEqual(4.5);
  });

  it("Price", () => {
    expect(product.getPrice()).toEqual(`$10.90`);
  });

  it("Extra HTML generated", () => {
    expect(product.extraInfoHTML()).toEqual("");
  });
});

describe("Test Suite: Clothing Class", () => {
  it("Size Chart Link", () => {
    expect(clothing.sizeChartLink).toEqual("images/clothing-size-chart.png");
  });

  it("Extra Info HTML generated", () => {
    expect(clothing.extraInfoHTML()).toEqual(
      `<a href="images/clothing-size-chart.png" target="_blank">Size Chart Link</a>`
    );
  });
});

describe("Test Suite: Appliance Class", () => {
  it("Extra Info HTML", () => {
    expect(appliance.extraInfoHTML())
      .toContain(`<a href="images/appliance-instructions.png" target="_blank">Instructions</a>
      <a href="images/appliance-warranty.png" target="_blank">Warranty</a>
      `);
  });
});
