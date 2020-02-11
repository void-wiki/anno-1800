import { Template } from './template';

import { Building } from './building';
import { Cost } from './const';
import { Upgradable } from './upgradable';

import { Residence7 } from './residence-7';
import { PopulationLevel7 } from './population-level-7';

import { Product } from './product';

/**
 * Anno 1800 Base Asset Type.
 *
 *```xml
 *<Asset>
 *  <Template>ResidenceBuilding7</Template>
 *  <Standard>
 *    <GUID>1010343</GUID>
 *    <Name>residence_tier01</Name>
 *    <IconFilename>data/ui/2kimages/main/3dicons/icon_resident.png</IconFilename>
 *    <InfoDescription>163059</InfoDescription>
 *  </Standard>
 *</Asset>
 * ```
 */
export interface Asset {
  readonly template: Template;
  readonly guid: number;

  /**
   * `InfoDescription` of `Standard` property
   */
  readonly desc?: number;

  /**
   * `IconFilename` of `Standard` property
   */
  readonly icon?: string;

  /**
   * Debug name (being removed for production)
   */
  readonly name?: string;

  /**
   * Programming ID
   */
  readonly id?: string;

  readonly building?: Building;
  readonly cost?: Cost;
  readonly upgradable?: Upgradable;

  readonly residence7?: Residence7;
  readonly populationLevel7?: PopulationLevel7;

  readonly product?: Product;
}
