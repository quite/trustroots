/** @format */

const es2018rules = {
  'no-var': 2,
  'prefer-const': 2,
  'arrow-spacing': [2, { before: true, after: true }],
};

module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  /*
   * These would ideally belong to their specific overrides
   * but overrides can't include extends:
   * https://github.com/eslint/eslint/issues/8813
   */
  extends: [
    './.eslintrc-defaults.json',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
  ],
  settings: {
    react: {
      version: '16.6',
    },
  },
  env: {
    es6: true,
    node: true,
    browser: true,
    jasmine: true,
    mocha: true,
    jquery: true,
  },
  globals: {
    angular: true,
    PruneCluster: true,
    PruneClusterForLeaflet: true,
    PhusionPassenger: true,
    L: true,
    by: true,
    browser: true,
    element: true,
    inject: true,
    moment: true,
    Promise: true,
    __TESTING__: true,
    _: false,
    AppConfig: true,
  },
  /*
    eventually, after the migration, these overrides will become the main rules
    it would be nice to keep the rules for client and server separate,
    because eventually, they want to become independent codebases.
  */
  overrides: [{
    // overrides for server code
    // ES 2018 - specify migrated files and folders here
    files: [
      'testutils/data.server.testutils.js',
      'modules/references/server/**',
      'modules/references/tests/server/**',
      'modules/users/tests/server/user-change-locale.server.routes.tests.js'
    ],
    parserOptions: {
      ecmaVersion: 2018
    },
    rules: es2018rules
  }, {
    // overrides for client/react code
    files: [
      '.eslintrc-angular.js',
      '.eslintrc.js',
      'bin/ensure-config-exists.js',
      'bin/ensure-uploads-dir-exists.js',
      'bin/pre-commit-hook.js',
      'config/webpack/**',
      'config/lib/i18n.js',
      'modules/core/client/app/config.js',
      'modules/**/client/components/**',
      'modules/core/client/directives/tr-boards.client.directive.js',
      'modules/core/client/services/photos.service.js'
    ],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module'
    },
  }],
};
