export interface VElement {
  name: string;
  attributes: Record<string, string>;
  children: VElement[];
  value: string;
}

export interface PickTypeMap {
  boolean: boolean;
  'boolean[]': boolean[];

  string: string;
  'string[]': string[];

  number: number;
  'number[]': number[];

  int: number;
  'int[]': number[];

  float: number;
  'float[]': number[];
}

export function pickValue<K extends keyof PickTypeMap>(
  elem: VElement,
  childName: string,
  type: K,
): PickTypeMap[K] | undefined;
export function pickValue<K extends keyof PickTypeMap>(
  elem: VElement,
  childName: string,
  type: K,
  defaultValue: PickTypeMap[K],
): PickTypeMap[K];

// eslint-disable-next-line complexity
export function pickValue<K extends keyof PickTypeMap>(
  elem: VElement,
  childName: string,
  type: K,
  defaultValue?: PickTypeMap[K],
): PickTypeMap[K] | undefined {
  const rawValue = elem.children.find(c => c.name === childName)?.value;
  if (rawValue === undefined || rawValue === '') {
    return defaultValue;
  }
  switch (type) {
    case 'boolean':
      return (rawValue.toLowerCase() === 'true') as PickTypeMap[K];
    case 'boolean[]':
      return rawValue.split(';').map(i => i.toLowerCase() === 'true') as PickTypeMap[K];

    case 'string':
      return rawValue as PickTypeMap[K];
    case 'string[]':
      return rawValue.split(';') as PickTypeMap[K];

    case 'number':
      return +rawValue as PickTypeMap[K];
    case 'number[]':
      return rawValue.split(';').map(i => +i) as PickTypeMap[K];

    case 'int':
      return Number.parseInt(rawValue, 10) as PickTypeMap[K];
    case 'int[]':
      return rawValue.split(';').map(i => Number.parseInt(i, 10)) as PickTypeMap[K];

    case 'float':
      return Number.parseFloat(rawValue) as PickTypeMap[K];
    case 'float[]':
      return rawValue.split(';').map(i => Number.parseFloat(i)) as PickTypeMap[K];

    default:
      return undefined;
  }
}
