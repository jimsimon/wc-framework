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
      dir : 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 100,
          lines: 100,
          functions: 100,
          branches: 100
        }
      }
    }
  })
}
