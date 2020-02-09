import { VElement, pickValue } from '../v-element';
import { TAG_NAMES } from '../constants';
import { inheritElement } from './inheritElement';

function buildMap(templates: VElement[]): Record<string, VElement> {
  return Object.fromEntries(templates.map(t => [pickValue(t, TAG_NAMES.Name, 'string'), t]));
}

function applyInherit(asset: VElement, templateMap: Record<string, VElement>): void {
  const templateName = pickValue(asset, 'Template', 'string', '_');
  const template = templateMap[templateName] as VElement | undefined;
  if (template) {
    const values = asset.children.find(c => c.name === TAG_NAMES.Values);
    const properties = template.children.find(c => c.name === TAG_NAMES.Properties);
    if (values && properties) {
      inheritElement(values, properties);
    }
  }
}

export function inheritTemplates(assets: VElement[], templates: VElement[]): void {
  const templateMap = buildMap(templates);
  assets.forEach(asset => applyInherit(asset, templateMap));
}
