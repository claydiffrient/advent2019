import { runProgram, splitOpcode } from "../index";
import mockInput from "mock-stdin";

describe("splitOpcode", () => {
  it("returns single digit opcodes", () => {
    expect(splitOpcode(1)).toStrictEqual([1]);
  });

  it("returns double digit opcodes", () => {
    expect(splitOpcode(10)).toStrictEqual([0, 1]);
  });

  it("returns double digit opcodes", () => {
    expect(splitOpcode(100)).toStrictEqual([0, 0, 1]);
  });

  it("returns four digit opcodes", () => {
    expect(splitOpcode(1002)).toStrictEqual([2, 0, 0, 1]);
  });
});

describe("runProgram", () => {
  let stdin: mockInput.MockSTDIN;
  beforeEach(() => {
    stdin = mockInput.stdin();
  });

  it("handles opcode 1", async () => {
    const result = await runProgram("1,0,0,0,99");
    const expected = "2,0,0,0,99";
    expect(result).toBe(expected);
  });

  it("handles opcode 2", async () => {
    const result = await runProgram("2,3,0,3,99");
    const expected = "2,3,0,6,99";
    expect(result).toBe(expected);
  });

  it("handles opcode 1002", async () => {
    console.log("starting");
    const result = await runProgram("1002,4,3,4,33");
    const expected = "1002,4,3,4,99";
    console.log(result);
    expect(result).toBe(expected);
  });

  it("handles opcode 3", async () => {
    process.nextTick(() => stdin.send("1\r"));
    const result = await runProgram("3,0,99");
    const expected = "1,0,99";
    expect(result).toBe(expected);
  });

  it("handles opcode 4", async () => {
    const mock = jest.spyOn(global.console, "log");
    await runProgram("4,0,99");
    expect(mock).toBeCalledWith(4);
  });

  describe("jump opcodes (5, 6)", () => {
    describe("position mode", () => {
      const program = "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9";
      it("handles zero input", async () => {
        process.nextTick(() => stdin.send("0\r"));
        const mock = jest.spyOn(global.console, "log");
        await runProgram(program);
        expect(mock).toBeCalledWith(0);
      });
      it("handles nonzero input", async () => {
        process.nextTick(() => stdin.send("5\r"));
        const mock = jest.spyOn(global.console, "log");
        await runProgram(program);
        expect(mock).toBeCalledWith(1);
      });
    });
    describe("immediate mode", () => {
      const program = "3,3,1105,-1,9,1101,0,0,12,4,12,99,1";
      it("handles zero input", async () => {
        process.nextTick(() => stdin.send("0\r"));
        const mock = jest.spyOn(global.console, "log");
        await runProgram(program);
        expect(mock).toBeCalledWith(0);
      });
      it("handles nonzero input", async () => {
        process.nextTick(() => stdin.send("5\r"));
        const mock = jest.spyOn(global.console, "log");
        await runProgram(program);
        expect(mock).toBeCalledWith(1);
      });
    });
  });

  it.each([
    ["1,9,10,3,2,3,11,0,99,30,40,50", "3500,9,10,70,2,3,11,0,99,30,40,50"],
    ["2,4,4,5,99,0", "2,4,4,5,99,9801"],
    ["1,1,1,4,99,5,6,0,99", "30,1,1,4,2,5,6,0,99"]
  ])("runProgram(%s)", async (input, expected) => {
    expect(await runProgram(input)).toBe(expected);
  });
});
