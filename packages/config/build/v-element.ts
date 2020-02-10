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

export function pickMap<K extends keyof PickTypeMap>(
  elem: VElement,
  mapName: string,
  valuePicker: (itemElem: VElement) => PickTypeMap[K] | undefined,
): Record<string, PickTypeMap[K]> | undefined {
  const entries = elem.children
    .find(c => c.name === mapName)
    ?.children.map<[string, PickTypeMap[K] | undefined]>(item => [item.name, valuePicker(item)])
    .filter((kvp): kvp is [string, PickTypeMap[K]] => kvp[1] !== undefined);
  if (entries && entries.length > 0) {
    return Object.fromEntries(entries);
  }
  return undefined;
}

export function pickListToMap<
  TKey extends Extract<keyof PickTypeMap, 'string' | 'int'>,
  TValue extends keyof PickTypeMap
>(
  elem: VElement,
  listName: string,
  keyPicker: (itemElem: VElement) => PickTypeMap[TKey] | undefined,
  valuePicker: (itemElem: VElement) => PickTypeMap[TValue] | undefined,
): Record<PickTypeMap[TKey], PickTypeMap[TValue]> | undefined {
  const entries = elem.children
    .find(c => c.name === listName)
    ?.children.map<[PickTypeMap[TKey] | undefined, PickTypeMap[TValue] | undefined]>(item => [
      keyPicker(item),
      valuePicker(item),
    ])
    .filter<[PickTypeMap[TKey], PickTypeMap[TValue]]>(
      (kvp): kvp is [PickTypeMap[TKey], PickTypeMap[TValue]] =>
        kvp[0] !== undefined && kvp[1] !== undefined,
    );

  if (entries && entries.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.fromEntries(entries) as any;
  }

  return undefined;
}
