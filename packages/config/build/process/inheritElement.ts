/* eslint-disable prefer-destructuring */
import { VElement, pickValue } from '../v-element';
import { TAG_NAMES } from '../constants';

function clone<T>(source: T): T {
  return JSON.parse(JSON.stringify(source));
}

function removeListItem<T>(list: T[], item: T): void {
  const index = list.indexOf(item);
  if (index > -1) {
    list.splice(index, 1);
  }
}

function isList(elem: VElement): boolean {
  return elem.name !== TAG_NAMES.Item && elem.children.every(c => c.name === TAG_NAMES.Item);
}

export function inheritElement(elemDerived: VElement, elemBase: VElement): void {
  if (isList(elemDerived)) {
    elemDerived.children.forEach(itemDerived => {
      const vectorElement = itemDerived.children.find(c => c.name === TAG_NAMES.VectorElement);
      const inheritedIndex = vectorElement?.children.find(c => c.name === TAG_NAMES.InheritedIndex);
      if (!vectorElement || !inheritedIndex) {
        return;
      }
      const index = Number.parseInt(inheritedIndex.value, 10);
      const itemBase = elemBase.children[index] as VElement | undefined;
      if (itemBase) {
        removeListItem(elemDerived.children, vectorElement);
        inheritElement(itemDerived, itemBase);
      }
    });
    return;
  }

  elemBase.children.forEach(childBase => {
    const childDerived = elemDerived.children.find(c => c.name === childBase.name);
    if (!childDerived) {
      elemDerived.children.push(clone(childBase));
      return;
    }
    if (childDerived.children.length > 0) {
      if (childBase.children.length > 0) {
        inheritElement(childDerived, childBase);
      }
      return;
    }
    if (childDerived.value === '') {
      if (childBase.children.length > 0) {
        childDerived.children.push(...clone(childBase).children);
        return;
      }
      childDerived.value = childBase.value;
    }
  });
}
