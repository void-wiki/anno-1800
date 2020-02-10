export interface Product {
  /**
   * ProductCategory
   */
  category?: number;

  /**
   * AssociatedRegion
   */
  regions?: string[];

  /**
   * CivLevel
   */
  civLevel?: number;

  /**
   * StorageLevel
   */
  storageLevel?: string;

  /**
   * ProductColor
   */
  color?: string; // color

  basePrice?: number;

  pathLayer?: string;
  deltaOnly?: boolean;
  isWorkforce?: boolean;
  isStrategicResource?: boolean;
  isAbstract?: boolean;
  canBeNegative?: boolean;
}
