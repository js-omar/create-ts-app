import { huskyCommitMsg, huskyPreCommit } from './index';

const eslintAndPrettier = [
  'npx install-peerdeps --dev @js-omar/eslint-config@latest',
  'npm i -D prettier@latest eslint-plugin-prettier@latest prettier-plugin-tailwindcss@latest',
] as const;

const initGit = ['git init -b develop'] as const;

const husky = [
  'npm i -D husky',
  'npx husky install',
  `npx husky add .husky/pre-commit "${huskyPreCommit}"`,
  'npm install -D @commitlint/cli @commitlint/config-conventional',
  `npx husky add .husky/commit-msg "${huskyCommitMsg}"`,
  'npm i',
] as const;

const semanticRelease = [
  'npm i -D semantic-release @semantic-release/git @semantic-release/changelog',
] as const;

const typescript = [
  'npm i -D typescript@4.6.4 cspell rimraf',
  'npm i tslib',
] as const;

const jest = [
  'npm i -D jest ts-jest @types/jest jest-environment-jsdom',
] as const;

const format = ['npx prettier --write .'];

// cspell:ignore tada
const commitMsg =
  'build: :tada: initialize new `@js-omar/:project-name-slug` project';

const git = [
  'git add .',
  `git commit -m "${commitMsg}"`,
  'git checkout -b staging',
  'git checkout -b master',
  'git checkout develop',
] as const;

export const vscode = ['code .'] as const;

export const commands = [
  { title: 'Installing eslint & prettier', commands: eslintAndPrettier },
  { title: 'Initialize Git', commands: initGit },
  { title: 'Install and Setup Husky', commands: husky },
  { title: 'Semantic Release', commands: semanticRelease },
  { title: 'Install Typescript', commands: typescript },
  { title: 'Install Jest', commands: jest },
  { title: 'Formatting Files', commands: format },
  { title: 'Creating Branches and init First Commit Changes', commands: git },
  { title: 'Open Vscode', commands: vscode },
] as const;
