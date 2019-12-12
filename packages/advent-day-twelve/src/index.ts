interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export interface Planet {
  position: Coordinates;
  velocity: Coordinates;
}

export function applyGravity(planets: Planet[]): Planet[] {
  const planetCopy = JSON.parse(JSON.stringify(planets));
  for (let i = 0; i < planetCopy.length; i++) {
    for (let j = 0; j < planetCopy.length; j++) {
      if (i === j) {
        continue;
      }
      if (planetCopy[i].position.x > planetCopy[j].position.x) {
        planetCopy[i].velocity.x -= 1;
      } else if (planetCopy[i].position.x < planetCopy[j].position.x) {
        planetCopy[i].velocity.x += 1;
      }
      if (planetCopy[i].position.y > planetCopy[j].position.y) {
        planetCopy[i].velocity.y -= 1;
      } else if (planetCopy[i].position.y < planetCopy[j].position.y) {
        planetCopy[i].velocity.y += 1;
      }
      if (planetCopy[i].position.z > planetCopy[j].position.z) {
        planetCopy[i].velocity.z -= 1;
      } else if (planetCopy[i].position.z < planetCopy[j].position.z) {
        planetCopy[i].velocity.z += 1;
      }
    }
  }

  return planetCopy;
}

export function updateX(planets: Planet[]): Planet[] {
  const planetCopy: Planet[] = JSON.parse(JSON.stringify(planets));
  for (let i = 0; i < planetCopy.length; i++) {
    for (let j = 0; j < planetCopy.length; j++) {
      if (i === j) {
        continue;
      }
      if (planetCopy[i].position.x > planetCopy[j].position.x) {
        planetCopy[i].velocity.x -= 1;
      } else if (planetCopy[i].position.x < planetCopy[j].position.x) {
        planetCopy[i].velocity.x += 1;
      }
    }
  }
  const result = planetCopy.map(p => ({
    ...p,
    position: { ...p.position, x: p.position.x + p.velocity.x }
  }));

  return result;
}

export function updateY(planets: Planet[]): Planet[] {
  const planetCopy: Planet[] = JSON.parse(JSON.stringify(planets));
  for (let i = 0; i < planetCopy.length; i++) {
    for (let j = 0; j < planetCopy.length; j++) {
      if (i === j) {
        continue;
      }
      if (planetCopy[i].position.y > planetCopy[j].position.y) {
        planetCopy[i].velocity.y -= 1;
      } else if (planetCopy[i].position.y < planetCopy[j].position.y) {
        planetCopy[i].velocity.y += 1;
      }
    }
  }
  return planetCopy.map(p => ({
    ...p,
    position: { ...p.position, y: p.position.y + p.velocity.y }
  }));
}

export function updateZ(planets: Planet[]): Planet[] {
  const planetCopy: Planet[] = JSON.parse(JSON.stringify(planets));
  for (let i = 0; i < planetCopy.length; i++) {
    for (let j = 0; j < planetCopy.length; j++) {
      if (i === j) {
        continue;
      }
      if (planetCopy[i].position.z > planetCopy[j].position.z) {
        planetCopy[i].velocity.z -= 1;
      } else if (planetCopy[i].position.z < planetCopy[j].position.z) {
        planetCopy[i].velocity.z += 1;
      }
    }
  }
  return planetCopy.map(p => ({
    ...p,
    position: { ...p.position, z: p.position.z + p.velocity.z }
  }));
}

export function applyVelocity(planets: Planet[]): Planet[] {
  return planets.map(p => ({
    ...p,
    position: {
      x: p.position.x + p.velocity.x,
      y: p.position.y + p.velocity.y,
      z: p.position.z + p.velocity.z
    }
  }));
}

export function runRounds(planets: Planet[], numRounds: number): Planet[] {
  let results: Planet[] = JSON.parse(JSON.stringify(planets));
  for (let i = 0; i < numRounds; i++) {
    results = applyGravity(results);
    results = applyVelocity(results);
  }
  return results;
}

export function getSystemEnergy(planets: Planet[]): number {
  return planets
    .map(p => {
      const potential =
        Math.abs(p.position.x) +
        Math.abs(p.position.y) +
        Math.abs(p.position.z);
      const kinetic =
        Math.abs(p.velocity.x) +
        Math.abs(p.velocity.y) +
        Math.abs(p.velocity.z);
      return potential * kinetic;
    })
    .reduce((prev, cur) => prev + cur);
}

export function parsePlanets(input: string): Planet[] {
  const coordRegex = /x=(-?\d+).*y=(-?\d+).*z=(-?\d+)/;
  const lines = input.split("\n");
  return lines.map(line => {
    const matches = line.match(coordRegex);
    return {
      position: {
        x: (matches && Number(matches[1])) || 0,
        y: (matches && Number(matches[2])) || 0,
        z: (matches && Number(matches[3])) || 0
      },
      velocity: {
        x: 0,
        y: 0,
        z: 0
      }
    };
  });
}
