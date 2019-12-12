import { parsePlanets, runRounds, getSystemEnergy } from "../index";
import { findLCM } from "../advent-day-twelve";
describe("applyGravity", () => {});

describe("parsePlanets", () => {
  it("handles parsing", () => {
    const input = `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`;

    const expected = [
      { position: { x: -1, y: 0, z: 2 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 2, y: -10, z: -7 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 4, y: -8, z: 8 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 3, y: 5, z: -1 }, velocity: { x: 0, y: 0, z: 0 } }
    ];

    const result = parsePlanets(input);
    expect(result).toStrictEqual(expected);
  });
});

describe("runRounds", () => {
  const planets = [
    { position: { x: -1, y: 0, z: 2 }, velocity: { x: 0, y: 0, z: 0 } },
    { position: { x: 2, y: -10, z: -7 }, velocity: { x: 0, y: 0, z: 0 } },
    { position: { x: 4, y: -8, z: 8 }, velocity: { x: 0, y: 0, z: 0 } },
    { position: { x: 3, y: 5, z: -1 }, velocity: { x: 0, y: 0, z: 0 } }
  ];

  it("handles 1 step", () => {
    expect(runRounds(planets, 1)).toStrictEqual([
      { position: { x: 2, y: -1, z: 1 }, velocity: { x: 3, y: -1, z: -1 } },
      { position: { x: 3, y: -7, z: -4 }, velocity: { x: 1, y: 3, z: 3 } },
      { position: { x: 1, y: -7, z: 5 }, velocity: { x: -3, y: 1, z: -3 } },
      { position: { x: 2, y: 2, z: 0 }, velocity: { x: -1, y: -3, z: 1 } }
    ]);
  });

  it("handles 2 steps", () => {
    expect(runRounds(planets, 2)).toStrictEqual([
      { position: { x: 5, y: -3, z: -1 }, velocity: { x: 3, y: -2, z: -2 } },
      { position: { x: 1, y: -2, z: 2 }, velocity: { x: -2, y: 5, z: 6 } },
      { position: { x: 1, y: -4, z: -1 }, velocity: { x: 0, y: 3, z: -6 } },
      { position: { x: 1, y: -4, z: 2 }, velocity: { x: -1, y: -6, z: 2 } }
    ]);
  });

  it("handles 5 steps", () => {
    expect(runRounds(planets, 5)).toStrictEqual([
      { position: { x: -1, y: -9, z: 2 }, velocity: { x: -3, y: -1, z: 2 } },
      { position: { x: 4, y: 1, z: 5 }, velocity: { x: 2, y: 0, z: -2 } },
      { position: { x: 2, y: 2, z: -4 }, velocity: { x: 0, y: -1, z: 2 } },
      { position: { x: 3, y: -7, z: -1 }, velocity: { x: 1, y: 2, z: -2 } }
    ]);
  });

  it("handles 10 steps", () => {
    expect(runRounds(planets, 10)).toStrictEqual([
      { position: { x: 2, y: 1, z: -3 }, velocity: { x: -3, y: -2, z: 1 } },
      { position: { x: 1, y: -8, z: 0 }, velocity: { x: -1, y: 1, z: 3 } },
      { position: { x: 3, y: -6, z: 1 }, velocity: { x: 3, y: 2, z: -3 } },
      { position: { x: 2, y: 0, z: 4 }, velocity: { x: 1, y: -1, z: -1 } }
    ]);
  });
});

describe("getSystemEnergy", () => {
  const planets = [
    { position: { x: -1, y: 0, z: 2 }, velocity: { x: 0, y: 0, z: 0 } },
    { position: { x: 2, y: -10, z: -7 }, velocity: { x: 0, y: 0, z: 0 } },
    { position: { x: 4, y: -8, z: 8 }, velocity: { x: 0, y: 0, z: 0 } },
    { position: { x: 3, y: 5, z: -1 }, velocity: { x: 0, y: 0, z: 0 } }
  ];
  it("gets total energy", () => {
    expect(getSystemEnergy(runRounds(planets, 10))).toBe(179);
  });
});

describe.skip("Part One :)", () => {
  const planets = parsePlanets(`<x=-8, y=-18, z=6>
    <x=-11, y=-14, z=4>
    <x=8, y=-3, z=-10>
    <x=-2, y=-16, z=1>`);
  expect(getSystemEnergy(runRounds(planets, 1000))).toBe(9743);
});

describe("findLCM", () => {
  it("handles the first example", () => {
    expect(
      findLCM(`<x=-1, y=0, z=2>
          <x=2, y=-10, z=-7>
          <x=4, y=-8, z=8>
          <x=3, y=5, z=-1>`)
    ).toBe(2772);
  });

  it("handles the second example", () => {
    expect(
      findLCM(`<x=-8, y=-10, z=0>
    <x=5, y=5, z=10>
    <x=2, y=-7, z=3>
    <x=9, y=-8, z=-3>`)
    ).toBe(4686774924);
  });
});
