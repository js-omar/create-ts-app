const fs = require('fs');

const content = `/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  maxWorkers: '50%',
  automock: false, // cspell:disable-line
  clearMocks: true,
  // collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};
`;

// writeFile function with filename, content and callback function
fs.writeFile('jest.config.js', content, (err) => {
  if (err) throw err;
  console.log('jest.config.js is created successfully.');
});
