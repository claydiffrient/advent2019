import path from "path";
import fs from "fs";
import readline from "readline";
import { SpaceCardDeck } from "./advent-day-twenty-two";

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
  const deck = new SpaceCardDeck(10007);
  inputs.forEach(input => {
    deck.parseString(input);
  });
  const cards = deck.getDeck();
  console.log(cards.findIndex(x => x === 2019));
};

run();
