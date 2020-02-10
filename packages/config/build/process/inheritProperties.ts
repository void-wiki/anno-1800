import { VElement, pickValue } from '../v-element';
import { TAG_NAMES } from '../constants';
import { inheritElement } from './inheritElement';

function applyInherit(assets: VElement, defaultValues: VElement[]): void {
  assets.children
    .find(c => c.name === TAG_NAMES.Values)
    ?.children.forEach(property => {
      const { name } = property;
      const defaultProperty = defaultValues.find(p => p.name === name);
      if (defaultProperty) {
        inheritElement(property, defaultProperty);
      }
    });
}

export function inheritProperties(
  assets: VElement[],
  defaultValues: VElement[],
  defaultContainerValues: VElement[],
): void {
  assets.forEach(template => applyInherit(template, defaultValues));
}
