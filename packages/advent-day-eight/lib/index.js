"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splitToLayers(width, height, input) {
    const layers = [];
    let index = 0;
    const layerSize = width * height;
    const numLayers = input.length / layerSize;
    for (let i = 0; i < numLayers; i++) {
        let layerEntry = [];
        for (let h = 0; h < height; h++) {
            layerEntry[h] = [];
            for (let w = 0; w < width; w++) {
                layerEntry[h][w] = input[index];
                index++;
            }
        }
        layers.push(layerEntry);
    }
    return layers;
}
exports.splitToLayers = splitToLayers;
function countNumber(layer, number) {
    let count = 0;
    for (let i = 0; i < layer.length; i++) {
        for (let j = 0; j < layer[i].length; j++) {
            if (layer[i][j] === String(number)) {
                count++;
            }
        }
    }
    return count;
}
exports.countNumber = countNumber;
function getLayerWithLeastZeroes(layers) {
    const zeroCounts = layers.map(l => countNumber(l, 0));
    const minZeros = zeroCounts.indexOf(Math.min(...zeroCounts));
    return layers[minZeros];
}
exports.getLayerWithLeastZeroes = getLayerWithLeastZeroes;
function getOneDigitsMultipliedByTwoDigits(layers) {
    const minZeroLayer = getLayerWithLeastZeroes(layers);
    const numberOfOnes = countNumber(minZeroLayer, 1);
    const numberOfTwos = countNumber(minZeroLayer, 2);
    return numberOfOnes * numberOfTwos;
}
exports.getOneDigitsMultipliedByTwoDigits = getOneDigitsMultipliedByTwoDigits;
function composeLayers(layers) {
    // start our composition as the first layer
    const composed = layers[0];
    for (let i = 0; i < layers.length; i++) {
        for (let j = 0; j < layers[i].length; j++) {
            for (let k = 0; k < layers[i][j].length; k++) {
                const curVal = composed[j][k];
                if (curVal === "2") {
                    composed[j][k] = layers[i][j][k];
                }
            }
        }
    }
    return composed;
}
exports.composeLayers = composeLayers;
