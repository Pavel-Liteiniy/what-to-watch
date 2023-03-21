import { createReadStream } from 'fs';
import { EventEmitter } from 'events';

import { Film } from '../../types/film.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

import { createFilm } from '../../utils/common.js';

export class TSVFileReader extends EventEmitter implements FileReaderInterface {
  private rowData = '';

  constructor(public filename: string) {
    super();
  }

  public async read():Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: 16384, // 16KB
      encoding: 'utf-8',
    });

    let lineRead = '';
    let endLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      lineRead += chunk.toString();

      while ((endLinePosition = lineRead.indexOf('\n')) >= 0) {
        const completeRow = lineRead.slice(0, endLinePosition + 1);
        lineRead = lineRead.slice(++endLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }

  public getFilms(): Film[] {
    this.read();

    return this.rowData
      .split('\n')
      .filter((row) => Boolean(row.trim()))
      .map((row) => createFilm(row));
  }
}
