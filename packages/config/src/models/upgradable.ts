export interface Upgradable {
  /**
   * NextGUID
   */
  readonly next?: number;

  /**
   * <Upgradable>
   */
  readonly costs?: Record<number, number>;
}
