import { Upgradable } from '../../src';
import { pickValue, pickListToMap } from '../v-element';
import { PropertyCreateFunction } from './_base';

export const elementName = 'Upgradable';

export const create: PropertyCreateFunction<Upgradable> = elem => {
  return {
    next: pickValue(elem, 'NextGUID', 'int'),
    costs: pickListToMap<'int', 'int'>(
      elem,
      'UpgradeCost',
      i => pickValue(i, 'Ingredient', 'int'),
      i => pickValue(i, 'Amount', 'int'),
    ),
  };
};
