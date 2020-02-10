import { VElement } from '../v-element';
import { processProperties, processTemplates } from './preprocess';
import { inheritAssets } from './inheritAssets';
import { inheritProperties } from './inheritProperties';
import { inheritTemplates } from './inheritTemplates';

export function processAssetsXml(
  assets: VElement[],
  propertiesDoc: VElement,
  templatesDoc: VElement,
): VElement[] {
  const [defaultValues, defaultContainerValue] = processProperties(propertiesDoc);
  const templates = processTemplates(templatesDoc);

  inheritTemplates(assets, templates);
  inheritAssets(assets);
  inheritProperties(assets, defaultValues, defaultContainerValue);

  return assets;
}
