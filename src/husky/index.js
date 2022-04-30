import { writeFile } from 'fs';

const content = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo '🧪 Testing,🩺 Code Checking,💬 Spell Checker,🎨 Styling,💄 Linting then 🚀 build the application'

# Testing
npm run test || (
  echo '🚨 Test failed'
  false
)

# if test passes
echo '✅ test passed'

# Check Tsconfig standard
npm run check:types || (
  echo '🚨 Check Types failed'
  false
)

# if Check types passes
echo '✅ Check types passed'

# Check Code Spell
npm run check:cspell || (
  echo '🚨 cspell failed'
  false
)

# if Code Spell Passes
echo '✅ Code Spell passed'

# Check Prettier Standards
npm run check:format || (
  echo '🚨 Check Format failed'
  false
)

# if Prettier passes
echo '✅ prettier passed'

# Check Linting
npm run check:lint || (
  echo '🚨 Check Linting failed'
  false
)

# if Linting passes
echo '✅ Lint passed'

# if everything is passes... try to run build
echo '💚 Alright... Code looks good to me and tests passed.... now trying to build'

# Build
npm run build || (
  echo '🚨 Build failed'
  false
)

# if Build passes
echo '✅ Builded Successfully'

git add .
`;

// writeFile function with filename, content and callback function
writeFile('.husky/pre-commit', content, (err) => {
  if (err) throw err;
  console.log('pre-commit is created successfully.');
});
