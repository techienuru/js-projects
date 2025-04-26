import { formatCurrency } from "../../script/utils/money.js";

console.log("Test suite: formatCurrency()");
console.log("converts cent to dollar");
if (formatCurrency(2095) === "20.95") {
  console.log("Passed");
} else {
  console.log("failed");
}

console.log("works with 0");
if (formatCurrency(0) === "0.00") {
  console.log("Passed");
} else {
  console.log("failed");
}

console.log("round up to cent");
if (formatCurrency(2000.5) === "20.01") {
  console.log("Passed");
} else {
  console.log("failed");
}

console.log("round down to cent");
if (formatCurrency(2000.4) === "20.00") {
  console.log("Passed");
} else {
  console.log("failed");
}
