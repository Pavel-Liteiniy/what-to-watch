import {readFileSync} from 'fs';

import { Film } from '../../types/film.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export class TSVFileReader implements FileReaderInterface {
  private rowData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rowData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public getFilms(): Film[] {
    this.read();

    return this.rowData
      .split('\n')
      .filter((row) => Boolean(row.trim()))
      .map((row) => row.split('\t'))
      .map(([
        name,
        description,
        publication,
        genre,
        release,
        rating,
        previewVideo,
        video,
        actors,
        director,
        duration,
        commentCount,
        user,
        poster,
        backgroundImage,
        backgroundColor,
      ]) => ({
        name,
        description,
        publication: new Date(publication),
        genre,
        release: Number(release),
        rating: Number(rating),
        previewVideo,
        video,
        actors: actors.split(','),
        director,
        duration: Number(duration),
        commentCount: Number(commentCount),
        user,
        poster,
        backgroundImage,
        backgroundColor,
      }) as Film);
  }
}
