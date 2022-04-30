const fs = require('fs');

const content = `export const app = (): string => 'app';
`;

fs.promises
  .mkdir('src', { recursive: true }, (err) => {
    if (err) throw err;
  })
  .then((_) => {
    // writeFile function with filename, content and callback function
    fs.writeFile('src/index.ts', content, function (err) {
      if (err) throw err;
      console.log('index.ts is created successfully.');
    });
  });
