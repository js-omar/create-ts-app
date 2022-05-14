#! /usr/bin/env npx ts-node
import { readFileSync, statSync, writeFileSync, mkdirSync } from 'fs';
import { green, grey, bgYellowBright, bgGreen, white } from 'chalk';
import { exec } from 'child_process';
import { join } from 'path';

const files = [
  ['.github', 'workflows', 'npm-publish.yml'],
  ['.github', 'workflows', 'test-and-build.yml'],
  ['.vscode', 'settings.json'],
  ['src', 'index.ts'],
  ['test', 'index.spec.ts'],
  ['.editorconfig'],
  ['.eslintrc.json'],
  ['.gitignore'],
  ['.prettierignore'],
  ['.prettierrc'],
  ['cspell.json'],
  ['jest.config.js'],
  ['LICENSE'],
  ['package.json'],
  ['README.md'],
  ['tsconfig.json'],
];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const filePath = join(__dirname, './../src/content', ...file);
  const size = `(${statSync(filePath).size} bytes)`;

  if (file.length > 1) {
    mkdirSync(file.slice(0, file.length - 1).join('/'), { recursive: true });
  }

  writeFileSync(file.join('/'), readFileSync(filePath));

  console.log(`${green('CREATE')} app/${file.join('/')} ${grey(size)}`);
}

const huskyPreCommit = `echo 'Run Test:All'; npm run test:all || echo '🚨 Test Failed'; echo '✅ test passed'; npm run build; git add .;`;

const commands = [
  'git init -b develop',
  'npx install-peerdeps --dev @js-omar/eslint-config@latest',
  'npm i -D prettier@latest eslint-plugin-prettier@latest prettier-plugin-tailwindcss@latest',
  'npm i -D husky',
  'npx husky install',
  `npx husky add .husky/pre-commit "${huskyPreCommit}"`,
  'npm i',
  'npm i -D typescript rimraf cspell',
  'npm i -D jest ts-jest @types/jest jest-environment-jsdom',
  'git add .',
  'git commit -m "init"',
  'git checkout -b staging',
  'git checkout -b master',
  'git checkout develop',
];

function runCommands(): void {
  console.log(bgYellowBright(white(' Installing Packages ')));
  exec(commands.join(' && '), (error, _, stderr) => {
    if (error) return console.log(`error: ${error.message}`);
    if (stderr) return console.log(`stderr: ${stderr}`);
    console.log(bgGreen(white(' Packages Installed ')));
    return console.log(bgGreen(white(' Git Initialized ')));
  });
}

runCommands();
