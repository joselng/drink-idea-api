const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.ts',
  ],
  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  coverageReporters: [
    'text-summary',
    'lcov',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  preset: 'ts-jest',
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
  testMatch: [
    '**/*.test.ts',
  ],
};
