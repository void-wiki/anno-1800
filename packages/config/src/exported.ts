import { Language, Template, Asset } from './models';
/**
 * Languages those have been exported
 */
export const LANGUAGES_EXPORTED: readonly Language[] = [
  'brazilian',
  'chinese',
  'english',
  'french',
  'german',
  'italian',
  'japanese',
  'korean',
  'polish',
  'portuguese',
  'russian',
  'spanish',
  'taiwanese',
];

/**
 * Templates those have been exported
 */
export const TEMPLATES_EXPORTED: readonly Template[] = [
  'ResidenceBuilding7',
  'ResidenceBuilding7_Arctic',
  'PopulationLevel7',

  'Product',
];

export interface AssetCollection {
  /**
   * The array contains all of assets.
   */
  readonly list: readonly Asset[];

  /**
   * The map contains all of assets, key is guid.
   */
  readonly map: {
    readonly [guid in number]?: Asset;
  };

  /**
   * The map contains assets which has id (programming id, not guid).
   */
  readonly idMap: {
    readonly [id in number]?: Asset;
  };

  /**
   * Map, key is template name.
   */
  readonly templateMap: {
    readonly [template in Template]?: readonly Asset[];
  };
}

/**
 * Process dist/assets.json after load
 */
export function postImport(assetsJson: Record<Template, Asset[]>): AssetCollection {
  const list: Asset[] = [];
  const map: Record<number, Asset> = {};
  const idMap: Record<string, Asset> = {};

  Object.entries(assetsJson).forEach(([template, assets]) =>
    assets.forEach(asset => {
      const { guid, id } = asset;
      // eslint-disable-next-line no-param-reassign,@typescript-eslint/no-explicit-any
      (asset as any).template = template;
      list.push(asset);
      map[guid] = asset;
      if (id !== undefined) {
        idMap[id] = asset;
      }
    }),
  );

  return {
    list,
    map,
    idMap,
    templateMap: assetsJson,
  };
}
