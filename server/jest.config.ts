import { resolve } from 'path'

import { type Config } from 'jest'

export default {
  collectCoverageFrom: [
    '**/*.(t|j)s',
  ],
  coverageDirectory: resolve(__dirname, 'coverage'),
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: __dirname,
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
} satisfies Config
