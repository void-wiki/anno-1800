import { VElement } from './v-element';
import { TAG_NAMES } from './constants';

export function processProperties(properties: VElement[]): [VElement[], VElement[]] {
  const defaultValues = [] as VElement[];
  const defaultContainerValue = [] as VElement[];
  const defaultValuesCountMap = {} as Record<string, number>;
  const defaultContainerValuesCountMap = {} as Record<string, number>;

  const walk = (elem: VElement): void => {
    if (elem.name === TAG_NAMES.Groups) {
      elem.children.forEach(c => walk(c));
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

      const groups = elem.children.find(c => c.name === TAG_NAMES.Groups);
      if (typeof groups !== 'undefined') {
        walk(groups);
      }
    }
  };

  walk(properties[0]);

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

// TODO: Is this really necessary?
function inheritFromTemplate(asset: VElement, template: VElement): void {
  //
}

export function processInheritance(
  assets: VElement[],
  templates: VElement[],
  defaultValues: VElement[],
  defaultContainerValues: VElement[],
): void {
  const findBaseAsset = (guid: string): VElement | undefined =>
    assets.find(
      a =>
        a.children
          .find(c => c.name === TAG_NAMES.Values)
          ?.children.find(c => c.name === 'Standard')
          ?.children.find(c => c.name === 'GUID')?.value === guid,
    );

  const setTemplate = (asset: VElement): void => {
    const baseGuid = asset.children.find(c => c.name === TAG_NAMES.BaseAssetGUID)?.value as string;
    const template = asset.children.find(c => c.name === TAG_NAMES.Template)?.value;
    if (typeof template !== 'undefined') {
      return;
    }

    let baseAsset = findBaseAsset(baseGuid);
    let baseTemplate = baseAsset?.children.find(c => c.name === TAG_NAMES.Template);
    while (baseAsset && !baseTemplate) {
      baseAsset = findBaseAsset(baseGuid);
      baseTemplate = baseAsset?.children.find(c => c.name === TAG_NAMES.Template);
    }
    asset.children.unshift({
      name: TAG_NAMES.Template,
      attributes: {},
      children: [],
      value: baseTemplate?.value as string,
    });

    // console.log(baseGuid, baseTemplate?.value);
  };
  assets
    .filter(a => a.children.some(c => c.name === TAG_NAMES.BaseAssetGUID))
    .forEach(a => setTemplate(a));

  const templateMap: Record<string, VElement> = Object.fromEntries(
    templates.map(t => {
      const name = t.children.find(c => c.name === TAG_NAMES.Name)?.value ?? '_';
      return [name, t];
    }),
  );

  assets.forEach(asset => {
    const templateName = asset.children.find(c => c.name === TAG_NAMES.Template)?.value ?? '_';
    if (templateName === '_') {
      return;
    }
    const { [templateName]: template } = templateMap;
    inheritFromTemplate(asset, template);
  });
}

export function findProperties(assets: VElement[], propertyName: string): void {
  const propsSet = new Set<string>();
  assets.forEach(asset => {
    asset.children
      .find(c => c.name === TAG_NAMES.Values)
      ?.children.find(c => c.name === propertyName)
      ?.children.forEach(p => propsSet.add(p.name));
  });
  propsSet.forEach(p => console.log(p));
}
