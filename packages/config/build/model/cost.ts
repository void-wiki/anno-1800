import { Cost } from '../../src';
import { pickValue, pickListToMap } from '../v-element';
import { PropertyCreateFunction } from './_base';

export const elementName = 'Cost';

export const create: PropertyCreateFunction<Cost> = elem => {
  return {
    costs: pickListToMap<'int', 'int'>(
      elem,
      'Costs',
      i => pickValue(i, 'Ingredient', 'int'),
      i => pickValue(i, 'Amount', 'int'),
    ),
    influenceCostType: pickValue(elem, 'InfluenceCostType', 'string'),
    influenceCostPoints: pickValue(elem, 'InfluenceCostPoints', 'int'),
  };
};
