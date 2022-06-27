export const huskyPreCommit = `npm run test || (echo '🚨 Test Failed'; false)`;
export const huskyCommitMsg = `npx --no -- commitlint --edit $1`;
