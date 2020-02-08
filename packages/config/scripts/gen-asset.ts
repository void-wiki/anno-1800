import { resolve } from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { VElement } from './v-element';
import {
  srcDir,
  assetsFiles,
  propertiesFile,
  templatesFile,
  TAG_NAMES,
  TEMPLATE_NAMES_FOR_EXPORT,
} from './constants';
import * as helpers from './helpers';
import { createAsset } from './model/asset';

export async function genAssets(): Promise<void> {
  const assets: VElement[] = (await Promise.all(assetsFiles.map(async f => fs.readJSON(f)))).flat();
  const [defaultValues, defaultContainerValues] = helpers.processProperties(
    await fs.readJSON(propertiesFile),
  );
  const templates: VElement[] = (await fs.readJSON(templatesFile)) as VElement[];

  helpers.processInheritance(assets, templates, defaultValues, defaultContainerValues);
  // helpers.findProperties(assets, 'Standard');

  const outputDir = resolve(srcDir, 'assets');
  await fs.remove(outputDir);
  await Promise.all(
    assets
      .filter(a =>
        TEMPLATE_NAMES_FOR_EXPORT.includes(
          a.children.find(c => c.name === TAG_NAMES.Template)?.value as string,
        ),
      )
      .map(a => createAsset(a))
      .map(async asset => {
        const { guid, template = '_' } = asset;
        const content = yaml.dump(asset);
        const path = resolve(outputDir, template, `${guid}.yaml`);
        await fs.outputFile(path, content, 'utf-8');
      }),
  );
}
