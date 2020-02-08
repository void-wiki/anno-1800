import { resolve } from 'path';

export const rootDir = resolve(__dirname, '..');

export const maindataDir = resolve(rootDir, '..', 'anno-1800-maindata');

export const dataDir = resolve(maindataDir, 'data');

export const dataConvertedDir = resolve(maindataDir, 'data-converted');
