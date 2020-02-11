export interface PopulationInput {
  /**
   * Production GUID
   */
  readonly product?: number;

  readonly amount?: number; // float
  readonly supplyWeight?: number;
  readonly moneyValue?: number;
  readonly fullWeightPopulationCount?: number;
  readonly noWeightPopulationCount?: number;
}

export interface PopulationOutput {
  readonly product?: number;
  readonly amount?: number;
}

export interface PopulationLevel7 {
  readonly populationInputs?: PopulationInput[];
  readonly populationOutputs?: PopulationOutput[];

  readonly categoryIcon?: string;
  readonly moodText?: Record<string, number>;
}
