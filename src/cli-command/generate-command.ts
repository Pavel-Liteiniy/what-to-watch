import axios from 'axios';

import { MockData } from '../types/mock-data.type.js';

import { TSVFileWriter } from '../common/file-writer/tsv-file-writer.js';
import { FilmGenerator } from '../common/film-generator/film-generator.js';

import { CliCommandInterface } from './cli-command.interface.js';

export class GenerateCommand implements CliCommandInterface {
  public static readonly command = '--generate';

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;

    const mockData = await this.getMockData(url);

    if (mockData === null) {
      return;
    }

    const filmGenerator = new FilmGenerator(mockData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let index = 0; index < Number.parseInt(count, 10); index++) {
      const film = filmGenerator.toTSV();
      await tsvFileWriter.write(film);
    }
  }

  private async getMockData(url: string) {
    let mockData = null;

    try {
      const response = await axios.get<MockData>(url);
      mockData = response.data as MockData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      }
    }

    return mockData;
  }
}
