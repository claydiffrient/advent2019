"use strict";

const { isValidPassword } = require("../index");

describe("isValidPassword", () => {
  it.each([
    // [111111, true], This doesn't work in part 2
    [223450, false],
    [123789, false],
    [112233, true],
    [123444, false],
    [111122, true]
  ])("isValidPassword(%i)", (value, expected) => {
    expect(isValidPassword(value as number)).toBe(expected);
  });
});
