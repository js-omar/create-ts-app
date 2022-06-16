import { promisify } from 'node:util';
import { exec } from 'node:child_process';

async function execute(command: string | string[]): Promise<void> {
  const commands = typeof command === 'string' ? [command] : command;

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];

    // eslint-disable-next-line no-await-in-loop
    const { stderr } = await promisify(exec)(cmd, { shell: 'powershell.exe' });

    if (stderr) {
      console.log('=============== START: STDERR ===============');
      console.error(stderr);
      console.log('================ END: STDERR ================');
      throw Error(stderr);
    }
  }
}

export { execute };
