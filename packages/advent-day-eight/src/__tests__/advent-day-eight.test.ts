"use strict";

import {
  splitToLayers,
  countNumber,
  getLayerWithLeastZeroes,
  getOneDigitsMultipliedByTwoDigits,
  composeLayers
} from "../index";

describe("splitToLayers", () => {
  it("splits to 2 layers", () => {
    expect(splitToLayers(3, 2, "123456789012")).toStrictEqual([
      [
        ["1", "2", "3"],
        ["4", "5", "6"]
      ],
      [
        ["7", "8", "9"],
        ["0", "1", "2"]
      ]
    ]);
  });
});

describe("countNumber", () => {
  let results: string[][][];
  beforeEach(() => {
    results = splitToLayers(3, 2, "123456789012");
  });
  it("find the right amount of zeros in the input", () => {
    expect(countNumber(results[0], 0)).toBe(0);
    expect(countNumber(results[1], 0)).toBe(1);
  });

  it("find the right amount of ones in the input", () => {
    expect(countNumber(results[0], 1)).toBe(1);
    expect(countNumber(results[1], 1)).toBe(1);
  });
});

describe("getLayerWithLeastZeroes", () => {
  let results: string[][][];
  beforeEach(() => {
    results = splitToLayers(3, 2, "123456789012");
  });
  it("returns the layer with the least zeros", () => {
    expect(getLayerWithLeastZeroes(results)).toStrictEqual([
      ["1", "2", "3"],
      ["4", "5", "6"]
    ]);
  });
});

describe("getOneDigitsMultipliedByTwoDigits", () => {
  let results: string[][][];
  beforeEach(() => {
    results = splitToLayers(3, 2, "123456789012");
  });
  it("returns the proper value", () => {
    expect(getOneDigitsMultipliedByTwoDigits(results)).toBe(1);
  });
});

describe("composeLayers", () => {
  let results: string[][][];
  beforeEach(() => {
    results = splitToLayers(2, 2, "0222112222120000");
  });
  it("returns the proper value", () => {
    expect(composeLayers(results)).toStrictEqual([
      ["0", "1"],
      ["1", "0"]
    ]);
  });
});
