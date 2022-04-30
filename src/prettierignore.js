const fs = require('fs');

const content = `node_modules
lib
dist
`;

// writeFile function with filename, content and callback function
fs.writeFile('.prettierignore', content, function (err) {
  if (err) throw err;
  console.log('.prettierignore is created successfully.');
});
