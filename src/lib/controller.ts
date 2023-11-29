import { CONTROLLER } from './constants';
import { getElementMetadata, isElementWithMetadata } from './methods';
import type { Controller, ElementWithMetadata, Metadata } from './types';

export const createController = (): Controller => {
  let selectedElement: ElementWithMetadata | null = null;
  const controller: Controller = {
    get selectedElement() {
      return selectedElement;
    },
    select: (nextSelectedElement: HTMLElement | null) => {
      if (isElementWithMetadata(nextSelectedElement)) {
        selectedElement = nextSelectedElement;
        return selectedElement;
      }
      if (selectedElement && nextSelectedElement) {
        const metadata = getElementMetadata(selectedElement);
        if (isSelectedElementValid(metadata, nextSelectedElement)) {
          return selectedElement;
        }
      }
      controller.withdraw();
      return selectedElement;
    },
    withdraw: () => {
      selectedElement = null;
    },
  };
  return controller;
};

export const injectController = (targetDocument: Document) => {
  if (!targetDocument.defaultView) {
    return;
  }
  if (!targetDocument.defaultView[CONTROLLER]) {
    targetDocument.defaultView[CONTROLLER] = createController();
  }
};

export function isSelectedElementValid(metadata: Metadata, selectedElement: HTMLElement): boolean {
  if (metadata.type === 'middleware') {
    return Object.values<unknown>(metadata.references).includes(selectedElement);
  }
  return false;
}
