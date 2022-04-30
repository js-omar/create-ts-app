import { promises, writeFile } from 'fs';

const content = `# yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json
name: Npm Publish Package

on:
  push:
    tags:
      - '**'

jobs:
  prepare:
    runs-on: ubuntu-latest

    steps:
      # Get checkout
      - name: Checkout
        uses: actions/checkout@v3

      # Install Node js
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16.10.0'
          registry-url: 'https://registry.npmjs.org'

      # Install Dependencies
      - name: Install dependencies 🔧
        run: npm ci

      # Npm Run Test
      - name: Run Test All
        run: npm run test:all

      # Build application
      - name: Run Build
        run: npm run build

      # Build application
      - name: Publish package on NPM 📦
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: \${{secrets.NPM_TOKEN}}
`;

promises
  .mkdir('.github/workflows', { recursive: true }, (err) => {
    if (err) throw err;
  })
  .then(() => {
    // writeFile function with filename, content and callback function
    writeFile('.github/workflows/npm-publish.yml', content, (err) => {
      if (err) throw err;
      console.log('npm-publish.yml is created successfully.');
    });
  });
