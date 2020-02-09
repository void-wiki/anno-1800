import { VElement } from '../v-element';
import { TAG_NAMES } from '../constants';

export function processProperties(propertiesDoc: VElement): [VElement[], VElement[]] {
  const defaultValues: VElement[] = [];
  const defaultContainerValue: VElement[] = [];
  const defaultValuesCountMap: Record<string, number> = {};
  const defaultContainerValuesCountMap: Record<string, number> = {};

  const walk = (elem: VElement): void => {
    if (elem.name === TAG_NAMES.DefaultValues || elem.name === TAG_NAMES.DefaultContainerValues) {
      return;
    }

    if (elem.name === TAG_NAMES.Group) {
      elem.children
        .find(c => c.name === TAG_NAMES.DefaultValues)
        ?.children.forEach(c => {
          defaultValues.push(c);
          defaultValuesCountMap[c.name] = (defaultValuesCountMap[c.name] ?? 0) + 1;
        });

      elem.children
        .find(c => c.name === TAG_NAMES.DefaultContainerValues)
        ?.children.forEach(c => {
          defaultContainerValue.push(c);
          defaultContainerValuesCountMap[c.name] =
            (defaultContainerValuesCountMap[c.name] ?? 0) + 1;
        });
    }

    elem.children.forEach(c => walk(c));
  };

  walk(propertiesDoc);

  Object.entries({
    defaultValues: defaultValuesCountMap,
    defaultContainerValues: defaultContainerValuesCountMap,
  }).forEach(([name, map]) =>
    Object.entries(map).forEach(([key, value]) => {
      if (value > 1) {
        throw new Error(
          `Invalid properties, '${name}' has duplicated key '${key}', count: ${value}.`,
        );
      }
    }),
  );

  return [defaultValues, defaultContainerValue];
}

export function processTemplates(templatesDoc: VElement): VElement[] {
  const templates: VElement[] = [];

  const walk = (elem: VElement): void => {
    if (elem.name === TAG_NAMES.Template) {
      templates.push(elem);
      return;
    }

    elem.children.forEach(c => walk(c));
  };

  walk(templatesDoc);

  return templates;
}
