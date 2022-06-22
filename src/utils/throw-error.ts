import { red } from 'chalk';

function throwErrorMsg(message: string): void {
  console.error(red(message));
  process.exit(1);
}

export { throwErrorMsg };
