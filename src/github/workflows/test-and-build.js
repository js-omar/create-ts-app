const fs = require('fs');

const content = `# yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json
name: Testing Code & Build App

on:
  push:
    branches: [develop]
  pull_request:
    branches: [develop]

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

      # Install Dependencies
      - name: Install dependencies 🔧
        run: npm ci

      # Npm Run Test
      - name: Run Test All
        run: npm run test:all

      # Build application
      - name: Run Build
        run: npm run build
`;

fs.promises
  .mkdir('.github/workflows', { recursive: true }, (err) => {
    if (err) throw err;
  })
  .then(() => {
    // writeFile function with filename, content and callback function
    fs.writeFile('.github/workflows/test-and-build.yml', content, (err) => {
      if (err) throw err;
      console.log('test-and-build.yml is created successfully.');
    });
  });
