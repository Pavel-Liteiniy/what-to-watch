import { TSVFileReader } from '../common/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';

export class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public execute(filename: string): void {
    const tsvFileReader = new TSVFileReader(filename.trim());

    try {
      console.log(tsvFileReader.getFilms());
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(`Не удалось импортировать данные из файла по причине: «${error.message}»`);
    }
  }
}
