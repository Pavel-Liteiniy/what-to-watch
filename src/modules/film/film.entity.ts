import dayjs from 'dayjs';
import typegoose, { getModelForClass, defaultClasses, Ref } from '@typegoose/typegoose';

import { Film } from '../../types/film.type.js';
import { Genre } from '../../types/genre.enum.js';

import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'films'
  }
})
export class FilmEntity extends defaultClasses.TimeStamps implements Film {
  @prop({
    type: String,
    required: true,
    minlength: [2, 'Min length for film name 2'],
    maxLength: [100, 'Max length for film name 100'],
  })
  public name!: string;

  @prop({
    type: String,
    required: true,
    minlength: [20, 'Min length for film description 20'],
    maxLength: [1024, 'Max length for film description 1024'],
  })
  public description!: string;

  @prop({
    type: Date,
    required: true,
    default: dayjs(),
  })
  public publication!: dayjs.Dayjs;

  @prop({
    type: () => String,
    enum: Genre,
    required: true,
  })
  public genre!: Genre;

  @prop({
    type: Number,
    required: true,
  })
  public release!: number;

  @prop({
    type: Number,
    required: true,
  })
  public rating!: number;

  @prop({
    type: String,
    required: true,
  })
  public previewVideo!: string;

  @prop({
    type: String,
    required: true,
  })
  public video!: string;

  @prop({
    required: true,
    default: []
  })
  public actors!: string[];

  @prop({
    type: String,
    required: true,
    minlength: [2, 'Min length for film director 2'],
    maxLength: [50, 'Max length for film director 50'],
  })
  public director!: string;

  @prop({
    type: Number,
    required: true,
  })
  public duration!: number;

  @prop({
    // ref: CommentEntity,
    // _id: false,
    // count: true,
    default: 0,
  })
  public commentCount!: number;

  @prop({
    ref: UserEntity,
    required: true,
    _id: false,
  })
  public user!: Ref<UserEntity>;

  @prop({
    type: String,
    required: true,
    match: /.+\.jpg$/i,
  })
  public poster!: string;

  @prop({
    type: String,
    required: true,
    match: /.+\.jpg$/i,
  })
  public backgroundImage!: string;

  @prop({
    type: String,
    required: true,
  })
  public backgroundColor!: string;
}

export const FilmModel = getModelForClass(FilmEntity);
