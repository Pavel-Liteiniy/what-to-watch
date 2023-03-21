import { CliCommandInterface } from './cli-command.interface.js';

export class HelpCommand implements CliCommandInterface {
  public static readonly command = '--help';

  public execute(): void {
    console.log(`
      Программа для подготовки данных для REST API сервера.
      Пример:
          main.js --<command> [--arguments]
      Команды:
          --version:                   # выводит номер версии --> npm run build && node ./dist/cli.js -- --version
          --help:                      # печатает этот текст --> npm run build && node ./dist/cli.js
          --import <path>:             # импортирует данные из TSV --> npm run build && node ./dist/cli.js -- --import ./mocks/test-data.tsv admin test 127.0.0.1 what-to-watch some_salt
          --generate <n> <path> <url> # генерирует произвольное количество тестовых данных --> npm run build && node ./dist/cli.js -- --generate 100 ./mocks/test-data.tsv http://localhost:3123/api
    `);
  }
}
