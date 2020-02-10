import { resolve } from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { Asset, TEMPLATE_EXPORTED } from '../src';
import { VElement } from './v-element';
import {
  srcAssetsDir,
  filenameManifest,
  assetsFiles,
  propertiesFile,
  templatesFile,
  TAG_NAMES,
} from './constants';
import { process } from './process';
import { createAsset } from './model/asset';

export async function genAssets(): Promise<Asset[]> {
  const assetsXml: VElement[] = process(
    (await Promise.all(assetsFiles.map(async f => fs.readJSON(f)))).flat(1),
    await fs.readJSON(propertiesFile),
    await fs.readJSON(templatesFile),
  );

  await fs.remove(srcAssetsDir);
  const countMap: Record<string, number> = Object.fromEntries(TEMPLATE_EXPORTED.map(t => [t, 0]));
  const assets = await Promise.all(
    assetsXml
      .filter(a =>
        (TEMPLATE_EXPORTED as readonly string[]).includes(
          a.children.find(c => c.name === TAG_NAMES.Template)?.value as string,
        ),
      )
      .map(a => createAsset(a))
      .map(async asset => {
        const { guid, template = '_' } = asset;
        countMap[template] += 1;
        await fs.outputFile(resolve(srcAssetsDir, template, `${guid}.yaml`), yaml.dump(asset));
        return asset;
      }),
  );
  await fs.outputFile(resolve(srcAssetsDir, filenameManifest), yaml.dump(countMap));

  return assets;
}
