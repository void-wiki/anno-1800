import fs from 'fs-extra';
import { rootDir, maindataDir } from './helpers';

console.log(rootDir, fs.pathExistsSync(rootDir));
console.log(maindataDir, fs.pathExistsSync(maindataDir));
