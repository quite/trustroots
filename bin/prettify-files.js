#!/usr/bin/env node

/** @format */

/**
 * Formats files using JSCodeshift and Prettier.
 *
 * - Removes strict mode statements:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
 *
 * - Adds @format pragma and prettifies files using Prettier
 *   https://prettier.io/docs/en/options.html#insert-pragma
 *
 * See ../docs/Migrating-to-Prettier.md for more.
 */

const execSync = require('child_process').execSync;
const replaceInFile = require('replace-in-file');

const [ /* node */, /* this file */, ...files ] = process.argv;

// Remove`no-strict`
try {
  replaceInFile.sync({
    files,
    from: /'use strict';/g,
    to: '',
  });
  console.log('Removed strict mode from files.');
}
catch (error) {
  console.error('Error occurred:', error);
}

// Add Prettier-pragma and run Prettier
execSync(
  [
    './node_modules/.bin/prettier',
    '--insert-pragma',
    '--require-pragma=false',
    '--ignore-path .eslintignore',
    '--write',
    ...files,
  ].join(' ')
);

console.log('Done prettifying!');
