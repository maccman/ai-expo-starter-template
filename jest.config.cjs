/** @type {import('jest').Config} */
module.exports = {
  // Library/logic tests (node environment)
  displayName: 'lib',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.lib.ts'],
  testMatch: ['<rootDir>/lib/**/__tests__/**/*.(test|spec).ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\](node_modules|\\.pnpm)[/\\\\]'],
}
