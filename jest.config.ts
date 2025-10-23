import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  //   transform: {
  //     // '^.+\\.[tj]sx?$' для обработки файлов js/ts с помощью `ts-jest`
  //     // '^.+\\.m?[tj]sx?$' для обработки файлов js/ts/mjs/mts с помощью `ts-jest`
  //     '^.+\\.tsx?$': [
  //       'ts-jest',
  //       {
  //         // настройки для ts-jest
  //       }
  //     ]
  //   },
  moduleNameMapper: {
    '^@slices$': '<rootDir>/src/services/slices/index.ts',
    '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@utils-types$': '<rootDir>/src/utils/types.ts'
  }
  //   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx']
};

export default config;
