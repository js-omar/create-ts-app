const fs = require('fs');

const content = `import { app } from '../src/index';

describe('application', () => {
  // Test application
  test('application', () => {
    expect(app()).toBe('app');
  });
});
`;

fs.promises
  .mkdir('test', { recursive: true }, (err) => {
    if (err) throw err;
  })
  .then(() => {
    // writeFile function with filename, content and callback function
    fs.writeFile('test/index.spec.ts', content, (err) => {
      if (err) throw err;
      console.log('index.spec.ts is created successfully.');
    });
  });
