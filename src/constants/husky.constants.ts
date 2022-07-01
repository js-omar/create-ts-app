export const huskyPreCommit = `npx lint-staged || (echo '🚨 Lint Failed'; false)`;
export const huskyCommitMsg = `npx --no -- commitlint --edit $1`;
