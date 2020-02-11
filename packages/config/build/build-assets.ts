import { resolve } from 'path';
import fs from 'fs-extra';
import globby from 'globby';
import yaml from 'js-yaml';
import { Asset, ManifestAssets, TEMPLATE_EXPORTED } from '../src';
import { filenameManifest, srcAssetsDir, manifestAssetsFile, distDir } from './constants';

export async function buildAssets(): Promise<void> {
  // read manifest
  const manifest: ManifestAssets = await fs
    .readFile(manifestAssetsFile, 'utf-8')
    .then(c => yaml.load(c));

  const assetsList: Asset[] = await globby(['**/*.yaml', `!${filenameManifest}`], {
    cwd: srcAssetsDir,
  }).then(async files =>
    Promise.all(
      files.map(async f => fs.readFile(resolve(srcAssetsDir, f), 'utf-8').then(c => yaml.load(c))),
    ),
  );
  assetsList.sort((a, b) => a.guid - b.guid);

  // validate
  if (assetsList.length !== manifest.guidAmount) {
    throw new Error(
      `Build failed: incorrect assets amount: ${assetsList.length}, expected: ${manifest.guidAmount}.`,
    );
  }

  const assetsMap: Record<string, Asset[]> = Object.fromEntries(
    TEMPLATE_EXPORTED.map(t => [t, []]),
  );
  assetsList.forEach(({ template, name, ...asset }) => {
    assetsMap[template as string].push(asset);
  });

  await fs.outputJSON(resolve(distDir, 'assets.json'), assetsMap);
}
