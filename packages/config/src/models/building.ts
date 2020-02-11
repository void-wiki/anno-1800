export interface Building {
  /**
   * BuildingType
   */
  readonly type?: string;

  /**
   * BuildingCategoryName
   */
  readonly category?: number;

  /**
   * TerrainType
   */
  readonly terrain?: string;

  /**
   * AssociatedRegions
   */
  readonly regions?: string[];

  /**
   * PickingAsset
   */
  readonly pickingAsset?: number;
}
