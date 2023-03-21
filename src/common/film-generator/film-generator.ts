import dayjs from 'dayjs';
import { Ref } from '@typegoose/typegoose';

import { Film } from '../../types/film.type.js';
import { MockData } from '../../types/mock-data.type.js';
import { FilmGeneratorInterface } from './film-generator.interface.js';
import { Genre } from '../../types/genre.enum.js';
import { UserEntity } from '../../modules/user/user.entity.js';

import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../utils/random.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class FilmGenerator implements FilmGeneratorInterface {
  constructor(
    private readonly mockData: MockData
  ) {}

  public generate(): Film {
    const {
      names,
      descriptions,
      genres,
      previewVideos,
      videos,
      actors,
      directors,
      posters,
      backgroundImages,
      backgroundColors,
      users,
    } = this.mockData;

    const generatedFilm = {
      name: getRandomItem(names),
      description: getRandomItem(descriptions),
      publication: dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day'),
      genre: getRandomItem(genres) as Genre,
      release: generateRandomValue(1900, 2023),
      rating: generateRandomValue(0, 5, 1),
      previewVideo: getRandomItem(previewVideos),
      video: getRandomItem(videos),
      actors: getRandomItems(actors),
      director: getRandomItem(directors),
      duration: generateRandomValue(60, 210),
      commentCount: generateRandomValue(0, 1000),
      user: getRandomItem(users) as unknown as Ref<UserEntity>,
      poster: getRandomItem(posters),
      backgroundImage: getRandomItem(backgroundImages),
      backgroundColor: getRandomItem(backgroundColors),
    };

    return generatedFilm;
  }

  public toTSV() {
    const film = this.generate();

    const {
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
      user,
      poster,
      backgroundImage,
      backgroundColor,
    } = film;

    return [
      name,
      description,
      publication.toISOString(),
      genre,
      release,
      rating,
      previewVideo,
      video,
      actors.join(),
      director,
      duration,
      user,
      poster,
      backgroundImage,
      backgroundColor,
    ].join('\t');
  }
}
