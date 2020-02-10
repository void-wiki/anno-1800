import { Building } from './building';
import { Cost } from './const';
import { Upgradable } from './upgradable';
import { Residence7 } from './residence-7';
import { PopulationLevel7 } from './population-level-7';

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
  guid: number;

  /**
   * `InfoDescription` of `Standard` property
   */
  desc?: number;

  /**
   * `IconFilename` of `Standard` property
   */
  icon?: string;

  name?: string;
  id?: string;
  template?: string;

  building?: Building;
  cost?: Cost;
  upgradable?: Upgradable;

  residence7?: Residence7;
  populationLevel7?: PopulationLevel7;
}
