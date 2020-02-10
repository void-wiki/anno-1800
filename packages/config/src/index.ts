export * from './models';
export * from './manifest';

/**
 * Languages those have been exported
 */
export const LANGUAGES_EXPORTED = [
  'brazilian',
  'chinese',
  'english',
  'french',
  'german',
  'italian',
  'japanese',
  'korean',
  'polish',
  'portuguese',
  'russian',
  'spanish',
  'taiwanese',
] as const;

/**
 * Templates those have been exported
 */
export const TEMPLATE_EXPORTED = [
  'ResidenceBuilding7',
  'ResidenceBuilding7_Arctic',
  'PopulationLevel7',
] as const;
