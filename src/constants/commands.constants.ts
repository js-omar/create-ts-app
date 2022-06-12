import { commitMsg, huskyCommitMsg, huskyPreCommit } from './index';

export const commands = [
  'cd ./:project-name-slug',
  'git init -b develop',
  'npx install-peerdeps --dev @js-omar/eslint-config@latest',
  'npm i -D prettier@latest eslint-plugin-prettier@latest prettier-plugin-tailwindcss@latest',
  'npm i -D husky',
  'npx husky install',
  `npx husky add .husky/pre-commit "${huskyPreCommit}"`,
  'npm install -D @commitlint/cli @commitlint/config-conventional',
  `npx husky add .husky/commit-msg "${huskyCommitMsg}"`,
  'npm i',
  'npm i -D typescript tslib rimraf cspell',
  'npm i -D jest ts-jest @types/jest jest-environment-jsdom',
  'git add .',
  `git commit -m "${commitMsg}"`,
  'git checkout -b staging',
  'git checkout -b master',
  'git checkout develop',
];
