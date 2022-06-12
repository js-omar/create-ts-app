#! /usr/bin/env node
import {
  readFileSync,
  statSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from 'fs';
import { green, grey, red } from 'chalk';
import { exec } from 'child_process';
import Yargs from 'yargs/yargs';
import { join } from 'path';
import ora from 'ora';
import { files, commands } from './constants';
import { isDevMode } from './utils';

const usage = '\nUsage: npx @js-omar/create-ts-app <project-name>';

const { argv } = Yargs(process.argv.slice(2)).usage(usage).help(true);

(async (): Promise<void> => {
  const args = await argv;

  if (typeof args._[0] !== 'string' || !args._[0].trim()) {
    console.error(red('Please enter project name!'));
    return;
  }

  const projectNameSlug = args._[0].trim();

  const isValidName = /^[a-zA-Z]{1,}[a-zA-Z-]*[a-zA-Z]{1,}$/.test(
    projectNameSlug
  );

  if (!isValidName) {
    console.error('Enter a valid project name!');
    return;
  }

  const projectName = projectNameSlug
    .split('-')
    .map((w) => w[0].toUpperCase() + w.substring(1))
    .join(' ');
  const projectDescription = `${projectName} Project`;
  const projectNameTitleCase = projectName.split(' ').join('');

  const projectPath = join(process.cwd(), projectNameSlug);

  if (existsSync(projectPath)) {
    console.log(red('Folder is already exists'));
    return;
  }

  if (!isDevMode) {
    mkdirSync(projectNameSlug, { recursive: true });
  }

  const spinner = ora({ text: `Creating ${projectName} Project \n` }).start();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    const filePath = join(__dirname, '../content', ...file);
    const size = `(${statSync(filePath).size} bytes)`;
    file = file[0] === 'gitignore' ? [`.${file[0]}`] : file;

    console.log(
      `${green('CREATE')} ${projectNameSlug}/${file.join('/')} ${grey(size)}`
    );

    if (isDevMode) continue; // eslint-disable-line no-continue

    if (file.length > 1) {
      mkdirSync(join(projectPath, ...file.slice(0, file.length - 1)), {
        recursive: true,
      });
    }

    const fileContent = readFileSync(filePath, 'utf8')
      .replace(/:project-name-title-case/g, projectNameTitleCase)
      .replace(/:project-name-slug/g, projectNameSlug)
      .replace(/:project-name/g, projectName)
      .replace(/:project-description/g, projectDescription);

    writeFileSync(join(projectPath, ...file), fileContent);
  }

  spinner.text = green('Project Files Created');
  spinner.succeed();

  ((): void => {
    spinner.text = 'Installing Packages...';
    spinner.start();

    const command = (
      isDevMode
        ? ['echo 1']
        : commands.map((c) => c.replace(/:project-name-slug/g, projectNameSlug))
    ).join(' && ');

    exec(command, (error, _, stderr) => {
      if (error) return console.log(`error: ${error.message}`);
      if (stderr) return console.log(`stderr: ${stderr}`);
      spinner.text = green('Packages Installed');
      spinner.succeed();
      spinner.start();
      spinner.text = green('Git Initialized');
      spinner.succeed();
      return spinner.stop();
    });
  })();
})();

export const app = (): string => 'app';
