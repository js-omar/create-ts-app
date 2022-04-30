#! /usr/bin/env node
/* eslint-disable global-require */
import { exec } from 'child_process';

function callback(error, stdout, stderr) {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
}

const commands2 = [
  'git add .',
  "git commit -m 'init'",
  'git checkout -b staging',
  'git checkout -b master',
  'git checkout develop',
];

const git = () => {
  console.log('initializing git branches...');
  exec(commands2.join(' && '), callback);
};

const commands1 = [
  'npx install-peerdeps --dev @js-omar/eslint-config@latest',
  'npm i -D prettier@latest eslint-plugin-prettier@latest prettier-plugin-tailwindcss@latest',
  'npx husky-init',
  'npm i',
  'npm i -D typescript rimraf cspell jest ts-jest @types/jest',
];

const installPackages = () => {
  console.log('installing packages...');
  exec(commands1.join(' && '), (error, stdout, stderr) => {
    if (error) return console.log(`error: ${error.message}`);
    if (stderr) return console.log(`stderr: ${stderr}`);
    require('../src/husky');
    setTimeout(git, 500);
    return console.log(`stdout: ${stdout}`);
  });
};

console.log('Initializing git..');

const writeFiles = () => {
  require('../src/vscode/settings');
  require('../src/package-json.js');
  require('../src/git-ignore.js');
  require('../src/ts-config.js');
  require('../src/eslintrc.js');
  require('../src/prettierrc.js');
  require('../src/prettierignore.js');
  require('../src/cspell.js');
  require('../src/jest-config.js');
  require('../src/github/workflows/test-and-build');
  require('../src/github/workflows/npm-publish');
  require('../src/src/index');
  require('../src/test/index');
  require('../src/license.js');
  require('../src/read-me.js');
};

exec('git init -b develop', (error, stdout, stderr) => {
  if (error) return console.log(`error: ${error.message}`);
  if (stderr) return console.log(`stderr: ${stderr}`);
  writeFiles();
  setTimeout(installPackages, 2500);
  return console.log(`stdout: ${stdout}`);
});
