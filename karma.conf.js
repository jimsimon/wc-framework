module.exports = function (config) {
  'use strict'
  config.set({
    frameworks: ['mocha', 'chai-sinon'],
    files: [
      {pattern: "tests/**/*.test.js", watched: false}
    ],
    preprocessors: {
      "tests/**/*.js": ["webpack"]
    },
    browsers: ['Chrome'],
    client: {
      chai: {
        includeStack: true
      }
    },
    singleRun: true,
    webpack: require('./webpack.config')
  })
}
