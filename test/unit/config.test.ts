import * as config from "../../src/config/config";

describe("Test config file", () => {
  it("should have a the right PORT", () => {
    expect(config.PORT).toBe("3333");
  });
});
