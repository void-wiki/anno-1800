import { resolve } from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { TEMPLATE_EXPORTED, Asset } from '../src';
import { VElement } from '../scripts/v-element';
import {
  srcAssetsDir,
  filenameManifest,
  assetsFiles,
  propertiesFile,
  templatesFile,
  TAG_NAMES,
} from '../scripts/constants';
import * as helpers from '../scripts/helpers';
import { createAsset } from './model/asset';

export async function genAssets(): Promise<Asset[]> {
  const assetsXml: VElement[] = (
    await Promise.all(assetsFiles.map(async f => fs.readJSON(f)))
  ).flat();
  const [defaultValuesXml, defaultContainerValuesXml] = helpers.processProperties(
    await fs.readJSON(propertiesFile),
  );
  const templatesXml: VElement[] = (await fs.readJSON(templatesFile)) as VElement[];

  helpers.processInheritance(assetsXml, templatesXml, defaultValuesXml, defaultContainerValuesXml);
  // helpers.findProperties(assets, 'Standard');

  const countMap: Record<string, number> = Object.fromEntries(TEMPLATE_EXPORTED.map(t => [t, 0]));
  await fs.remove(srcAssetsDir);
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
