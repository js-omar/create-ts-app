const fs = require('fs');

const content = `{
  "words": ["Elsayed", "parens", "prebuild", "tailwindcss"],
  "language": "ar,en",
  "ignoreRegExpList": ["/[\\u0621-\\u064A]+/"],
  "ignorePaths": ["node_modules", "lib", "dist"],
  "files": ["**"]
}
`;

// writeFile function with filename, content and callback function
fs.writeFile('cspell.json', content, function (err) {
  if (err) throw err;
  console.log('cspell.json is created successfully.');
});
