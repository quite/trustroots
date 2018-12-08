/** @format */

// File originally modified from
// https://github.com/Automattic/wp-calypso/blob/6dc51e9edc64fd30ef9dc86bc28d0cb92dfe9e5c/bin/pre-commit-hook.js

const execSync = require('child_process').execSync;
const spawnSync = require('child_process').spawnSync;
const chalk = require('chalk');

/**
 * Parses the output of a git diff command into javascript file paths.
 *
 * @param   {String} command Command to run. Expects output like `git diff --name-only […]`
 * @returns {Array}          Paths output from git command
 */
function parseGitDiffToPathArray(command) {
  return execSync(command, { encoding: 'utf8' })
    .split('\n')
    .map(name => name.trim())
    .filter(name => /\.(js|less|md)$/.test(name));
}

const dirtyFiles = new Set(
  parseGitDiffToPathArray('git diff --name-only --diff-filter=ACM'),
);
const files = parseGitDiffToPathArray(
  'git diff --cached --name-only --diff-filter=ACM',
);

dirtyFiles.forEach(file =>
  console.log(
    chalk.red(
      `${file} will not be auto-formatted because it has unstaged changes.`,
    ),
  ),
);

const toPrettify = files.filter(file => !dirtyFiles.has(file));
toPrettify.forEach(file =>
  console.log(`Prettier formatting staged file: ${file}`),
);

if (toPrettify.length) {
  execSync(
    `./node_modules/.bin/prettier --ignore-path .eslintignore --write --require-pragma ${toPrettify.join(
      ' ',
    )}`,
  );
  execSync(`git add ${toPrettify.join(' ')}`);
}
