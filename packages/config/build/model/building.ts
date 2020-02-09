import { Building } from '../../src';
import { VElement, pickValue } from '../../scripts/v-element';
import { PropertyCreateFunction } from './_base';

export const elementName = 'Building';

export const create: PropertyCreateFunction<Building> = elem => {
  return {
    type: pickValue(elem, 'BuildingType', 'string'),
    category: pickValue(elem, 'BuildingCategoryName', 'number'),

    terrain: pickValue(elem, 'TerrainType', 'string'),
    regions: pickValue(elem, 'AssociatedRegions', 'string[]'),
    pickingAsset: pickValue(elem, 'PickingAsset', 'number'),
  };
};
