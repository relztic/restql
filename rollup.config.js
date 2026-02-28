// External Packages
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import visualizer from 'rollup-plugin-visualizer'

// Internal Packages
import pkg from './package.json'

// The npm registry does not allow a `package.json` with non-reserved keys.
pkg.src = './src/index.js'
pkg.dist = './dist/umd/index.js'

/**
 * @constant {string} * The environmental settings.
 */
const { NODE_ENV, RESTQL_FMT } = process.env

/**
 * @constant {boolean} * The conditional constants.
 */
const IS_DEVELOPMENT = NODE_ENV === 'development'
const IS_PRODUCTION = NODE_ENV === 'production'
const IS_CJS = RESTQL_FMT === 'cjs'
const IS_ES = RESTQL_FMT === 'es'
const IS_UMD = RESTQL_FMT === 'umd'

/**
 * @constant {Object} config The config of the library.
 */
const config = {
  input: pkg.src,
  ...((IS_CJS || IS_ES) && {
    external: ['axios', 'babel-runtime/regenerator', 'lodash/cloneDeep', 'lodash/merge', 'md5', 'validator/lib/isURL'],
    output: {
      file: IS_CJS ? pkg.main : pkg.module,
      format: RESTQL_FMT,
    },
    plugins: [babel()],
  }),
  ...(IS_UMD && {
    output: {
      file: IS_DEVELOPMENT ? pkg.dist : pkg.dist.replace('.js', '.min.js'),
      format: RESTQL_FMT,
      name: pkg.name,
    },
    plugins: [
      builtins(),
      resolve({ browser: true }),
      commonjs({ exclude: 'src/**' }),
      json({ exclude: 'src/**' }),
      globals(),
      babel(),
      IS_DEVELOPMENT && visualizer(),
      IS_PRODUCTION && uglify(),
    ].filter(Boolean),
  }),
}

export default config
