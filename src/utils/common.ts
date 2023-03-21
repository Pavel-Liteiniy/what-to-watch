import dayjs from 'dayjs';
import crypto from 'crypto';
import { Ref } from '@typegoose/typegoose';

import { UserEntity } from '../modules/user/user.entity';

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

  const userId = user as unknown as Ref<UserEntity>;

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
    user: userId,
    poster,
    backgroundImage,
    backgroundColor,
  }) as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHash = crypto.createHmac('sha256', salt);
  return shaHash.update(line).digest('hex');
};
