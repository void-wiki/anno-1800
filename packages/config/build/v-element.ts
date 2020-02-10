export interface VElement {
  name: string;
  attributes: Record<string, string>;
  children: VElement[];
  value: string;
}

export function pick<T>(
  elem: VElement,
  childName: string,
  valuePicker: (childElem: VElement) => T,
): T | undefined {
  const child = elem.children.find(c => c.name === childName);
  if (child) {
    return valuePicker(child);
  }
  return undefined;
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

  // hex color
  hex: string;
  'hex[]': string[];
}

function convertToBoolean(text: string | undefined): boolean {
  if (text === undefined) {
    return false;
  }
  switch (text.toLowerCase()) {
    case 'true':
    case '1':
      return true;

    case 'false':
    case '0':
    case '':
    default:
      return false;
  }
}

function convertToNumber(text: string | undefined): number | undefined {
  if (text === undefined || text === '') {
    return undefined;
  }
  return +text;
}

function convertToInt(text: string | undefined): number | undefined {
  if (text === undefined || text === '') {
    return undefined;
  }
  return Number.parseInt(text, 10);
}

function convertToFloat(text: string | undefined): number | undefined {
  if (text === undefined || text === '') {
    return undefined;
  }
  return Number.parseFloat(text);
}

/**
 * Convert a decimal number text to hex color (format: `aarrggbb`)
 */
function convertToHex(text: string | undefined): string | undefined {
  if (text === undefined || text === '') {
    return undefined;
  }
  // eslint-disable-next-line no-bitwise
  return (Number.parseInt(text, 10) >>> 0).toString(16);
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
  const text = elem.children.find(c => c.name === childName)?.value;
  if (text === undefined || text === '') {
    return defaultValue;
  }
  switch (type) {
    case 'boolean':
      return convertToBoolean(text) as PickTypeMap[K];
    case 'boolean[]':
      return text.split(';').map(i => convertToBoolean(i)) as PickTypeMap[K];

    case 'string':
      return text as PickTypeMap[K];
    case 'string[]':
      return text.split(';') as PickTypeMap[K];

    case 'number':
      return convertToNumber(text) as PickTypeMap[K];
    case 'number[]':
      return text.split(';').map(i => convertToNumber(i)) as PickTypeMap[K];

    case 'int':
      return convertToInt(text) as PickTypeMap[K];
    case 'int[]':
      return text.split(';').map(i => convertToInt(i)) as PickTypeMap[K];

    case 'float':
      return convertToFloat(text) as PickTypeMap[K];
    case 'float[]':
      return text.split(';').map(i => convertToFloat(i)) as PickTypeMap[K];

    case 'hex':
      return convertToHex(text) as PickTypeMap[K];
    case 'hex[]':
      return text.split(';').map(i => convertToHex(i)) as PickTypeMap[K];

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
