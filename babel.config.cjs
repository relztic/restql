// Used by Jest. Rollup uses .babelrc.
// babelrc: false prevents .babelrc from being merged during tests.
module.exports = {
  babelrc: false,
  env: {
    test: {
      presets: ['@babel/preset-env'],
    },
  },
}
