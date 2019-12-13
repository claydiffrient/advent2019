import readline from "readline";

import Combinatorics from "js-combinatorics";

class InputMachine {
  inputValues: number[] = [];
  private static instance: InputMachine | null = null;

  constructor(values?: number[]) {
    if (!InputMachine.instance) {
      this.inputValues = values || [4, 3, 2, 1, 0];
      InputMachine.instance = this;
    }
    return InputMachine.instance;
  }

  setValues = (values: number[]) => {
    this.inputValues = values;
  };
  getValues = () => this.inputValues;
}

function getInput(question: string): number {
  const values = new InputMachine().getValues();
  const iter = function*() {
    for (let i = 0; i < values.length; i++) {
      yield values[i];
    }
  };
  return iter().next().value as number;
}

function printOutput(output: number) {
  // runProgram("3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0");
}

export function splitOpcode(input: number) {
  return String(input)
    .split("")
    .map(x => Number.parseInt(x, 10))
    .reverse();
}

export class IntCodeComputer {
  private program: string;
  private getInputVal: number;
  private handleOutput: Function;
  private phaseValue: number;
  private firstInputCalled: boolean;

  constructor(
    program: string,
    phaseValue: number,
    getInputValue: number,
    handleOutput: Function
  ) {
    this.program = program;
    this.getInputVal = getInputValue;
    this.handleOutput = handleOutput;
    this.phaseValue = phaseValue;
    this.firstInputCalled = false;
  }

  setInputVal(input: number) {
    this.getInputVal = input;
  }

  run() {
    let cursor = 0;
    const programArray = this.program
      .split(",")
      .map(x => Number.parseInt(x, 10));
    // console.log(JSON.stringify(programArray.map((x, i) => `[${i}]: ${x}`)));
    let splitCode = splitOpcode(programArray[cursor]);
    let opCode = Number.parseInt(`${splitCode[1] || 0}${splitCode[0]}`, 10);
    while (opCode !== 99) {
      // console.log(`opCode: ${opCode}`);
      // console.log(`cursor: ${cursor}`);
      switch (opCode) {
        case 1: {
          let argOne: number;
          let argTwo: number;
          if (splitCode[2] === 1) {
            argOne = programArray[cursor + 1];
          } else {
            argOne = programArray[programArray[cursor + 1]];
          }
          if (splitCode[3] === 1) {
            argTwo = programArray[cursor + 2];
          } else {
            argTwo = programArray[programArray[cursor + 2]];
          }
          programArray[programArray[cursor + 3]] = argOne + argTwo;
          cursor = cursor + 4;
          break;
        }
        case 2: {
          let argOne: number;
          let argTwo: number;
          if (splitCode[2] === 1) {
            argOne = programArray[cursor + 1];
          } else {
            argOne = programArray[programArray[cursor + 1]];
          }
          if (splitCode[3] === 1) {
            argTwo = programArray[cursor + 2];
          } else {
            argTwo = programArray[programArray[cursor + 2]];
          }
          programArray[programArray[cursor + 3]] = argOne * argTwo;
          cursor = cursor + 4;
          break;
        }
        case 3: {
          if (!this.firstInputCalled) {
            programArray[programArray[cursor + 1]] = this.phaseValue;
            this.firstInputCalled = true;
          } else {
            programArray[programArray[cursor + 1]] = this.getInputVal;
          }
          cursor += 2; // opCode + single param
          break;
        }
        case 4: {
          this.handleOutput(programArray[programArray[cursor + 1]]);
          cursor += 2; // opCode + single param
          break;
        }
        case 5: {
          let argOne: number;
          let argTwo: number;
          if (splitCode[2] === 1) {
            argOne = programArray[cursor + 1];
          } else {
            argOne = programArray[programArray[cursor + 1]];
          }
          if (splitCode[3] === 1) {
            argTwo = programArray[cursor + 2];
          } else {
            argTwo = programArray[programArray[cursor + 2]];
          }
          if (argOne !== 0) {
            cursor = argTwo;
          } else {
            cursor += 3;
          }
          break;
        }
        case 6: {
          let argOne: number;
          let argTwo: number;
          if (splitCode[2] === 1) {
            argOne = programArray[cursor + 1];
          } else {
            argOne = programArray[programArray[cursor + 1]];
          }
          if (splitCode[3] === 1) {
            argTwo = programArray[cursor + 2];
          } else {
            argTwo = programArray[programArray[cursor + 2]];
          }
          console.log(`Arg One: ${argOne}`);
          if (argOne === 0) {
            cursor = argTwo;
          } else {
            cursor += 3;
          }
          break;
        }
        case 7: {
          let argOne: number;
          let argTwo: number;
          if (splitCode[2] === 1) {
            argOne = programArray[cursor + 1];
          } else {
            argOne = programArray[programArray[cursor + 1]];
          }
          if (splitCode[3] === 1) {
            argTwo = programArray[cursor + 2];
          } else {
            argTwo = programArray[programArray[cursor + 2]];
          }
          if (argOne < argTwo) {
            programArray[programArray[cursor + 3]] = 1;
          } else {
            programArray[programArray[cursor + 3]] = 0;
          }
          cursor += 4;
          break;
        }
        case 8: {
          let argOne: number;
          let argTwo: number;
          if (splitCode[2] === 1) {
            argOne = programArray[cursor + 1];
          } else {
            argOne = programArray[programArray[cursor + 1]];
          }
          if (splitCode[3] === 1) {
            argTwo = programArray[cursor + 2];
          } else {
            argTwo = programArray[programArray[cursor + 2]];
          }
          if (argOne === argTwo) {
            programArray[programArray[cursor + 3]] = 1;
          } else {
            programArray[programArray[cursor + 3]] = 0;
          }
          cursor += 4;
          break;
        }
      }
      splitCode = splitOpcode(programArray[cursor]);
      opCode = Number.parseInt(`${splitCode[1] || 0}${splitCode[0]}`, 10);
      // opCode = programArray[cursor];
    }

    // return programArray.join(",");
  }
}

