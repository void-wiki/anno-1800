import { PopulationLevel7, PopulationInput, PopulationOutput } from '../../src';
import { pick, pickValue, pickMap } from '../v-element';
import { PropertyCreateFunction } from './_base';

export const elementName = 'PopulationLevel7';

export const create: PropertyCreateFunction<PopulationLevel7> = elem => {
  return {
    populationInputs: pick(elem, 'PopulationInputs', childElem =>
      childElem.children.map<PopulationInput>(item => {
        return {
          product: pickValue(item, 'Product', 'int'),
          amount: pickValue(item, 'Amount', 'float'), // float
          supplyWeight: pickValue(item, 'SupplyWeight', 'int'),
          moneyValue: pickValue(item, 'MoneyValue', 'int'),
          fullWeightPopulationCount: pickValue(item, 'FullWeightPopulationCount', 'int'),
          noWeightPopulationCount: pickValue(item, 'NoWeightPopulationCount', 'int'),
        };
      }),
    ),
    populationOutputs: pick(elem, 'PopulationOutputs', childElem =>
      childElem.children.map<PopulationOutput>(item => {
        return {
          product: pickValue(item, 'Product', 'int'),
          amount: pickValue(item, 'Amount', 'int'),
        };
      }),
    ),

    categoryIcon: pickValue(elem, 'CategoryIcon', 'string'),
    moodText: pickMap<'int'>(elem, 'MoodText', i => pickValue(i, 'Text', 'int')),
  };
};
