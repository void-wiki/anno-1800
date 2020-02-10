import { resolve } from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { Asset, ManifestAssets, TEMPLATE_EXPORTED } from '../src';
import { VElement } from './v-element';
import { processAssetsXml } from './process';
import { createAsset } from './model/asset';
import {
  srcAssetsDir,
  manifestAssetsFile,
  assetsFiles,
  propertiesFile,
  templatesFile,
  TAG_NAMES,
} from './constants';

export async function genAssets(): Promise<Asset[]> {
  const assetsXml: VElement[] = processAssetsXml(
    (await Promise.all(assetsFiles.map(async f => fs.readJSON(f)))).flat(1),
    await fs.readJSON(propertiesFile),
    await fs.readJSON(templatesFile),
  );

  // remove old files
  await fs.remove(srcAssetsDir);

  const manifest: ManifestAssets = {
    guidAmount: 0,
    templatesExported: [...TEMPLATE_EXPORTED],
    guidAmountEachTemplate: Object.fromEntries(TEMPLATE_EXPORTED.map(t => [t, 0])),
  };

  // output new files
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
        manifest.guidAmount += 1;
        manifest.guidAmountEachTemplate[template] += 1;
        await fs.outputFile(resolve(srcAssetsDir, template, `${guid}.yaml`), yaml.dump(asset));
        return asset;
      }),
  );

  // output manifest
  await fs.outputFile(manifestAssetsFile, yaml.dump(manifest));

  return assets;
}