// export async function runProgram(input: string): Promise<string> {}

function stringToNumArray(input: string): number[] {
  return input.split(",").map(x => Number.parseInt(x, 10));
}

function combinations(values: number[]) {
  const results: number[][] = [];
  for (let i = 0; i < values.length; i++) {
    for (let j = i; j <= values.length; j++) {}
  }
}

export async function run() {
  const input =
    "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
  // "3,8,1001,8,10,8,105,1,0,0,21,30,39,64,81,102,183,264,345,426,99999,3,9,1001,9,2,9,4,9,99,3,9,1002,9,4,9,4,9,99,3,9,1002,9,5,9,101,2,9,9,102,3,9,9,1001,9,2,9,1002,9,2,9,4,9,99,3,9,1002,9,3,9,1001,9,5,9,1002,9,3,9,4,9,99,3,9,102,4,9,9,1001,9,3,9,102,4,9,9,1001,9,5,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,99";

  const phaseOptions = Combinatorics.permutation([5, 6, 7, 8, 9]);
  let phase: number[];
  let greatest = 0;
  let inputA = 0;
  while ((phase = phaseOptions.next())) {
    console.log(phase);
    const A: IntCodeComputer = new IntCodeComputer(
      input,
      phase[0],
      0,
      (outputA: number) => {
        new IntCodeComputer(input, phase[1], outputA, (outputB: number) => {
          new IntCodeComputer(input, phase[2], outputB, (outputC: number) => {
            new IntCodeComputer(input, phase[3], outputC, (outputD: number) => {
              new IntCodeComputer(
                input,
                phase[4],
                outputD,
                (outputE: number) => {
                  if (outputE > greatest) {
                    console.log("GREATER");
                    console.log(`${phase} => ${outputE}`);
                    greatest = outputE;
                  }
                  A.setInputVal(outputE);
                  A.run();
                }
              ).run();
            }).run();
          }).run();
        }).run();
      }
    );
    A.run();
  }

  // const split = stringToNumArray(input);
  // // split[1] = 12;
  // // split[2] = 2;
  // // const newInput = split.join(",");
  // await runProgram(input);
  // console.log(`Step One: ${stringToNumArray(output)[0]}`);

  // for (let i = 0; i <= 99; i++) {
  //   for (let j = 0; j <= 99; j++) {
  //     const split = stringToNumArray(input);
  //     split[1] = i;
  //     split[2] = j;
  //     const newInput = split.join(",");
  //     const output = await runProgram(newInput);
  //     if (stringToNumArray(output)[0] === 19690720) {
  //       console.log(`Step 2: 100 * ${i} + ${j} = ${100 * i + j}`);
  //     }
  //   }
  // }
}
