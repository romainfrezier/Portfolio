import type {Config} from 'jest';
import {pathsToModuleNameMapper} from 'ts-jest';
import {compilerOptions} from './tsconfig.json';

const {paths} = compilerOptions;

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, {prefix: '<rootDir>'}),
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: 'coverage'
};

export default jestConfig;
