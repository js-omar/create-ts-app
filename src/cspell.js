import { writeFile } from 'fs';

const content = `{
  "words": ["Elsayed", "parens", "prebuild", "tailwindcss"],
  "language": "ar,en",
  "ignoreRegExpList": ["/[\\u0621-\\u064A]+/"],
  "ignorePaths": ["node_modules", "lib", "dist"],
  "files": ["**"]
}
`;

// writeFile function with filename, content and callback function
writeFile('cspell.json', content, (err) => {
  if (err) throw err;
  console.log('cspell.json is created successfully.');
});
