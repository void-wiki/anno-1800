import { resolve } from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { Asset, LANGUAGES_EXPORTED } from '../src';
import { srcI18nDir, filenameManifest, guiDir } from './constants';

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

  await fs.remove(srcI18nDir);
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
  await fs.outputFile(
    resolve(srcI18nDir, filenameManifest),
    yaml.dump({
      languagesExported: LANGUAGES_EXPORTED,
      guidAmount: guidList.length,
    }),
  );
}
