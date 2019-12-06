"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function runProgram(input) {
    let cursor = 0;
    const programArray = input.split(",").map(x => Number.parseInt(x, 10));
    let opCode = programArray[cursor];
    while (opCode !== 99) {
        const valOne = programArray[programArray[cursor + 1]];
        const valTwo = programArray[programArray[cursor + 2]];
        if (opCode === 1) {
            programArray[programArray[cursor + 3]] = valOne + valTwo;
        }
        if (opCode === 2) {
            programArray[programArray[cursor + 3]] = valOne * valTwo;
        }
        cursor = cursor + 4;
        opCode = programArray[cursor];
    }
    return programArray.join(",");
}
exports.runProgram = runProgram;
function stringToNumArray(input) {
    return input.split(",").map(x => Number.parseInt(x, 10));
}
function run() {
    const input = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,5,23,2,9,23,27,1,5,27,31,1,5,31,35,1,35,13,39,1,39,9,43,1,5,43,47,1,47,6,51,1,51,13,55,1,55,9,59,1,59,13,63,2,63,13,67,1,67,10,71,1,71,6,75,2,10,75,79,2,10,79,83,1,5,83,87,2,6,87,91,1,91,6,95,1,95,13,99,2,99,13,103,1,103,9,107,1,10,107,111,2,111,13,115,1,10,115,119,1,10,119,123,2,13,123,127,2,6,127,131,1,13,131,135,1,135,2,139,1,139,6,0,99,2,0,14,0";
    const split = stringToNumArray(input);
    split[1] = 12;
    split[2] = 2;
    const newInput = split.join(",");
    const output = runProgram(newInput);
    console.log(`Step One: ${stringToNumArray(output)[0]}`);
    for (let i = 0; i <= 99; i++) {
        for (let j = 0; j <= 99; j++) {
            const split = stringToNumArray(input);
            split[1] = i;
            split[2] = j;
            const newInput = split.join(",");
            const output = runProgram(newInput);
            if (stringToNumArray(output)[0] === 19690720) {
                console.log(`Step 2: 100 * ${i} + ${j} = ${100 * i + j}`);
            }
        }
    }
}
exports.run = run;