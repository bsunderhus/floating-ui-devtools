import { getElementSerializedData, getElementRefs, isElement, isElementRef } from './methods';
import { Controller, Element } from './types';
import { isHTMLElement } from '@fluentui/react-utilities';

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
      const reference = element && getElementRefs(element)[key];
      return isHTMLElement(reference) ? reference : null;
    },
  };
  return controller;
}
