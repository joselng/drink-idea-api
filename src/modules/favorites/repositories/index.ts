import { container } from 'tsyringe';

import IFavoritesRepository from './IFavoritesRepository';
import FavoritesRepository from './FavoritesRepository';

container.registerSingleton<IFavoritesRepository>(
  'FavoritesRepository',
  FavoritesRepository,
);
