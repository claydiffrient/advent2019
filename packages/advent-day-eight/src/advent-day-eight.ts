import {
  getOneDigitsMultipliedByTwoDigits,
  splitToLayers,
  composeLayers
} from "./index";

import ImageJS from "imagejs";
import terminalImage from "terminal-image";
import path from "path";
import fs from "fs";
import readline from "readline";

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

function createBitmap(
  layer: string[][],
  { height, width }: { height: number; width: number }
) {
  const bitmap = new ImageJS.Bitmap({
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
  console.log(await terminalImage.file("image.jpg"));
}

const run = async () => {
  const inputs = await getList();
  const input = inputs[0]; // Should only be one
  const layers = splitToLayers(25, 6, input);
  console.log(`Part One: ${getOneDigitsMultipliedByTwoDigits(layers)}`);
  const composed = composeLayers(layers);
  console.log(`Part Two ${JSON.stringify(composed)}`);
  await createBitmap(composed, { width: 25, height: 6 });
  await printBitmap();
};

run();
