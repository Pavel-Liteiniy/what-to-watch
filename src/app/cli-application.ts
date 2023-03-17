import { CliCommandInterface } from '../cli-command/cli-command.interface.js';

import { VersionCommand } from '../cli-command/version-command.js';
import { HelpCommand } from '../cli-command/help-command.js';
import { ImportCommand } from '../cli-command/import-command.js';
import { GenerateCommand } from '../cli-command/generate-command.js';

interface Commands {
  [HelpCommand.command]: HelpCommand;
  [VersionCommand.command]: VersionCommand;
  [ImportCommand.command]: ImportCommand;
  [GenerateCommand.command]: GenerateCommand;
}

interface ParsedCommand {
  command: keyof Commands | null;
  args: string[];
}

export class CLIApplication {
  private commands: Commands = {
    [HelpCommand.command]: new HelpCommand(),
    [VersionCommand.command]: new VersionCommand(),
    [ImportCommand.command]: new ImportCommand(),
    [GenerateCommand.command]: new GenerateCommand(),
  };

  private defaultCommand = this.commands[HelpCommand.command];

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = { command: null, args: []};

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc.command = item as keyof Commands;
      } else if (acc.command && item) {
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
    const { command: name, args } = this.parseCommand(argv);

    const command = this.getCommand(name);
    command.execute(...args);
  }
}
