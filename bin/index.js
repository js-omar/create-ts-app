#! /usr/bin/env npx ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const chalk_1 = require("chalk");
const child_process_1 = require("child_process");
const path_1 = require("path");
const files = [
    ['.github', 'workflows', 'npm-publish.yml'],
    ['.github', 'workflows', 'test-and-build.yml'],
    ['.vscode', 'settings.json'],
    ['src', 'index.ts'],
    ['test', 'index.spec.ts'],
    ['.editorconfig'],
    ['.eslintrc.json'],
    ['.gitignore'],
    ['.prettierignore'],
    ['.prettierrc'],
    ['cspell.json'],
    ['jest.config.js'],
    ['LICENSE'],
    ['package.json'],
    ['README.md'],
    ['tsconfig.json'],
];
for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = (0, path_1.join)(__dirname, './../src/content', ...file);
    const size = `(${(0, fs_1.statSync)(filePath).size} bytes)`;
    if (file.length > 1) {
        (0, fs_1.mkdirSync)(file.slice(0, file.length - 1).join('/'), { recursive: true });
    }
    (0, fs_1.writeFileSync)(file.join('/'), (0, fs_1.readFileSync)(filePath));
    console.log(`${(0, chalk_1.green)('CREATE')} app/${file.join('/')} ${(0, chalk_1.grey)(size)}`);
}
const huskyPreCommit = `npm run test:all || (echo '🚨 Test Failed'; false); npm run build || (echo '🚨 Build failed'; false); git add .`;
const commands = [
    'git init -b develop',
    'npx install-peerdeps --dev @js-omar/eslint-config@latest',
    'npm i -D prettier@latest eslint-plugin-prettier@latest prettier-plugin-tailwindcss@latest',
    'npm i -D husky',
    'npx husky install',
    `npx husky add .husky/pre-commit "${huskyPreCommit}"`,
    'npm i',
    'npm i -D typescript rimraf cspell',
    'npm i -D jest ts-jest @types/jest jest-environment-jsdom',
    'git add .',
    'git commit -m "init"',
    'git checkout -b staging',
    'git checkout -b master',
    'git checkout develop',
];
function runCommands() {
    console.log((0, chalk_1.bgYellowBright)((0, chalk_1.white)(' Installing Packages ')));
    (0, child_process_1.exec)(commands.join(' && '), (error, _, stderr) => {
        if (error)
            return console.log(`error: ${error.message}`);
        if (stderr)
            return console.log(`stderr: ${stderr}`);
        console.log((0, chalk_1.bgGreen)((0, chalk_1.white)(' Packages Installed ')));
        return console.log((0, chalk_1.bgGreen)((0, chalk_1.white)(' Git Initialized ')));
    });
}
runCommands();
//# sourceMappingURL=index.js.map