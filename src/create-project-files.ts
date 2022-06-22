import { readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { green, grey } from 'chalk';
import { join } from 'node:path';
import { files } from './constants';
import { isDevMode } from './utils';
import { IProjectDetails } from './interfaces/project-details.interface';

async function createProjectFiles(
  { name, slugName, nameInTitleCase, description }: IProjectDetails,
  outputFolderName: string,
  scope: string
): Promise<void> {
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    const filePath = join(__dirname, '../content', ...file);
    const size = `(${statSync(filePath).size} bytes)`;
    file = file.map((f) => f.replace(/^\.rename/, ''));

    console.log(
      `${green('CREATE')} ${slugName}/${file.join('/')} ${grey(size)}`
    );

    if (isDevMode) continue;

    if (file.length > 1) {
      mkdirSync(join(slugName, ...file.slice(0, file.length - 1)), {
        recursive: true,
      });
    }

    let fileContent = readFileSync(filePath, 'utf8')
      .replace(/:project-name-title-case/g, nameInTitleCase)
      .replace(/:project-name-slug/g, slugName)
      .replace(/:project-name/g, name)
      .replace(/:project-description/g, description)
      .replace(/:project-scope/g, scope.substring(1))
      .replace(/:out-folder-name/g, outputFolderName);

    if (file[0] === 'cspell.json') {
      const jsonObj = JSON.parse(fileContent);
      jsonObj.words.push(...slugName.split('-'));
      fileContent = JSON.stringify(jsonObj);
    }

    writeFileSync(join(slugName, ...file), fileContent);
  }
}

export { createProjectFiles };
