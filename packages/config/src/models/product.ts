export interface Product {
  /**
   * ProductCategory
   */
  readonly category?: number;

  /**
   * AssociatedRegion
   */
  readonly regions?: string[];

  /**
   * CivLevel
   */
  readonly civLevel?: number;

  /**
   * StorageLevel
   */
  readonly storageLevel?: string;

  /**
   * ProductColor
   */
  readonly color?: string; // color

  readonly basePrice?: number;

  readonly pathLayer?: string;
  readonly deltaOnly?: boolean;
  readonly isWorkforce?: boolean;
  readonly isStrategicResource?: boolean;
  readonly isAbstract?: boolean;
  readonly canBeNegative?: boolean;
}
