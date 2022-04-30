const fs = require('fs');

const content = `node_modules
dist
`;

// writeFile function with filename, content and callback function
fs.writeFile('.gitignore', content, function (err) {
  if (err) throw err;
  console.log('.gitignore is created successfully.');
});
