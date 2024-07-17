import type {Config} from 'jest';
import {compilerOptions} from './tsconfig.json';
import {pathsToModuleNameMapper} from "ts-jest";

const {paths} = compilerOptions;

const config: Config = {
  preset: 'jest-preset-angular',
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: [
    "json",
    "text",
    "lcov"
  ],
  maxWorkers: 3,
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, {prefix: '<rootDir>'}),
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/app/app-routing.module.ts',
    '<rootDir>/src/tests/'
  ],
};

export default config;
