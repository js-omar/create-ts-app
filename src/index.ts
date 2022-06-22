#! /usr/bin/env node
import { green } from 'chalk';
import Yargs from 'yargs/yargs';
import ora from 'ora';
import { execute } from '@js-omar/node';
import { commands, usage, changeDir } from './constants';
import {
  isDevMode,
  getProjectName,
  getProjectScope,
  getProjectOutputFolderName,
} from './utils';
import { createOutputFolder } from './utils/create-output-folder.utils';
import { createProjectFiles } from './create-project-files';

(async (): Promise<void> => {
  const args = await Yargs(process.argv.slice(2))
    .options({
      output: {
        alias: 'o',
        describe: 'the name of the output folder',
        type: 'string',
        demandOption: false,
        default: 'lib',
      },
      scope: {
        alias: 's',
        describe: 'the name of the scope',
        type: 'string',
        demandOption: false,
        default: '@js-omar',
      },
    })
    .usage(usage)
    .help(true).argv;

  const projectDetails = getProjectName(args._[0]);

  const scope = getProjectScope(args.scope);

  const outputFolderName = getProjectOutputFolderName(args.output);

  createOutputFolder(projectDetails.slugName);

  const spinner = ora(`Creating ${projectDetails.name} Project \n`).start();

  await createProjectFiles(projectDetails, outputFolderName, scope);

  spinner.text = green('Project Files Created');
  spinner.succeed();

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
      .replace(/:project-name-slug/g, projectDetails.slugName);

    await execute(isDevMode ? 'sleep 1' : statement);

    spinner.succeed();
  }

  spinner.text = green('Project Created Successfully');
  spinner.stop();
})();
