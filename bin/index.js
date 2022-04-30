#! /usr/bin/env node
const { exec } = require('child_process');

console.log('Initializing git..');
exec('git init -b develop', (error, stdout, stderr) => {
  if (error) return console.log(`error: ${error.message}`);
  if (stderr) return console.log(`stderr: ${stderr}`);
  writeFiles();
  setTimeout(installPackages, 2500);
  return console.log(`stdout: ${stdout}`);
});

const writeFiles = () => {
  require('../src/vscode/settings');
  require('../src/package-json.js');
  require('../src/git-ignore.js');
  require('../src/ts-config.js');
  require('../src/eslintrc.js');
  require('../src/prettierrc.js');
  require('../src/prettierignore.js'); // cspell:disable-line
  require('../src/cspell.js');
  require('../src/jest-config.js');
  require('../src/github/workflows/test-and-build');
  require('../src/github/workflows/npm-publish');
  require('../src/src/index');
  require('../src/test/index');
  require('../src/license.js');
  require('../src/read-me.js');
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

const commands2 = [
  'git add .',
  "git commit -m 'init'",
  'git checkout -b staging',
  'git checkout -b master',
];

const git = () => {
  console.log('initializing git branches...');
  exec(commands2.join(' && '), callback);
};

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
