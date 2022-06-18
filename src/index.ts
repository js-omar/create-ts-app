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
import { isValidSlug } from '@js-omar/core';
import { files, commands, usage, changeDir } from './constants';
import { execute, isDevMode } from './utils';

(async (): Promise<void> => {
  const args = await Yargs(process.argv.slice(2))
    .options({
      out: {
        alias: 'o',
        describe: 'the name of the output folder',
        type: 'string',
        demandOption: false,
        default: 'lib',
      },
    })
    .usage(usage)
    .help(true).argv;

  const projectNameSlug = (args._[0] ?? '').toString().toLowerCase().trim();

  if (!projectNameSlug) {
    console.error(red('Please enter project name!'));
    return;
  }

  if (!isValidSlug(projectNameSlug)) {
    console.error(red('Project name must be a valid slug!'));
    return;
  }

  const outputFolderName = args.out.toString().toLowerCase().trim();

  if (!outputFolderName) {
    console.error(red('Please enter output file!'));
    return;
  }

  if (!isValidSlug(outputFolderName)) {
    console.error(red('output name must be a valid slug!'));
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
    file = file.map((f) => f.replace(/^\.rename/, ''));

    console.log(
      `${green('CREATE')} ${projectNameSlug}/${file.join('/')} ${grey(size)}`
    );

    if (isDevMode) continue;

    if (file.length > 1) {
      mkdirSync(join(projectPath, ...file.slice(0, file.length - 1)), {
        recursive: true,
      });
    }

    let fileContent = readFileSync(filePath, 'utf8')
      .replace(/:project-name-title-case/g, projectNameTitleCase)
      .replace(/:project-name-slug/g, projectNameSlug)
      .replace(/:project-name/g, projectName)
      .replace(/:project-description/g, projectDescription)
      .replace(/:out-folder-name/g, outputFolderName);

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

      await execute(isDevMode ? 'sleep 1' : statement);

      spinner.succeed();
    }

    spinner.stop();
  })();
})();
