const path = require('path');

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
    'plugin:react/jsx-runtime',
    // prettier/react has been merged into the prettier config (which is set up by plugin:prettier/recommended)
    // please leave this plugin config at the bottom
    // https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
    'plugin:prettier/recommended',
    'plugin:i18n-json/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    'src/design-system/theme/moduleAugmentation.ts',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.json'],
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
      },
    ],
    'default-case': 'off',
    'func-names': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off', // using @typescript-eslint/no-unused-vars
    'no-use-before-define': 'off', // prevents bug 'React' was used before it was defined, @typescript-eslint version is used instead
    'no-unused-expressions': 'off',
    'arrow-body-style': 'off', // allows us to use return immediately after arrow function opening bracket
    'no-shadow': 'off', // variables and interface properties are incorrectly reported. Used @typescript-eslint/no-shadow
    '@typescript-eslint/explicit-module-boundary-types': 'off', // most errors are related to default exports of function components returning ReactNode
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // TODO: 140 errors mostly in template files
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off', // TODO: 28k+ errors
    '@typescript-eslint/camelcase': 'off',

    'no-param-reassign': 'error',
    radix: 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false },
    ], //allows to place styled components at the botttom of files, to avoid visual polution.

    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/promise-function-async': [
      'error',
      {
        allowedPromiseNames: ['Thenable'],
        checkArrowFunctions: true,
        checkFunctionDeclarations: true,
        checkFunctionExpressions: true,
        checkMethodDeclarations: true,
      },
    ],
    'import/no-unresolved': ['error'],
    'import/default': 'error',
    'import/named': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroups: [
          { pattern: 'greenly-shared', group: 'external', position: 'after' },
          { pattern: '@*/*', group: 'external' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          ['builtin', 'external'],
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'import/prefer-default-export': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/self-closing-comp': 'error',
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-array-index-key': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unused-state': 'error',
    'react/jsx-props-no-spreading': ['error', { html: 'ignore' }],

    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-multi-comp': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/sort-comp': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/static-property-placement': 'off',
    'react/display-name': 'off',
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
    {
      files: ['src/design-system/components/**/*.tsx'],
      rules: {
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/ban-types': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    {
      files: ['./public/locales/**/translation.json'],
      plugins: ['i18n-json'],
      rules: {
        'prettier/prettier': 'off',
        'i18n-json/identical-keys': [
          2,
          {
            filePath: path.resolve('./public/locales/en/translation.json'),
          },
        ],
        'i18n-json/valid-message-syntax': 0,
        'i18n-json/valid-json': 0,
        'i18n-json/sorted-keys': 0,
      },
    },
  ],
  settings: {
    plugins: ['json-format'],
    'import/resolver': {
      node: {
        "moduleDirectory": ["node_modules", "src/"]
      },
      webpack: {
        env: {
          NODE_ENV: 'production',
          production: true,
        },
        config: path.join(
          __dirname,
          'node_modules/react-scripts/config/webpack.config.js',
        ),
        mode: 'production',
      },
    },
    react: {
      version: 'detect',
    },
    'json/json-with-comments-files': ['.vscode/**'],
  },
};