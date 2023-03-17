import { Film } from '../../types/film.type.js';


export interface FilmGeneratorInterface {
  generate(): Film;
  toTSV(): string;
}
