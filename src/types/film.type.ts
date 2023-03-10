import { Genre } from './genre.enum.js';

export type Film = {
  name: string;
  description: string;
  publication: Date;
  genre: Genre;
  release: number;
  rating: number;
  previewVideo: string;
  video: string;
  actors: string[];
  director: string;
  duration: number;
  commentCount: number;
  user: string;
  poster: string;
  backgroundImage: string;
  backgroundColor: string;
}
