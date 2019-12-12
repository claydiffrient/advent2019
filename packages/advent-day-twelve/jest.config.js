const base = require("../../jest.config");

module.exports = {
  ...base,
  projects: ["<rootDir>/packages/*/jest.config.js"]
};
