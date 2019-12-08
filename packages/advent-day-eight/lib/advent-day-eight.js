"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const imagejs_1 = __importDefault(require("imagejs"));
const terminal_image_1 = __importDefault(require("terminal-image"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const FILE_PATH = path_1.default.resolve("assets", "input.txt");
function getList() {
    return new Promise((resolve, reject) => {
        const readInterface = readline_1.default.createInterface({
            input: fs_1.default.createReadStream(FILE_PATH)
        });
        const results = [];
        readInterface.on("line", line => {
            results.push(line);
        });
        readInterface.on("close", () => {
            resolve(results);
        });
    });
}
function createBitmap(layer, { height, width }) {
    const bitmap = new imagejs_1.default.Bitmap({
        width: width,
        height: height
    });
    for (let i = 0; i < layer.length; i++) {
        for (let j = 0; j < layer[i].length; j++) {
            if (layer[i][j] === "0") {
                bitmap.setPixel(j, i, { r: 0, g: 0, b: 0 });
            }
            if (layer[i][j] === "1") {
                bitmap.setPixel(j, i, { r: 255, g: 255, b: 255 });
            }
        }
    }
    return bitmap.writeFile("image.jpg");
}
async function printBitmap() {
    console.log(await terminal_image_1.default.file("image.jpg"));
}
const run = async () => {
    const inputs = await getList();
    const input = inputs[0]; // Should only be one
    const layers = index_1.splitToLayers(25, 6, input);
    console.log(`Part One: ${index_1.getOneDigitsMultipliedByTwoDigits(layers)}`);
    const composed = index_1.composeLayers(layers);
    console.log(`Part Two ${JSON.stringify(composed)}`);
    await createBitmap(composed, { width: 25, height: 6 });
    await printBitmap();
};
run();
