import { writeFile } from 'fs';

const content = `{
  "extends": ["@js-omar/eslint-config"],
  "rules": {},
  "ignorePatterns": ["lib", "node_modules", "dist"]
}
`;

// writeFile function with filename, content and callback function
writeFile('.eslintrc.json', content, (err) => {
  if (err) throw err;
  console.log('.eslintrc.jso is created successfully.');
});
