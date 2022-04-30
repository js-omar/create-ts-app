import { writeFile } from 'fs';

const content = `{
  "name": "@js-omar/package-name",
  "displayName": "Package Name",
  "version": "0.0.1",
  "description": "Package Description",
  "main": "./lib/index.js",
  "types": "./lib/index.d.ts",
  "scripts": {
    "prepare": "husky install",
    "start": "tsc --watch",
    "test": "jest --ci --maxWorkers=3",
    "prebuild": "rimraf lib",
    "build": "tsc",
    "fix:format": "prettier --write .",
    "fix:lint": "eslint . --ext ts --ext js --fix",
    "check:types": "tsc --pretty --noEmit",
    "check:cspell": "cspell",
    "check:format": "prettier --check .",
    "check:lint": "eslint . --ext ts --ext js",
    "test:all": "npm run test && npm run check:types && npm run check:cspell && npm run check:format && npm run check:lint"
  },
  "homepage": "https://github.com/js-omar/package-name#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/js-omar/package-name.git"
  },
  "keywords": [
    "javascript"
  ],
  "author": {
    "name": "Omar Elsayed",
    "email": "challengeromar97@gmail.com",
    "url": "https://ng-omar.com"
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/js-omar/package-name/issues"
  },
  "devDependencies": {
  }
}
`;

// writeFile function with filename, content and callback function
writeFile('package.json', content, (err) => {
  if (err) throw err;
  console.log('Package.json is created successfully.');
});
