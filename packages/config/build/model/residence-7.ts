import { Residence7 } from '../../src';
import { pickValue } from '../v-element';
import { PropertyCreateFunction } from './_base';

export const elementName = 'Residence7';

export const create: PropertyCreateFunction<Residence7> = elem => {
  return {
    populationLevel7: pickValue(elem, 'PopulationLevel7', 'int'),
    start: pickValue(elem, 'ResidentStart', 'int'),
    max: pickValue(elem, 'ResidentMax', 'int'),
  };
};
