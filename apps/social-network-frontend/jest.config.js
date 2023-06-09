module.exports = {
  displayName: 'social-network-frontend',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/social-network-frontend',
  collectCoverageFrom: [
    'src/app/**/*.ts',
    'src/app/**/*.tsx',
    '!src/**/*.svg'
  ],
  setupFilesAfterEnv: ['../../libs/social-network-frontend/utils-testing/src/lib/setupTests.ts'],
  reporters: ['default', ['jest-sonar', {
    outputDirectory: 'build/test-results/jest',
    outputName: 'social-network-frontend.xml',
    reportedFilePath: 'relative',
    relativeRootDir: '<rootDir>/../',
  }]]
};
