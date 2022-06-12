#! /usr/bin/env node
import Yargs from 'yargs/yargs';
import chalk from 'chalk';

const usage = '\nUsage: create new typescript application or library';

const { argv } = Yargs(process.argv.slice(2))
  .usage(usage)
  .options({
    l: {
      alias: 'languages',
      describe: 'List all supported languages.',
      type: 'boolean',
      demandOption: false,
    },
  })
  .help(true);

(async (): Promise<void> => {
  const args = await argv;
  const projectNameSlug = `${args._[0]}`.trim();

  if (!projectNameSlug) {
    console.error('Please enter project name!');
    return;
  }

  const isValidName = /^[a-zA-Z]{1,}[a-zA-Z-]*$/.test(projectNameSlug);

  if (!isValidName) {
    console.error('Enter a valid project name!');
    return;
  }

  const projectName = projectNameSlug
    .split('-')
    .map((w) => w[0].toUpperCase() + w.substring(1))
    .join(' ');

  const projectDescription = `${projectName} Project`;

  console.log(projectName);
  console.log(projectDescription);

  console.log(chalk.bgBlue('hello'));
})();

// import { readFileSync, statSync, writeFileSync, mkdirSync } from 'fs';
// import { exec } from 'child_process';
// import { join } from 'path';

// const chalk = {
//   green: (text: string) => text,
//   grey: (text: string) => text,
//   bgYellowBright: (text: string) => text,
//   bgGreen: (text: string) => text,
// };

// const files = [
//   ['.github', 'workflows', 'publish.yml'],
//   ['.github', 'workflows', 'commitlint.yml'],
//   ['.github', 'workflows', 'code-quality.yml'],
//   ['.github', 'workflows', 'release.yml'],
//   ['.vscode', 'settings.json'],
//   ['src', 'index.ts'],
//   ['src', 'math.ts'],
//   ['test', 'math.spec.ts'],
//   ['.editorconfig'],
//   ['.eslintrc.json'],
//   ['gitignore'],
//   ['.mailmap'],
//   ['.prettierignore'],
//   ['.prettierrc'],
//   ['AUTHORS'],
//   ['CHANGELOG.md'],
//   ['commitlint.config.js'],
//   ['cspell.json'],
//   ['jest.config.js'],
//   ['LICENSE'],
//   ['package.json'],
//   ['README.md'],
//   ['tsconfig.json'],
// ];

// for (let i = 0; i < files.length; i++) {
//   let file = files[i];
//   const filePath = join(__dirname, './../src/content', ...file);
//   const size = `(${statSync(filePath).size} bytes)`;

//   if (file.length > 1) {
//     mkdirSync(file.slice(0, file.length - 1).join('/'), { recursive: true });
//   }

//   if (file[0] === 'gitignore') file = [`.${file[0]}`];

//   writeFileSync(file.join('/'), readFileSync(filePath));

//   console.log(
//     `${chalk.green('CREATE')} app/${file.join('/')} ${chalk.grey(size)}`
//   );
// }

// const huskyPreCommit = `npm run test:all:ci || (echo '🚨 Test Failed'; false)`;

// const commands = [
//   'git init -b develop',
//   'npx install-peerdeps --dev @js-omar/eslint-config@latest',
//   'npm i -D prettier@latest eslint-plugin-prettier@latest prettier-plugin-tailwindcss@latest',
//   'npm i -D husky',
//   'npx husky install',
//   `npx husky add .husky/pre-commit "${huskyPreCommit}"`,
//   'npm install -D @commitlint/cli @commitlint/config-conventional',
//   `npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"`,
//   'npm i',
//   'npm i -D typescript rimraf cspell',
//   'npm i -D jest ts-jest @types/jest jest-environment-jsdom',
//   'git add .',
//   'git commit -m "build: :tada: initialize new `@js-omar/create-ts-app` app"', // cspell:ignore tada
//   'git checkout -b staging',
//   'git checkout -b master',
//   'git checkout develop',
// ];

// function runCommands(): void {
//   console.log(chalk.bgYellowBright('Installing Packages...'));
//   exec(commands.join(' && '), (error, _, stderr) => {
//     if (error) return console.log(`error: ${error.message}`);
//     if (stderr) return console.log(`stderr: ${stderr}`);
//     console.log(chalk.bgGreen('Packages Installed'));
//     return console.log(chalk.bgGreen('Git Initialized'));
//   });
// }

// runCommands();
