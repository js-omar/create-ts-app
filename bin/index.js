#! /usr/bin/env npx ts-node
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var path_1 = require("path");
var chalk = {
    green: function (text) { return text; },
    grey: function (text) { return text; },
    bgYellowBright: function (text) { return text; },
    bgGreen: function (text) { return text; },
};
var files = [
    ['.github', 'workflows', 'publish.yml'],
    ['.github', 'workflows', 'code-quality.yml'],
    ['.vscode', 'settings.json'],
    ['src', 'index.ts'],
    ['src', 'math.ts'],
    ['test', 'math.spec.ts'],
    ['.editorconfig'],
    ['.eslintrc.json'],
    ['gitignore'],
    ['.mailmap'],
    ['.prettierignore'],
    ['.prettierrc'],
    ['AUTHORS'],
    ['CHANGELOG.md'],
    ['cspell.json'],
    ['jest.config.js'],
    ['LICENSE'],
    ['package.json'],
    ['README.md'],
    ['tsconfig.json'],
];
for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var filePath = path_1.join.apply(void 0, __spreadArray([__dirname, './../src/content'], file, false));
    var size = "(".concat((0, fs_1.statSync)(filePath).size, " bytes)");
    if (file.length > 1) {
        (0, fs_1.mkdirSync)(file.slice(0, file.length - 1).join('/'), { recursive: true });
    }
    if (file[0] === 'gitignore')
        file = [".".concat(file[0])];
    (0, fs_1.writeFileSync)(file.join('/'), (0, fs_1.readFileSync)(filePath));
    console.log("".concat(chalk.green('CREATE'), " app/").concat(file.join('/'), " ").concat(chalk.grey(size)));
}
var huskyPreCommit = "npm run test:all:ci || (echo '\uD83D\uDEA8 Test Failed'; false); npm run build || (echo '\uD83D\uDEA8 Build failed'; false); git add .";
var commands = [
    'git init -b develop',
    'npx install-peerdeps --dev @js-omar/eslint-config@latest',
    'npm i -D prettier@latest eslint-plugin-prettier@latest prettier-plugin-tailwindcss@latest',
    'npm i -D husky',
    'npx husky install',
    "npx husky add .husky/pre-commit \"".concat(huskyPreCommit, "\""),
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
    console.log(chalk.bgYellowBright(' Installing Packages '));
    (0, child_process_1.exec)(commands.join(' && '), function (error, _, stderr) {
        if (error)
            return console.log("error: ".concat(error.message));
        if (stderr)
            return console.log("stderr: ".concat(stderr));
        console.log(chalk.bgGreen(' Packages Installed '));
        return console.log(chalk.bgGreen(' Git Initialized '));
    });
}
runCommands();
//# sourceMappingURL=index.js.map