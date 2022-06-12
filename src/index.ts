#! /usr/bin/env node
import Yargs from 'yargs/yargs';
import { green, grey, bgYellowBright, bgGreen } from 'chalk';
import { readFileSync, statSync, writeFileSync, mkdirSync } from 'fs';
import { exec } from 'child_process';
import { join } from 'path';
import { files } from './constants';
import { commands } from './constants/commands.constants';

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

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    const filePath = join(__dirname, '../content', ...file);
    const size = `(${statSync(filePath).size} bytes)`;

    if (file.length > 1) {
      mkdirSync(file.slice(0, file.length - 1).join('/'), { recursive: true });
    }

    if (file[0] === 'gitignore') file = [`.${file[0]}`];

    writeFileSync(file.join('/'), readFileSync(filePath));

    console.log(`${green('CREATE')} app/${file.join('/')} ${grey(size)}`);
  }

  ((): void => {
    console.log(bgYellowBright('Installing Packages...'));
    exec(commands.join(' && '), (error, _, stderr) => {
      if (error) return console.log(`error: ${error.message}`);
      if (stderr) return console.log(`stderr: ${stderr}`);
      console.log(bgGreen('Packages Installed'));
      return console.log(bgGreen('Git Initialized'));
    });
  })();
})();
