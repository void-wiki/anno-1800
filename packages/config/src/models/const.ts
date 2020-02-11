export interface Cost {
  readonly costs?: Record<number, number>;
  readonly influenceCostType?: string;
  readonly influenceCostPoints?: number;
}
