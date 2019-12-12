import * as math from "mathjs";
import {
  parsePlanets,
  updateX,
  updateY,
  updateZ,
  runRounds,
  getSystemEnergy
} from "./index";

export function findLCM(input: string) {
  const planets = parsePlanets(input);
  let keepGoingX = true;
  let keepGoingY = true;
  let keepGoingZ = true;
  let xCount = 1;
  let yCount = 1;
  let zCount = 1;
  let resultX = updateX(planets);
  let resultY = updateY(planets);
  let resultZ = updateZ(planets);
  while (keepGoingX) {
    resultX = updateX(resultX);
    if (
      resultX[0].position.x === planets[0].position.x &&
      resultX[1].position.x === planets[1].position.x &&
      resultX[2].position.x === planets[2].position.x &&
      resultX[3].position.x === planets[3].position.x &&
      resultX[0].velocity.x === 0 &&
      resultX[1].velocity.x === 0 &&
      resultX[2].velocity.x === 0 &&
      resultX[3].velocity.x === 0
    ) {
      keepGoingX = false;
    }
    xCount++;

    // console.log(xCount);
  }

  keepGoingY = true;

  while (keepGoingY) {
    resultY = updateY(resultY);
    if (
      resultY[0].position.y === planets[0].position.y &&
      resultY[1].position.y === planets[1].position.y &&
      resultY[2].position.y === planets[2].position.y &&
      resultY[3].position.y === planets[3].position.y &&
      resultY[0].velocity.y === 0 &&
      resultY[1].velocity.y === 0 &&
      resultY[2].velocity.y === 0 &&
      resultY[3].velocity.y === 0
    ) {
      keepGoingY = false;
    }
    yCount++;

    // console.log(yCount);
  }

  keepGoingZ = true;

  while (keepGoingZ) {
    resultZ = updateZ(resultZ);
    if (
      resultZ[0].position.z === planets[0].position.z &&
      resultZ[1].position.z === planets[1].position.z &&
      resultZ[2].position.z === planets[2].position.z &&
      resultZ[3].position.z === planets[3].position.z &&
      resultZ[0].velocity.z === 0 &&
      resultZ[1].velocity.z === 0 &&
      resultZ[2].velocity.z === 0 &&
      resultZ[3].velocity.z === 0
    ) {
      keepGoingZ = false;
    }
    zCount++;

    // console.log(zCount);
  }

  console.group("Results");
  //   console.log(resultX);
  //   console.log(resultY);
  //   console.log(resultZ);
  console.log(`x result: ${xCount}`);
  console.log(`y result: ${yCount}`);
  console.log(`z result: ${zCount}`);
  console.groupEnd();

  const xyLCM = math.lcm(xCount, yCount);
  // console.log(`lcm x and y: ${xyLCM}`);
  //   console.log(`lcm: ${math.lcm(xyLCM, zCount)}`);
  return math.lcm(xyLCM, zCount);
}
// 286330

console.log(
  findLCM(`<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`)
);

// 4686774924
