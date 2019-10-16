module.exports = {
  name: 'graphql',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/graphql',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
