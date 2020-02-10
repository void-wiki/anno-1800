export interface PopulationInput {
  /**
   * Production GUID
   */
  product?: number;

  amount?: number; // float
  supplyWeight?: number;
  moneyValue?: number;
  fullWeightPopulationCount?: number;
  noWeightPopulationCount?: number;
}

export interface PopulationOutput {
  product?: number;
  amount?: number;
}

export interface PopulationLevel7 {
  populationInputs?: PopulationInput[];
  populationOutputs?: PopulationOutput[];

  categoryIcon?: string;
  moodText?: Record<string, number>;
}
