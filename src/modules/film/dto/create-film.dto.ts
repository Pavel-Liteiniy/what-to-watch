import { Dayjs } from 'dayjs';
import { Ref } from '@typegoose/typegoose';

import { Genre } from '../../../types/genre.enum.js';
import { UserEntity } from '../../user/user.entity.js';

export default class CreateFilmDto {
  public name!: string;
  public description!: string;
  public publication!: Dayjs;
  public genre!: Genre;
  public release!: number;
  public rating!: number;
  public previewVideo!: string;
  public video!: string;
  public actors!: string[];
  public director!: string;
  public duration!: number;
  public user!: Ref<UserEntity>;
  public poster!: string;
  public backgroundImage!: string;
  public backgroundColor!: string;
}
