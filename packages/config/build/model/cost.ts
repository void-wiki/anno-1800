import { Cost } from '../../src';
import { VElement, pickValue } from '../../scripts/v-element';
import { PropertyCreateFunction } from './_base';

export const elementName = 'Cost';

export const create: PropertyCreateFunction<Cost> = elem => {
  const costs = elem.children
    .find(c => c.name === 'Costs')
    ?.children.map(item => {
      const ingredient = pickValue(item, 'Ingredient', 'number', 0);
      const amount = pickValue(item, 'Amount', 'number', 0);
      return [ingredient, amount];
    })
    .filter(([i, a]) => i !== 0 && a !== 0);
  const influenceCostType = pickValue(elem, 'InfluenceCostType', 'string');
  const influenceCostPoints = pickValue(elem, 'InfluenceCostPoints', 'number');

  return {
    costs: costs && costs.length > 0 ? Object.fromEntries(costs) : undefined,
    influenceCostType,
    influenceCostPoints,
  };
};
