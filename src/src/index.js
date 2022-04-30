import { promises, writeFile } from 'fs';

const content = `export const app = (): string => 'app';
`;

promises
  .mkdir('src', { recursive: true }, (err) => {
    if (err) throw err;
  })
  .then(() => {
    // writeFile function with filename, content and callback function
    writeFile('src/index.ts', content, (err) => {
      if (err) throw err;
      console.log('index.ts is created successfully.');
    });
  });
