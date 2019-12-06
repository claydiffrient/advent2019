"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidPassword(password) {
    const stringPassword = String(password);
    const counts = {};
    let minVal = Number.parseInt(stringPassword[0], 10);
    for (let i = 0; i < stringPassword.length; i++) {
        const numVal = Number.parseInt(stringPassword[i], 10);
        if (numVal < minVal) {
            return false;
        }
        else {
            minVal = numVal;
        }
        if (counts[stringPassword[i]]) {
            counts[stringPassword[i]]++;
        }
        else {
            counts[stringPassword[i]] = 1;
        }
    }
    if (Math.max(...Object.values(counts)) < 2) {
        return false;
    }
    return true;
}
exports.isValidPassword = isValidPassword;
function countValids(minimum, maximum) {
    let validCount = 0;
    while (minimum < maximum) {
        if (isValidPassword(minimum)) {
            validCount++;
        }
        minimum++;
    }
    return validCount;
}
exports.countValids = countValids;
