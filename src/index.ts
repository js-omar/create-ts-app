#! /usr/bin/env npx ts-node
import { readFileSync, statSync, writeFileSync, mkdirSync } from 'fs';
import { exec } from 'child_process';
import { join } from 'path';

const chalk = {
  green: (text: string) => text,
  grey: (text: string) => text,
  bgYellowBright: (text: string) => text,
  bgGreen: (text: string) => text,
};

const files = [
  ['.github', 'workflows', 'publish.yml'],
  ['.github', 'workflows', 'code-quality.yml'],
  ['.vscode', 'settings.json'],
  ['src', 'index.ts'],
  ['src', 'math.ts'],
  ['test', 'math.spec.ts'],
  ['.editorconfig'],
  ['.eslintrc.json'],
  ['gitignore'],
  ['.mailmap'],
  ['.prettierignore'],
  ['.prettierrc'],
  ['AUTHORS'],
  ['CHANGELOG.md'],
  ['commitlint.config.js'],
  ['cspell.json'],
  ['jest.config.js'],
  ['LICENSE'],
  ['package.json'],
  ['README.md'],
  ['tsconfig.json'],
];

for (let i = 0; i < files.length; i++) {
  let file = files[i];
  const filePath = join(__dirname, './../src/content', ...file);
  const size = `(${statSync(filePath).size} bytes)`;

  if (file.length > 1) {
    mkdirSync(file.slice(0, file.length - 1).join('/'), { recursive: true });
  }

  if (file[0] === 'gitignore') file = [`.${file[0]}`];

  writeFileSync(file.join('/'), readFileSync(filePath));

  console.log(
    `${chalk.green('CREATE')} app/${file.join('/')} ${chalk.grey(size)}`
  );
}

const huskyPreCommit = `npm run test:all:ci || (echo '🚨 Test Failed'; false)`;

const commands = [
  'git init -b develop',
  'npx install-peerdeps --dev @js-omar/eslint-config@latest',
  'npm i -D prettier@latest eslint-plugin-prettier@latest prettier-plugin-tailwindcss@latest',
  'npm i -D husky',
  'npx husky install',
  `npx husky add .husky/pre-commit "${huskyPreCommit}"`,
  'npm install -D @commitlint/cli @commitlint/config-conventional',
  `npx husky add .husky/commit-msg "npx --no -- commitlint --edit '$1'"`,
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
  console.log(chalk.bgYellowBright('Installing Packages...'));
  exec(commands.join(' && '), (error, _, stderr) => {
    if (error) return console.log(`error: ${error.message}`);
    if (stderr) return console.log(`stderr: ${stderr}`);
    console.log(chalk.bgGreen('Packages Installed'));
    return console.log(chalk.bgGreen('Git Initialized'));
  });
}

runCommands();
