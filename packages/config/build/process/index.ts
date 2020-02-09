import { VElement } from '../v-element';
import { processProperties, processTemplates } from './preprocess';
import { inheritAssets } from './inheritAssets';
import { inheritProperties } from './inheritProperties';
import { inheritTemplates } from './inheritTemplates';

export function process(
  assets: VElement[],
  propertiesDoc: VElement,
  templatesDoc: VElement,
): VElement[] {
  const [defaultValues, defaultContainerValue] = processProperties(propertiesDoc);
  const templates = processTemplates(templatesDoc);

  inheritProperties(templates, defaultValues, defaultContainerValue);
  inheritTemplates(assets, templates);
  inheritAssets(assets);

  return assets;
}
