"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FILE_PATH = path_1.default.resolve("assets", "inputOne.txt");
function getList() {
    return new Promise((resolve, reject) => {
        const readInterface = readline_1.default.createInterface({
            input: fs_1.default.createReadStream(FILE_PATH)
        });
        const results = [];
        readInterface.on("line", line => {
            results.push(Number.parseInt(line, 10));
        });
        readInterface.on("close", () => {
            resolve(results);
        });
    });
}
function getFuelForMass(mass) {
    return Math.floor(mass / 3) - 2;
}
exports.getFuelForMass = getFuelForMass;
/**
 * This iterates getting ALL the fuel
 * @param mass
 */
function getTotalFuel(mass) {
    let sum = 0;
    let result = getFuelForMass(mass);
    while (result > 0) {
        sum += result;
        result = getFuelForMass(result);
    }
    return sum;
}
exports.getTotalFuel = getTotalFuel;
async function run() {
    const inputs = await getList();
    console.log(`Part One: ${inputs
        .map(x => getFuelForMass(x))
        .reduce((prev, cur) => prev + cur)}`);
    console.log(`Part Two: ${inputs
        .map(x => getTotalFuel(x))
        .reduce((prev, cur) => prev + cur)}`);
}
exports.run = run;
