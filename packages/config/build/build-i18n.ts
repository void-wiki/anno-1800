import { resolve } from 'path';
import fs from 'fs-extra';
import globby from 'globby';
import yaml from 'js-yaml';
import { Asset, TEMPLATE_EXPORTED } from '../src';
import { srcI18nDir, distDir, filenameManifest } from './constants';

export async function buildI18n(): Promise<void> {
  const manifest = await fs
    .readFile(resolve(srcI18nDir, filenameManifest), 'utf-8')
    .then(c => yaml.load(c));

  await Promise.all(
    (manifest.languagesExported as string[]).map(async lang => {
      const dict = await fs
        .readFile(resolve(srcI18nDir, `${lang}.yaml`), 'utf-8')
        .then(c => yaml.load(c));
      await fs.outputJSON(resolve(distDir, 'i18n', `${lang}.json`), dict);
    }),
  );
}
