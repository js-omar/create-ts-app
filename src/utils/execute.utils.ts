import { promisify } from 'node:util';
import { exec } from 'node:child_process';

async function execute(command: string): Promise<void> {
  const { stderr, stdout } = await promisify(exec)(command, {
    shell: 'powershell.exe',
  });

  if (stderr) {
    console.log('===== START: STDERR =====');
    console.error(stderr);
    console.log('===== END: STDERR =====');
    return;
  }

  if (stdout) {
    console.log('\n===== START: STDOUT =====');
    console.log(stdout);
    console.log('====== END: STDOUT ======\n');
  }
}

export { execute };
