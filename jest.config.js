/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['<rootDir>/test'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
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
