#! /usr/bin/env npx ts-node
import { readFileSync, statSync, writeFileSync, mkdirSync } from 'fs';
import chalk from 'chalk';
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

  console.log(
    `${chalk.green('CREATE')} app/${file.join('/')} ${chalk.grey(size)}`
  );
}

const huskyPreCommit = `npm run test:all || (echo '🚨 Test Failed'; false); npm run build || (echo '🚨 Build failed'; false); git add .`;

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
  console.log(chalk.bgYellowBright(' Installing Packages '));
  exec(commands.join(' && '), (error, _, stderr) => {
    if (error) return console.log(`error: ${error.message}`);
    if (stderr) return console.log(`stderr: ${stderr}`);
    console.log(chalk.bgGreen(' Packages Installed '));
    return console.log(chalk.bgGreen(' Git Initialized '));
  });
}

runCommands();
