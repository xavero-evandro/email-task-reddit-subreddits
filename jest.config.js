module.exports = {
  collectCoverageFrom: ['src/**/*.{ts, js}'],
  clearMocks: true,
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/test/**/*.test.(ts)'],
  testEnvironment: 'node',
};
