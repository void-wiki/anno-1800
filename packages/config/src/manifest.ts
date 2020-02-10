export interface ManifestI18n {
  guidAmount: number;
  languagesExported: string[];
}

export interface ManifestAssets {
  guidAmount: number;
  templatesExported: string[];
  guidAmountEachTemplate: Record<string, number>;
}
