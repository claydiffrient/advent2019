import path from "path";
import fs from "fs";
import readline from "readline";
import {
  getOrbitCount,
  countOrbits,
  buildTree,
  countPathBetween
} from "./index";

const FILE_PATH = path.resolve("assets", "input.txt");

function getList(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(FILE_PATH)
    });

    const results: string[] = [];
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
  console.log(`Part One: ${getOrbitCount(inputs)}`);
  const comNode = buildTree(inputs);
  let count;
  if (comNode) {
    const sanNode = comNode.findChild("SAN");
    const youNode = comNode.findChild("YOU");
    if (sanNode && youNode) {
      const sanNodeParent = sanNode.getParent();
      const youNodeParent = youNode.getParent();
      if (sanNodeParent && youNodeParent) {
        count = countPathBetween(sanNodeParent, youNodeParent) || 0;
      }
      console.log(`Part Two: ${count}`);
    }
  }
};

run();
