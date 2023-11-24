import { getElementSerializedData, getElementRefs, isElement, isElementRef } from './methods';
import { Controller, Element } from './types';

export function createController(): Controller {
  let element: Element | null = null;
  const controller: Controller = {
    withdraw() {
      element = null;
    },
    select(selectedElement) {
      if (isElement(selectedElement)) {
        element = selectedElement;
      }
      if (element && isElementRef(element, selectedElement)) {
        return getElementSerializedData(element);
      }
      controller.withdraw();
      return null;
    },
    getReference(key) {
      return element ? getElementRefs(element).get(key) ?? null : null;
    },
  };
  return controller;
}
