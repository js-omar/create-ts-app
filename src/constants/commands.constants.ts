import { commitMsg, huskyCommitMsg, huskyPreCommit } from './index';

export const changeDir = ['cd ./:project-name-slug'] as const;

export const eslintAndPrettier = [
  'npx install-peerdeps --dev @js-omar/eslint-config@latest',
  'npm i -D prettier@latest eslint-plugin-prettier@latest prettier-plugin-tailwindcss@latest',
] as const;

export const initGit = ['git init -b develop'] as const;

export const husky = [
  'npm i -D husky',
  'npx husky install',
  `npx husky add .husky/pre-commit "${huskyPreCommit}"`,
  'npm install -D @commitlint/cli @commitlint/config-conventional',
  `npx husky add .husky/commit-msg "${huskyCommitMsg}"`,
  'npm i',
] as const;

export const typescript = ['npm i -D typescript tslib rimraf cspell'] as const;

export const jest = [
  'npm i -D jest ts-jest @types/jest jest-environment-jsdom',
] as const;

export const git = [
  'git add .',
  `git commit -m "${commitMsg}"`,
  'git checkout -b staging',
  'git checkout -b master',
  'git checkout develop',
] as const;

export const commands = [
  { title: null, commands: changeDir },
  { title: 'Eslint And Prettier', commands: eslintAndPrettier },
  { title: 'Initialize Git', commands: initGit },
  { title: 'Install and Setup Husky', commands: husky },
  { title: 'Install Typescript', commands: typescript },
  { title: 'Install Jest', commands: jest },
  { title: 'Create Branches And init First Commit Changes', commands: git },
] as const;
