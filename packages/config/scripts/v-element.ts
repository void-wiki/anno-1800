export interface VElement {
  name: string;
  attributes: Record<string, string>;
  children: VElement[];
  value: string;
}
