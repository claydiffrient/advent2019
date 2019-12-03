import readline from "readline";
import fs from "fs";
import path from "path";

const FILE_PATH = path.resolve("assets", "inputOne.txt");

function getList(): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(FILE_PATH)
    });

    const results: number[] = [];
    readInterface.on("line", line => {
      results.push(Number.parseInt(line, 10));
    });
    readInterface.on("close", () => {
      resolve(results);
    });
  });
}

export function getFuelForMass(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

/**
 * This iterates getting ALL the fuel
 * @param mass
 */
export function getTotalFuel(mass: number): number {
  let sum = 0;
  let result = getFuelForMass(mass);
  while (result > 0) {
    sum += result;
    result = getFuelForMass(result);
  }
  return sum;
}

export async function run() {
  const inputs = await getList();
  console.log(
    `Part One: ${inputs
      .map(x => getFuelForMass(x))
      .reduce((prev, cur) => prev + cur)}`
  );
  console.log(
    `Part Two: ${inputs
      .map(x => getTotalFuel(x))
      .reduce((prev, cur) => prev + cur)}`
  );
}
