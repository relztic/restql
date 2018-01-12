// External packages
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import visualizer from 'rollup-plugin-visualizer'

// Internal packages
import pkg from './package.json'

// The npm registry does not allow a `package.json` with non-reserved keys.
pkg.src = './src/index.js'
pkg.dist = './dist/umd/index.js'

const { FMT, NODE_ENV } = process.env
const IS_CJS = (FMT === 'cjs')
const IS_ES = (FMT === 'es')
const IS_UMD = (FMT === 'umd')
const IS_DEVELOPMENT = (NODE_ENV === 'development')
const IS_PRODUCTION = (NODE_ENV === 'production')

export default {
  input: pkg.src,
  ...((IS_CJS || IS_ES) && {
    external: [
      'axios',
      'babel-runtime/regenerator',
      'lodash/merge',
      'url-regex',
    ],
    output: {
      file: (IS_CJS)
        ? pkg.main
        : pkg.module,
      format: FMT,
    },
    plugins: [
      babel(),
    ],
  }),
  ...((IS_UMD) && {
    output: {
      file: (IS_DEVELOPMENT)
        ? pkg.dist
        : pkg.dist.replace('.js', '.min.js'),
      format: FMT,
      name: pkg.name,
    },
    plugins: [
      builtins(),
      resolve({
        browser: true,
      }),
      commonjs({
        exclude: 'src/**',
      }),
      json({
        exclude: 'src/**',
      }),
      globals(),
      babel(),
      (IS_PRODUCTION)
        ? uglify()
        : visualizer(),
    ],
  }),
}
