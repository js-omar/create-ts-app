import { writeFile } from 'fs';

const content = `node_modules
dist
`;

// writeFile function with filename, content and callback function
writeFile('.gitignore', content, (err) => {
  if (err) throw err;
  console.log('.gitignore is created successfully.');
});
