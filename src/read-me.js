const fs = require('fs');

const content = `# Package Name

Package Description

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install @js-omar/package-name.

\`\`\`bash
npm install @js-omar/package-name
\`\`\`

## Usage

\`\`\`typescript
import { PackageName } from '@js-omar/package-name';

// Default Option
PackageName();
\`\`\`

## Development

To run this project in development use

Clone the project

\`\`\`bash
  git clone https://github.com/js-omar/package-name.git
\`\`\`

Install Packages

\`\`\`bash
  npm install
\`\`\`

Start the server

\`\`\`bash
  npm run start
\`\`\`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors

- [@omar-elsayed](https://github.com/omar-elsayed97)

## Hi, I'm Omar Elsayed! 👋

I'm a full stack javascript developer...

## 🛠 Skills

Typescript, Javascript, Angular, Ionic, Nest.js, Node.js, HTML, CSS...

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback, please reach out to us at challengeromar97@gmail.com
`;

// writeFile function with filename, content and callback function
fs.writeFile('README.md', content, (err) => {
  if (err) throw err;
  console.log('README.md is created successfully.');
});
