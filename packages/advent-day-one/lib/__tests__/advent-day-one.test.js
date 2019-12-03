"use strict";
const { getFuelForMass, getTotalFuel } = require("../index");
describe("getFuelForMass", () => {
    it.each([
        [12, 2],
        [14, 2],
        [1969, 654],
        [100756, 33583]
    ])("getFuelForMass(%i)", (mass, expected) => {
        expect(getFuelForMass(mass)).toBe(expected);
    });
});
describe("getTotalFuel", () => {
    it.each([
        [14, 2],
        [1969, 966],
        [100756, 50346]
    ])("getTotalFuel(%i)", (mass, expected) => {
        expect(getTotalFuel(mass)).toBe(expected);
    });
});
