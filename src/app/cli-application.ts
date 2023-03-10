import { CliCommandInterface } from '../cli-command/cli-command.interface';

import { VersionCommand } from '../cli-command/version-command.js';
import { HelpCommand } from '../cli-command/help-command.js';
import { ImportCommand } from '../cli-command/import-command.js';

interface Commands {
  '--help': HelpCommand;
  '--version': VersionCommand;
  '--import': ImportCommand;
}

interface ParsedCommand {
  name: keyof Commands | null;
  args: string[];
}

export class CLIApplication {
  private commands: Commands = {
    '--help': new HelpCommand(),
    '--version': new VersionCommand(),
    '--import': new ImportCommand(),
  };

  private defaultCommand = this.commands['--help'];

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = { name: null, args: []};

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc.name = item as keyof Commands;
      } else if (acc.name && item) {
        acc.args.push(item);
      }

      return acc;
    }, parsedCommand);
  }

  public getCommand(commandName: keyof Commands | null): CliCommandInterface {
    if (commandName === null || this.commands[commandName] === undefined) {
      return this.defaultCommand;
    }

    return this.commands[commandName];
  }

  public processCommand(argv: string[]): void {
    const { name, args } = this.parseCommand(argv);

    const command = this.getCommand(name);
    command.execute(...args);
  }
}
