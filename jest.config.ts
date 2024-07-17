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
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

export default config;
