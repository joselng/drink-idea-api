import { container } from 'tsyringe';

import IHashProvider from './HashProvider/IHashProvider';
import BCryptHashProvider from './HashProvider/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
