import { Asset } from '../../src';
import { VElement } from '../../scripts/v-element';

export type Property = Exclude<keyof Asset, 'guid' | 'desc' | 'icon' | 'name' | 'id' | 'template'>;

export type PropertyCreateFunction<T> = (elem: VElement) => T;

export interface PropertyCreator<T> {
  elementName: string;
  create: PropertyCreateFunction<T>;
}

export type PropertyCreatorMap = {
  [p in Property]: PropertyCreator<Asset[p]>;
};
