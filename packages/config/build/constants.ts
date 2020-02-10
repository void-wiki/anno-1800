import { resolve } from 'path';
import { dataConvertedDir } from '../../../scripts/helpers';

// current package related

export const pkgDir = resolve(__dirname, '..');

export const srcDir = resolve(pkgDir, 'src');

export const srcI18nDir = resolve(srcDir, 'i18n');

export const srcAssetsDir = resolve(srcDir, 'assets');

export const distDir = resolve(pkgDir, 'dist');

export const filenameManifest = 'manifest.yaml';

// raw files related

export const guiDir = resolve(dataConvertedDir, 'config/gui');

export const assetDir = resolve(dataConvertedDir, 'config/export/main/asset');

export const assetsFiles = Array(56)
  .fill(0)
  .map((_, i) => resolve(assetDir, `assets_${i.toString().padStart(4, '0')}.json`));

export const propertiesFile = resolve(assetDir, 'properties.json');

export const templatesGroupsFile = resolve(assetDir, 'templates-groups.json');

export const templatesFile = resolve(assetDir, 'templates.json');

/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Usual XML tag names.
 */
export const TAG_NAMES = {
  Assets: 'Assets',
  Asset: 'Asset',
  Template: 'Template',
  Values: 'Values',
  BaseAssetGUID: 'BaseAssetGUID',
  Item: 'Item',
  Objective: 'Objective',

  VectorElement: 'VectorElement',
  InheritedIndex: 'InheritedIndex',
  InheritanceMapV2: 'InheritanceMapV2',
  Entry: 'Entry',
  TemplateName: 'TemplateName',
  Index: 'Index',

  Groups: 'Groups',
  Group: 'Group',

  // Template: 'Template',
  Name: 'Name',
  Properties: 'Properties',

  // Name: 'Name',
  DefaultValues: 'DefaultValues',
  DefaultContainerValues: 'DefaultContainerValues',
} as const;
/* eslint-enable @typescript-eslint/naming-convention */
