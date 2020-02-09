import { VElement, pickValue } from '../v-element';
import { TAG_NAMES } from '../constants';
import { inheritElement } from './inheritElement';

function applyInherit(template: VElement, defaultValues: VElement[]): void {
  template.children
    .find(c => c.name === TAG_NAMES.Properties)
    ?.children.forEach(property => {
      const { name } = property;
      const defaultProperty = defaultValues.find(p => p.name === name);
      if (defaultProperty) {
        inheritElement(property, defaultProperty);
      }
    });
}

export function inheritProperties(
  templates: VElement[],
  defaultValues: VElement[],
  defaultContainerValues: VElement[],
): void {
  templates.forEach(template => applyInherit(template, defaultValues));
}
