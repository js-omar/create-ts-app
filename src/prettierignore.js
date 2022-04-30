import { writeFile } from 'fs';

const content = `node_modules
lib
dist
`;

// writeFile function with filename, content and callback function
writeFile('.prettierignore', content, (err) => {
  if (err) throw err;
  console.log('.prettierignore is created successfully.');
});
