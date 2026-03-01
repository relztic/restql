import { createRequire } from 'module'

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import { visualizer } from 'rollup-plugin-visualizer'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

/**
 * @constant {string} * The environmental settings.
 */
const { MODULE_FMT, MINIFY } = process.env

/**
 * @constant {boolean} * The conditional constants.
 */
const IS_CJS = MODULE_FMT === 'cjs'
const IS_ESM = MODULE_FMT === 'esm'
const IS_UMD = MODULE_FMT === 'umd'
const SHOULD_MINIFY = MINIFY === 'true'

const babelPlugin = babel({
  babelHelpers: 'bundled',
  exclude: /node_modules/,
})

/**
 * @constant {Object} config The config of the library.
 */
const config = {
  input: './src/index.js',
  ...((IS_CJS || IS_ESM) && {
    external: ['axios', 'lodash/cloneDeep', 'lodash/merge', 'md5', 'validator/lib/isURL'],
    output: {
      file: IS_CJS ? pkg.main : pkg.module,
      format: MODULE_FMT,
    },
    plugins: [babelPlugin],
  }),
  ...(IS_UMD && {
    output: {
      file: SHOULD_MINIFY ? pkg.unpkg.replace('.js', '.min.js') : pkg.unpkg,
      format: MODULE_FMT,
      name: pkg.name,
    },
    plugins: [
      nodePolyfills(),
      resolve({ browser: true, preferBuiltins: false }),
      commonjs(),
      json(),
      babelPlugin,
      !SHOULD_MINIFY && visualizer(),
      SHOULD_MINIFY && terser({ maxWorkers: 1 }),
    ].filter(Boolean),
  }),
}

export default config
