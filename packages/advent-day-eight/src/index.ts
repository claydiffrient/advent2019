export function splitToLayers(width: number, height: number, input: string) {
  const layers: string[][][] = [];
  let index = 0;
  const layerSize = width * height;
  const numLayers = input.length / layerSize;
  for (let i = 0; i < numLayers; i++) {
    let layerEntry: string[][] = [];
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

export function countNumber(layer: string[][], number: number): number {
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

export function getLayerWithLeastZeroes(layers: string[][][]) {
  const zeroCounts = layers.map(l => countNumber(l, 0));
  const minZeros = zeroCounts.indexOf(Math.min(...zeroCounts));
  return layers[minZeros];
}

export function getOneDigitsMultipliedByTwoDigits(layers: string[][][]) {
  const minZeroLayer = getLayerWithLeastZeroes(layers);
  const numberOfOnes = countNumber(minZeroLayer, 1);
  const numberOfTwos = countNumber(minZeroLayer, 2);
  return numberOfOnes * numberOfTwos;
}

export function composeLayers(layers: string[][][]): string[][] {
  // start our composition as the first layer
  const composed: string[][] = layers[0];
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
