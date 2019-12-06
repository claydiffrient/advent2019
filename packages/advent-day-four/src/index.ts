export function isValidPassword(password: number): boolean {
  const stringPassword = String(password);
  const counts: { [s: string]: number } = {};
  let minVal = Number.parseInt(stringPassword[0], 10);
  for (let i = 0; i < stringPassword.length; i++) {
    const numVal = Number.parseInt(stringPassword[i], 10);
    if (numVal < minVal) {
      return false;
    } else {
      minVal = numVal;
    }
    if (counts[stringPassword[i]]) {
      counts[stringPassword[i]]++;
    } else {
      counts[stringPassword[i]] = 1;
    }
  }
  if (Math.max(...Object.values(counts)) < 2) {
    return false;
  }
  let hasPairOfExactlyTwo = false;
  Object.values(counts).forEach(c => {
    if (c === 2) {
      hasPairOfExactlyTwo = true;
    }
  });
  if (!hasPairOfExactlyTwo) {
    return false;
  }
  return true;
}

export function countValids(minimum: number, maximum: number): number {
  let validCount = 0;
  while (minimum < maximum) {
    if (isValidPassword(minimum)) {
      validCount++;
    }
    minimum++;
  }
  return validCount;
}
