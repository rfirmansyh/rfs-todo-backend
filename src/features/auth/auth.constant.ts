import { ROOT_PATH } from '@/constant/app.constant';
import * as fs from 'fs';
import * as path from 'path';

export const JWT = {
  PRIVATE_KEY: fs.readFileSync(path.resolve(ROOT_PATH, 'jwtRS256.key'), 'utf8'),
  PUBLIC_KEY: fs.readFileSync(
    path.resolve(ROOT_PATH, 'jwtRS256.key.pub'),
    'utf8',
  ),
  EXPIRATION_TIME: 3600,
};
