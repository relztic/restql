import { base as baseAirbnb } from 'eslint-flat-config-airbnb'
import pluginJest from 'eslint-plugin-jest'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  ...baseAirbnb,
  ...tseslint.configs.recommended,
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
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
    rules: {
      'import/extensions': 'off',
    },
  },
  {
    files: ['src/**/__mocks__/**/*.ts', 'src/**/__tests__/**/*.ts'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: globals.jest,
    },
    rules: pluginJest.configs.recommended.rules,
  },
  pluginPrettierRecommended,
  { ignores: ['node_modules/', 'coverage/', 'dist/'] },
]
