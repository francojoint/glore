import { resolve } from 'node:path'

import { type Config } from 'jest'

export default {
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: resolve(__dirname, 'test/coverage'),
  moduleFileExtensions: ['ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: __dirname,
  testEnvironment: 'node',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
} satisfies Config
