const fs = require('fs');

const content = `{
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.format": true
  }
}
`;

fs.promises
  .mkdir('.vscode', { recursive: true }, (err) => {
    if (err) throw err;
  })
  .then(() => {
    // writeFile function with filename, content and callback function
    fs.writeFile('.vscode/settings.json', content, (err) => {
      if (err) throw err;
      console.log('settings.json is created successfully.');
    });
  });
