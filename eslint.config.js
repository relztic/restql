import { base as airbnbConfig } from 'eslint-flat-config-airbnb'
import jestPlugin from 'eslint-plugin-jest'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default [
  { ignores: ['node_modules/', 'coverage/', 'dist/'] },
  ...airbnbConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    files: ['src/**/__mocks__/**/*.js', 'src/**/__tests__/**/*.js'],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: globals.jest,
    },
    rules: jestPlugin.configs.recommended.rules,
  },
  prettierPlugin,
]
