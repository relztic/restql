import { createRequire } from 'module'

import resolve from '@rollup/plugin-node-resolve'
import { dts } from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { visualizer } from 'rollup-plugin-visualizer'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const { MODULE_FMT, MINIFY, TYPES } = process.env
const IS_ESM = MODULE_FMT === 'esm'
const IS_UMD = MODULE_FMT === 'umd'
const SHOULD_MINIFY = MINIFY === 'true'
const BUILD_TYPES = TYPES === 'true'

export default {
  input: './src/index.ts',
  output: {
    name: pkg.name,
    format: MODULE_FMT,
    file: IS_UMD
      ? SHOULD_MINIFY
        ? pkg.unpkg.replace('.js', '.min.js')
        : pkg.unpkg
      : IS_ESM
        ? BUILD_TYPES
          ? pkg.types
          : pkg.module
        : pkg.main,
    sourcemap: SHOULD_MINIFY,
  },
  external: !IS_UMD && !BUILD_TYPES ? ['es-toolkit'] : [],
  plugins: [
    resolve({
      browser: IS_UMD,
      preferBuiltins: !IS_UMD,
    }),
    esbuild({ minify: SHOULD_MINIFY }),
    IS_UMD && !SHOULD_MINIFY && visualizer(),
    BUILD_TYPES && dts(),
  ].filter(Boolean),
}
