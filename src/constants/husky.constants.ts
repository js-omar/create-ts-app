export const huskyPreCommit = `npm run test:all:ci || (echo '🚨 Test Failed'; false)`;
export const huskyCommitMsg = `npx --no -- commitlint --edit $1`;
