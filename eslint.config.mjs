import { defineConfig } from 'eslint/config';
import globals from 'globals';
import * as jsoncParser from 'jsonc-eslint-parser';
import jsoncPlugin from 'eslint-plugin-jsonc';
import cypressPlugin from 'eslint-plugin-cypress';
import js from '@eslint/js';

export default defineConfig([

  // Base JS recommended rules
  js.configs.recommended,

  // Cypress plugin (Flat Config)
  {
    files: ['cypress/**/*.js', 'cypress/**/*.ts'],
    plugins: {
      cypress: cypressPlugin
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules
    }
  },

  // JSON / JSONC support (Flat Config)
  {
    files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
    languageOptions: {
      parser: jsoncParser
    },
    plugins: {
      jsonc: jsoncPlugin
    },
    rules: {
      ...jsoncPlugin.configs['recommended-with-json'].rules,

      // Your overrides
      'jsonc/array-bracket-newline': ['error', { multiline: true }],
      'jsonc/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
      'jsonc/object-curly-newline': ['error', { multiline: true, minProperties: 1 }],
      'jsonc/array-bracket-spacing': ['error', 'never'],
      'jsonc/array-element-newline': ['error', 'consistent'],
      'jsonc/object-curly-spacing': ['error', 'never'],
      'jsonc/indent': ['error', 2]
    }
  },

  // Your main JS rules
  {
    languageOptions: {
      globals: {
        ...globals.node,
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        assert: 'readonly'
      }
    },
    rules: {
      complexity: 'off',
      'max-len': 'off',
      'max-params': ['error', 5],
      'max-statements': 'off',
      'max-depth': 'off',
      'max-nested-callbacks': 'off',
      indent: ['error', 2],
      'linebreak-style': 'off',
      'space-before-function-paren': ['error', 'always'],
      curly: ['error', 'all'],
      'brace-style': ['error', '1tbs'],
      quotes: ['warn', 'single', 'avoid-escape'],
      eqeqeq: ['error', 'allow-null'],
      semi: ['error', 'always'],
      'new-cap': 'off',
      'no-console': 'off',
      'no-empty': 'off',
      'no-unused-vars': 'warn',
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'no-trailing-spaces': ['error', { skipBlankLines: false }],
      'cypress/no-unnecessary-waiting': 'off',
      'cypress/unsafe-to-chain-command': 'off',
      'eol-last': ['error', 'never']
    }
  }

]);