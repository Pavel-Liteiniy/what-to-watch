import { CliCommandInterface } from './cli-command.interface.js';

export class HelpCommand implements CliCommandInterface {
  public static readonly command = '--help';

  public execute(): void {
    console.log(`
      Программа для подготовки данных для REST API сервера.
      Пример:
          main.js --<command> [--arguments]
      Команды:
          --version:                   # выводит номер версии
          --help:                      # печатает этот текст
          --import <path>:             # импортирует данные из TSV
          --generate <n> <path> <url> # генерирует произвольное количество тестовых данных
    `);
  }
}
