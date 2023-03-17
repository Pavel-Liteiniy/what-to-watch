import dayjs from 'dayjs';

import { Film } from '../types/film.type';

export const createFilm = (row: string) => {
  const [
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
  ] = row
    .replace('\n', '')
    .split('\t');

  return ({
    name,
    description,
    publication: dayjs(publication),
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
  }) as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
