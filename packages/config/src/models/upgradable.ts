export interface Upgradable {
  /**
   * NextGUID
   */
  next?: number;

  /**
   * <Upgradable>
   */
  costs?: Record<number, number>;
}
