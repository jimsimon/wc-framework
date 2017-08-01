module.exports = function (config) {
  'use strict'
  config.set({
    frameworks: ['mocha', 'chai-sinon'],
    files: [
      {pattern: "tests/**/*.test.js", watched: false}
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      "tests/**/*.js": ["webpack", 'sourcemap']
    },
    browsers: ['Chrome'],
    client: {
      chai: {
        includeStack: true
      }
    },
    singleRun: true,
    webpack: require('./webpack.config'),
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
  })
}
