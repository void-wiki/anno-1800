import { Asset } from '../../src';
import { VElement, pickValue } from '../v-element';
import { TAG_NAMES } from '../constants';
import { PropertyCreatorMap } from './_base';

import * as building from './building';
import * as cost from './cost';

const propertiesCreatorMap: PropertyCreatorMap = {
  building,
  cost,
};

export function createAsset(assetXml: VElement): Asset {
  const template = assetXml.children.find(c => c.name === TAG_NAMES.Template)?.value;

  const elemStandard = assetXml.children
    .find(c => c.name === TAG_NAMES.Values)
    ?.children.find(c => c.name === 'Standard') as VElement;
  const guid = pickValue(elemStandard, 'GUID', 'number', 0);
  const desc = pickValue(elemStandard, 'InfoDescription', 'number');
  const icon = pickValue(elemStandard, 'IconFilename', 'string');
  const name = pickValue(elemStandard, 'Name', 'string');
  const id = pickValue(elemStandard, 'ID', 'string');

  const asset: Asset = {
    guid,
    desc,
    icon,

    name,
    id,
    template,
  };

  Object.entries(propertiesCreatorMap).forEach(([prop, creator]) => {
    const { elementName, create } = creator;
    const element = assetXml.children
      .find(c => c.name === TAG_NAMES.Values)
      ?.children.find(c => c.name === elementName);
    if (!element || element.children.length === 0) {
      return;
    }

    const value = create(element);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (asset as any)[prop] = value;
  });

  return asset;
}
