#! /usr/bin/env node
import Yargs from 'yargs/yargs';
import { green, grey } from 'chalk';
import { readFileSync, statSync, writeFileSync, mkdirSync } from 'fs';
import { exec } from 'child_process';
import { join } from 'path';
import ora from 'ora';
import { files, commands } from './constants';
import { isDevMode } from './utils';

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

  console.log(`Creating ${projectName} Project`);
  console.log(projectDescription);

  const spinner = ora({ text: 'Creating Project Files \n' }).start();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    const filePath = join(__dirname, '../content', ...file);
    const size = `(${statSync(filePath).size} bytes)`;
    file = file[0] === 'gitignore' ? [`.${file[0]}`] : file;

    if (isDevMode) {
      console.log(
        `${green('CREATE')} ${projectNameSlug}/${file.join('/')} ${grey(size)}`
      );
      continue; // eslint-disable-line no-continue
    }

    if (file.length > 1) {
      mkdirSync(file.slice(0, file.length - 1).join('/'), { recursive: true });
    }

    writeFileSync(file.join('/'), readFileSync(filePath));
  }

  spinner.text = green('Project Files Created');
  spinner.succeed();

  ((): void => {
    spinner.text = 'Installing Packages...';

    exec(
      (isDevMode ? ['echo 1'] : commands).join(' && '),
      (error, _, stderr) => {
        if (error) return console.log(`error: ${error.message}`);
        if (stderr) return console.log(`stderr: ${stderr}`);
        spinner.text = green('Packages Installed');
        spinner.succeed();
        spinner.text = green('Git Initialized');
        spinner.succeed();
        return console.log('');
      }
    );
  })();
})();
