import { resolve } from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { Asset, ManifestI18n, LANGUAGES_EXPORTED } from '../src';
import { srcI18nDir, manifestI18nFile, guiDir } from './constants';

export async function genI18n(assets: Asset[]): Promise<void> {
  const guidSet = new Set<number>();
  assets.forEach(({ guid, desc }) => {
    guidSet.add(guid);
    if (desc !== undefined) {
      guidSet.add(desc);
    }
  });
  const guidList = [...guidSet].sort((a, b) => a - b);

  const rawEnglishDict: Record<number, string> = await fs.readJSON(
    resolve(guiDir, `texts_english.json`),
  );

  // remove old files
  await fs.remove(srcI18nDir);

  const mainfest: ManifestI18n = {
    guidAmount: guidList.length,
    languagesExported: [...LANGUAGES_EXPORTED],
  };

  // output new files
  await Promise.all(
    LANGUAGES_EXPORTED.map(async lang => {
      const rawDict: Record<number, string> = await fs.readJSON(
        resolve(guiDir, `texts_${lang}.json`),
      );
      const dict: Record<number, string> = Object.fromEntries(
        guidList.map(guid => {
          const { [guid]: text = rawEnglishDict[guid] } = rawDict;
          return [guid, text];
        }),
      );
      await fs.outputFile(resolve(srcI18nDir, `${lang}.yaml`), yaml.dump(dict));
    }),
  );

  // output manifest
  await fs.outputFile(manifestI18nFile, yaml.dump(mainfest));
}
