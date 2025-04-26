import { formatCurrency } from "../../script/utils/money.js";

describe("Test suite: formatCurrency()", () => {
  it("converts cent to dollar", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("work with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("round up to cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
  it("round down to cent", () => {
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });
  it("works with negative number", () => {
    expect(formatCurrency(-2095)).toEqual("-20.95");
  });
});
