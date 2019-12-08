"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const index_1 = require("./index");
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
const run = async () => {
    const inputs = await getList();
    console.log(`Part One: ${index_1.getOrbitCount(inputs)}`);
    const comNode = index_1.buildTree(inputs);
    let count;
    if (comNode) {
        const sanNode = comNode.findChild("SAN");
        const youNode = comNode.findChild("YOU");
        if (sanNode && youNode) {
            const sanNodeParent = sanNode.getParent();
            const youNodeParent = youNode.getParent();
            if (sanNodeParent && youNodeParent) {
                count = index_1.countPathBetween(sanNodeParent, youNodeParent) || 0;
            }
            console.log(`Part Two: ${count}`);
        }
    }
};
run();
