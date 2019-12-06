type CommandObject = {
  command: string;
  distance: number;
};

export function interpretCommandString(commandString: string): CommandObject {
  return {
    command: commandString.charAt(0),
    distance: Number.parseInt(commandString.match(/(\d+)/)![0], 10)
  };
}

// export function generatePointsFromCommandObject (command : CommandObject): number[][] {
//   const points: number[][] = [[0,0]]

// }

export function getDistance(wireOne: string, wireTwo: string): number {
  const wireOneSplit = wireOne.split(",");
  const wireTwoSplit = wireTwo.split(",");

  const startPoint: number[] = [0, 0]; // [x, y]
  const wireOnePoints: number[][] = [startPoint];
  let wireOneStepCount = 0;
  const wireOneStepsTakenPerPoint = new Map([
    [JSON.stringify(startPoint), wireOneStepCount]
  ]);

  wireOneSplit.forEach(x => {
    const { command, distance } = interpretCommandString(x);
    let tracker = 1;
    let lastPoint: number[] = wireOnePoints[wireOnePoints.length - 1];
    if (command === "U") {
      while (tracker <= distance) {
        const point = [lastPoint[0], lastPoint[1] + tracker];
        wireOnePoints.push(point);
        wireOneStepCount++;
        wireOneStepsTakenPerPoint.set(JSON.stringify(point), wireOneStepCount);
        tracker++;
      }
    }
    if (command === "D") {
      while (tracker <= distance) {
        const point = [lastPoint[0], lastPoint[1] - tracker];
        wireOnePoints.push(point);
        wireOneStepCount++;
        wireOneStepsTakenPerPoint.set(JSON.stringify(point), wireOneStepCount);
        tracker++;
      }
    }
    if (command === "R") {
      while (tracker <= distance) {
        const point = [lastPoint[0] + tracker, lastPoint[1]];
        wireOnePoints.push(point);
        wireOneStepCount++;
        wireOneStepsTakenPerPoint.set(JSON.stringify(point), wireOneStepCount);
        tracker++;
      }
    }
    if (command === "L") {
      while (tracker <= distance) {
        const point = [lastPoint[0] - tracker, lastPoint[1]];
        wireOnePoints.push(point);
        wireOneStepCount++;
        wireOneStepsTakenPerPoint.set(JSON.stringify(point), wireOneStepCount);
        tracker++;
      }
    }
  });

  const wireTwoPoints: number[][] = [startPoint];
  let wireTwoStepCount = 0;
  const wireTwoStepsTakenPerPoint = new Map([
    [JSON.stringify(startPoint), wireTwoStepCount]
  ]);
  wireTwoSplit.forEach(x => {
    const { command, distance } = interpretCommandString(x);
    let tracker = 1;
    let lastPoint: number[] = wireTwoPoints[wireTwoPoints.length - 1];
    if (command === "U") {
      while (tracker <= distance) {
        const point = [lastPoint[0], lastPoint[1] + tracker];
        wireTwoPoints.push(point);
        wireTwoStepCount++;
        // console.log("abc", point, wireTwoStepCount);
        wireTwoStepsTakenPerPoint.set(JSON.stringify(point), wireTwoStepCount);
        tracker++;
      }
    }
    if (command === "D") {
      while (tracker <= distance) {
        const point = [lastPoint[0], lastPoint[1] - tracker];
        wireTwoPoints.push(point);
        wireTwoStepCount++;
        wireTwoStepsTakenPerPoint.set(JSON.stringify(point), wireTwoStepCount);
        tracker++;
      }
    }
    if (command === "R") {
      while (tracker <= distance) {
        const point = [lastPoint[0] + tracker, lastPoint[1]];
        wireTwoPoints.push(point);
        wireTwoStepCount++;
        wireTwoStepsTakenPerPoint.set(JSON.stringify(point), wireTwoStepCount);
        tracker++;
      }
    }
    if (command === "L") {
      while (tracker <= distance) {
        const point = [lastPoint[0] - tracker, lastPoint[1]];
        wireTwoPoints.push(point);
        wireTwoStepCount++;
        wireTwoStepsTakenPerPoint.set(JSON.stringify(point), wireTwoStepCount);
        tracker++;
      }
    }
  });

  let intersections = wireOnePoints.filter(p1 =>
    wireTwoPoints.some(p2 => p1[0] === p2[0] && p1[1] === p2[1])
  );

  intersections.shift(); // get rid of the first element the start point

  console.log(intersections);

  const sumStepsTaken = intersections.map(i => {
    const stringI = JSON.stringify(i);
    return (
      (wireOneStepsTakenPerPoint.get(stringI) || 0) +
      (wireTwoStepsTakenPerPoint.get(stringI) || 0)
    );
  });

  console.log(Math.min(...sumStepsTaken));

  const distances = intersections.map(p => getDistanceFromStart(p));

  return Math.min(...distances);
}

function getDistanceFromStart(point: number[]): number {
  return Math.abs(0 - point[0]) + Math.abs(0 - point[1]);
}
