import { resolve } from 'path';
import fs from 'fs-extra';
import globby from 'globby';
import yaml from 'js-yaml';
import { Asset, TEMPLATE_EXPORTED } from '../src';
import { srcAssetsDir, distDir, filenameManifest } from './constants';

export async function buildAssets(): Promise<void> {
  const manifest: Record<string, number> = await fs
    .readFile(resolve(srcAssetsDir, filenameManifest), 'utf-8')
    .then(c => yaml.load(c));
  const total = Object.values(manifest).reduce((t, c) => t + c);

  const assetsList: Asset[] = await globby(['**/*.yaml', `!${filenameManifest}`], {
    cwd: srcAssetsDir,
  }).then(async files =>
    Promise.all(
      files.map(async f => fs.readFile(resolve(srcAssetsDir, f), 'utf-8').then(c => yaml.load(c))),
    ),
  );
  if (assetsList.length !== total) {
    throw new Error(
      `Build failed: incorrect assets amount: ${assetsList.length}, expected: ${total}.`,
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
