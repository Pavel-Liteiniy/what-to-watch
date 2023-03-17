import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { CliCommandInterface } from './cli-command.interface.js';

export class VersionCommand implements CliCommandInterface {
  public static readonly command = '--version';

  private readVersion(): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const rowPackageFile = readFileSync(path.resolve(__dirname, '../../package.json'), 'utf-8');
    const { version } = JSON.parse(rowPackageFile);

    return version as string;
  }

  public execute(): void {
    const version = this.readVersion();
    console.log(`Version: ${version}`);
  }
}
