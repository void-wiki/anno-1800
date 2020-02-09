/* eslint-disable no-param-reassign */
import yaml from 'js-yaml';
import { VElement, pickValue } from '../v-element';
import { TAG_NAMES } from '../constants';
import { inheritElement } from './inheritElement';

interface InheritNode {
  guid: number;
  asset: VElement;
  baseNode?: InheritNode;
  derivedNodes: InheritNode[];
}

function buildNodes(assets: VElement[]): InheritNode[] {
  const tempNodes: InheritNode[] = assets
    .filter(a => a.children.some(c => c.name === TAG_NAMES.BaseAssetGUID))
    .map<InheritNode>(asset => {
      const guid = Number.parseInt(
        asset.children
          .find(c => c.name === TAG_NAMES.Values)
          ?.children.find(c => c.name === 'Standard')
          ?.children.find(c => c.name === 'GUID')?.value ?? '0',
        10,
      );
      return {
        guid,
        asset,
        derivedNodes: [],
      };
    });

  tempNodes.forEach(node => {
    const baseGuid = pickValue(node.asset, TAG_NAMES.BaseAssetGUID, 'number') as number;

    let baseNode = tempNodes.find(n => n.guid === baseGuid);
    if (baseNode) {
      baseNode.derivedNodes.push(node);
      node.baseNode = baseNode;
      return;
    }

    const baseAsset = assets.find(
      a =>
        Number.parseInt(
          a.children
            .find(c => c.name === TAG_NAMES.Values)
            ?.children.find(c => c.name === 'Standard')
            ?.children.find(c => c.name === 'GUID')?.value ?? '0',
          10,
        ) === baseGuid,
    ) as VElement;
    baseNode = {
      guid: baseGuid,
      asset: baseAsset,
      derivedNodes: [node],
    };
    node.baseNode = baseNode;
    tempNodes.push(baseNode);
  });

  const topNodes: InheritNode[] = tempNodes.filter(n => !n.baseNode);

  const countMap: Record<number, number> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convert = (nodes: InheritNode[]): any => {
    const entries = nodes.map(({ guid, derivedNodes }) => {
      countMap[guid] = (countMap[guid] ?? 0) + 1;
      return [guid, convert(derivedNodes)];
    });
    return entries.length > 0 ? Object.fromEntries(entries) : '';
  };
  const map = convert(topNodes);

  if (Object.values(countMap).some(v => v > 1)) {
    throw new Error(`Invalid inherit tree: duplicated nodes.`);
  }

  // console.log(yaml.dump(map));

  return topNodes;
}

function applyInherit(nodeBase: InheritNode): void {
  nodeBase.derivedNodes.forEach(nodeDerived => {
    const { asset: assetDerived } = nodeDerived;
    const { asset: assetBase } = nodeBase;
    const template = pickValue(assetBase, TAG_NAMES.Template, 'string');
    if (template === undefined) {
      throw new Error('Incorrect order for apply inherit');
    }
    assetDerived.children.unshift({
      name: TAG_NAMES.Template,
      attributes: {},
      children: [],
      value: template,
    });

    const valuesDerived = assetDerived.children.find(c => c.name === TAG_NAMES.Values) as VElement;
    const valuesBase = assetBase.children.find(c => c.name === TAG_NAMES.Values) as VElement;
    inheritElement(valuesDerived, valuesBase);

    applyInherit(nodeDerived);
  });
}

export function inheritAssets(assets: VElement[]): void {
  buildNodes(assets).forEach(node => applyInherit(node));
}
