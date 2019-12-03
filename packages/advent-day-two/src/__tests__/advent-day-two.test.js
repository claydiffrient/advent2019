"use strict";

const { runProgram } = require("../index");

describe("runProgram", () => {
  it("handles opcode 1", () => {
    const result = runProgram("1,0,0,0,99");
    const expected = "2,0,0,0,99";
    expect(result).toBe(expected);
  });

  it("handles opcode 2", () => {
    const result = runProgram("2,3,0,3,99");
    const expected = "2,3,0,6,99";
    expect(result).toBe(expected);
  });

  it.each([
    ["1,9,10,3,2,3,11,0,99,30,40,50", "3500,9,10,70,2,3,11,0,99,30,40,50"],
    ["2,4,4,5,99,0", "2,4,4,5,99,9801"],
    ["1,1,1,4,99,5,6,0,99", "30,1,1,4,2,5,6,0,99"]
  ])("runProgram(%s)", (input, expected) => {
    expect(runProgram(input)).toBe(expected);
  });
});
