import { resolve } from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { ManifestI18n } from '../src';
import { srcI18nDir, manifestI18nFile, distDir } from './constants';

export async function buildI18n(): Promise<void> {
  const manifest: ManifestI18n = await fs
    .readFile(manifestI18nFile, 'utf-8')
    .then(c => yaml.load(c));

  await Promise.all(
    manifest.languagesExported.map(async lang =>
      fs
        .readFile(resolve(srcI18nDir, `${lang}.yaml`), 'utf-8')
        .then(c => yaml.load(c))
        .then(async dict => fs.outputJSON(resolve(distDir, 'i18n', `${lang}.json`), dict)),
    ),
  );
}
