import { existsSync, mkdirSync } from 'node:fs';
import { isDevMode } from './is-dev.utils';
import { throwErrorMsg } from './throw-error';

function createOutputFolder(slugName: string): void {
  if (existsSync(slugName)) throwErrorMsg('Folder is already exists');

  if (!isDevMode) mkdirSync(slugName, { recursive: true });
}

export { createOutputFolder };
