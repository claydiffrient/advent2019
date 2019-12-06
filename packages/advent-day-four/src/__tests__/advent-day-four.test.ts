"use strict";

const { isValidPassword } = require("../index");

describe("isValidPassword", () => {
  it.each([
    [111111, true],
    [223450, false],
    [123789, false]
  ])("isValidPassword(%i)", (value, expected) => {
    expect(isValidPassword(value as number)).toBe(expected);
  });
});
