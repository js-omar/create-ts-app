const fs = require('fs');

const content = `{
  "singleQuote": true,
  "tabWidth": 2,
  "overrides": [
    {
      "files": ["**/*.{html,scss}"],
      "options": { "printWidth": 500 }
    }
  ]
}
`;

// writeFile function with filename, content and callback function
fs.writeFile('.prettierrc', content, (err) => {
  if (err) throw err;
  console.log('.prettierrc is created successfully.');
});
