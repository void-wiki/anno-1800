import { Asset } from '../../src';
import { VElement, pickValue } from '../v-element';
import { TAG_NAMES } from '../constants';
import { PropertyCreatorMap } from './_base';

import * as building from './building';
import * as cost from './cost';
import * as upgradable from './upgradable';

import * as residence7 from './residence-7';
import * as populationLevel7 from './population-level-7';

import * as product from './product';

const propertiesCreatorMap: PropertyCreatorMap = {
  building,
  cost,
  upgradable,
  residence7,
  populationLevel7,
  product,
};

export function createAsset(assetXml: VElement): Asset {
  const elemStandard = assetXml.children
    .find(c => c.name === TAG_NAMES.Values)
    ?.children.find(c => c.name === 'Standard') as VElement;

  const asset: Asset = {
    guid: pickValue(elemStandard, 'GUID', 'number', 0),
    desc: pickValue(elemStandard, 'InfoDescription', 'number'),
    icon: pickValue(elemStandard, 'IconFilename', 'string'),

    name: pickValue(elemStandard, 'Name', 'string'),
    id: pickValue(elemStandard, 'ID', 'string'),
    template: pickValue(assetXml, TAG_NAMES.Template, 'string'),
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
