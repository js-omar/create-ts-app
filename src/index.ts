#! /usr/bin/env node
import {
  readFileSync,
  statSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from 'node:fs';
import { green, grey, red } from 'chalk';
import Yargs from 'yargs/yargs';
import { join } from 'node:path';
import ora from 'ora';
import { files, commands, usage, changeDir } from './constants';
import { execute, isDevMode } from './utils';

(async (): Promise<void> => {
  const args = await Yargs(process.argv.slice(2)).usage(usage).help(true).argv;

  const projectNameSlug = (args._[0] ?? '').toString().toLowerCase().trim();

  if (!projectNameSlug) {
    console.error(red('Please enter project name!'));
    return;
  }

  const isValidName = /^[a-z0-9]+(?:[-a-z0-9]+)*[^-]$/.test(projectNameSlug);

  if (!isValidName) {
    console.error(red('Project name must be slug name at least 3 chars!'));
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

    let fileContent = readFileSync(filePath, 'utf8')
      .replace(/:project-name-title-case/g, projectNameTitleCase)
      .replace(/:project-name-slug/g, projectNameSlug)
      .replace(/:project-name/g, projectName)
      .replace(/:project-description/g, projectDescription);

    if (file[0] === 'cspell.json') {
      const jsonObj = JSON.parse(fileContent);
      jsonObj.words.push(...projectNameSlug.split('-'));
      fileContent = JSON.stringify(jsonObj);
    }

    writeFileSync(join(projectPath, ...file), fileContent);

    if (file[0] === 'cspell.json') {
      const statement = [changeDir, 'npx prettier --write ./cspell.json']
        .join(';')
        .replace(/:project-name-slug/g, projectNameSlug);

      // eslint-disable-next-line no-await-in-loop
      await execute(statement);
    }
  }

  spinner.text = green('Project Files Created');
  spinner.succeed();

  (async (): Promise<void> => {
    spinner.text = green('Installing Packages...');
    spinner.start();

    for (let i = 0; i < commands.length; i++) {
      const groupCommands = commands[i];

      if (groupCommands.title) {
        spinner.text = green(groupCommands.title);
        spinner.start();
      }

      const statement = [changeDir, ...groupCommands.commands]
        .join(';')
        .replace(/:project-name-slug/g, projectNameSlug);

      // eslint-disable-next-line no-await-in-loop
      await execute(isDevMode ? 'sleep 1' : statement);

      spinner.succeed();
    }

    spinner.stop();
  })();
})();
