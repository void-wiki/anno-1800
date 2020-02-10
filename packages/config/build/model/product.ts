import { Product } from '../../src';
import { pickValue } from '../v-element';
import { PropertyCreateFunction } from './_base';

export const elementName = 'Product';

export const create: PropertyCreateFunction<Product> = elem => {
  return {
    /**
     * ProductCategory
     */
    category: pickValue(elem, 'ProductCategory', 'number'),

    /**
     * AssociatedRegion
     */
    regions: pickValue(elem, 'AssociatedRegion', 'string[]'),

    /**
     * CivLevel
     */
    civLevel: pickValue(elem, 'CivLevel', 'number'),

    /**
     * StorageLevel
     */
    storageLevel: pickValue(elem, 'StorageLevel', 'string'),

    /**
     * ProductColor
     */
    color: pickValue(elem, 'ProductColor', 'hex'), // color

    basePrice: pickValue(elem, 'BasePrice', 'number'),

    pathLayer: pickValue(elem, 'PathLayer', 'string'),
    deltaOnly: pickValue(elem, 'DeltaOnly', 'boolean'),
    isWorkforce: pickValue(elem, 'IsWorkforce', 'boolean'),
    isStrategicResource: pickValue(elem, 'IsStrategicResource', 'boolean'),
    isAbstract: pickValue(elem, 'IsAbstract', 'boolean'),
    canBeNegative: pickValue(elem, 'CanBeNegative', 'boolean'),
  };
};
