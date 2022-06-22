import { isValidSlug } from '@js-omar/core';
import { IProjectDetails } from '../interfaces/project-details.interface';
import { throwErrorMsg } from './throw-error';

function getProjectName(projectName: string | number): IProjectDetails {
  const slugName = (projectName ?? '').toString().toLowerCase().trim();

  if (!slugName) throwErrorMsg('Please enter project name!');

  if (!isValidSlug(slugName))
    throwErrorMsg('Project name must be a valid slug!');

  const name = slugName
    .split('-')
    .map((w) => w[0].toUpperCase() + w.substring(1))
    .join(' ');
  const description = `${name} Project`;
  const nameInTitleCase = name.split(' ').join('');

  return { name, slugName, nameInTitleCase, description };
}

function getProjectScope(scope: string): string {
  const projectScope = scope.toString().toLowerCase().trim();

  if (
    !projectScope ||
    !projectScope.startsWith('@') ||
    !isValidSlug(projectScope.slice(1))
  )
    throwErrorMsg("Project scope must be a valid slug with prefix '@'!");

  return projectScope;
}

function getProjectOutputFolderName(output: string): string {
  const projectOutputName = output.toString().toLowerCase().trim();

  if (!projectOutputName) throwErrorMsg('Please enter output file!');

  if (!isValidSlug(projectOutputName))
    throwErrorMsg('output name must be a valid slug!');

  return projectOutputName;
}

export { getProjectName, getProjectScope, getProjectOutputFolderName };
