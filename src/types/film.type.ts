import { Dayjs } from 'dayjs';
import { Ref } from '@typegoose/typegoose';

import { UserEntity } from '../modules/user/user.entity.js';

import { Genre } from './genre.enum.js';

export type Film = {
  name: string;
  description: string;
  publication: Dayjs;
  genre: Genre;
  release: number;
  rating: number;
  previewVideo: string;
  video: string;
  actors: string[];
  director: string;
  duration: number;
  user: Ref<UserEntity>;
  poster: string;
  backgroundImage: string;
  backgroundColor: string;
}
