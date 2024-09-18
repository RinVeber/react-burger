import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', 
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    // transformIgnorePatterns: ['node_modules/(?!(@testing-library/.*))'], 
    // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], 
    moduleNameMapper: {
        '^.+\\.(css|sass|scss)$': 'identity-obj-proxy', 
      },
  };

  export default config;