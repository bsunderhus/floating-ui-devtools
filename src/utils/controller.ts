import { getPdtElementSerializedData, getPdtElementRefs, isPDTElement, isPdtElementRef } from './methods';
import { PdtController, PdtElement } from './types';

export function createPdtController(): PdtController {
  let element: PdtElement | null = null;
  const controller: PdtController = {
    withdraw() {
      element = null;
    },
    select(selectedElement) {
      if (isPDTElement(selectedElement)) {
        element = selectedElement;
      }
      if (element && isPdtElementRef(element, selectedElement)) {
        return getPdtElementSerializedData(element);
      }
      controller.withdraw();
      return null;
    },
    getReference(key) {
      return element ? getPdtElementRefs(element).get(key) ?? null : null;
    },
  };
  return controller;
}
