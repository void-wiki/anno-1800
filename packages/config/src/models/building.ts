export interface Building {
  /**
   * BuildingType
   */
  type?: string;

  /**
   * BuildingCategoryName
   */
  category?: number;

  /**
   * TerrainType
   */
  terrain?: string;

  /**
   * AssociatedRegions
   */
  regions?: string[];

  /**
   * PickingAsset
   */
  pickingAsset?: number;
}
