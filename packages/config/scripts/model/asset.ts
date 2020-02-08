import { VElement } from '../v-element';
import { TAG_NAMES } from '../constants';
import { Asset } from '../../src';

export function createAsset(assetXml: VElement): Asset {
  const template = assetXml.children.find(c => c.name === TAG_NAMES.Template)?.value;

  const props = assetXml.children
    .find(c => c.name === TAG_NAMES.Values)
    ?.children.find(c => c.name === 'Standard')?.children as VElement[];
  const guid = Number.parseInt(props.find(c => c.name === 'GUID')?.value ?? '0', 10);
  const desc = Number.parseInt(props.find(c => c.name === 'InfoDescription')?.value ?? '0', 10);
  const icon = props.find(c => c.name === 'IconFilename')?.value;
  const name = props.find(c => c.name === 'Name')?.value;
  const id = props.find(c => c.name === 'ID')?.value;

  return {
    guid,
    desc,
    icon,

    name,
    id,
    template,
  };
}
