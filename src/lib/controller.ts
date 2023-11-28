import { CONTROLLER } from './constants';
import { getElementMetadata, isElementWithMetadata } from './methods';
import type { Controller } from './types';

export const createController = (): Controller => {
  const controller: Controller = {
    selectedElement: null,
    select: (selectedElement: HTMLElement | null) => {
      if (isElementWithMetadata(selectedElement)) {
        controller.selectedElement = selectedElement;
        return controller.selectedElement;
      }
      if (controller.selectedElement) {
        const metadata = getElementMetadata(controller.selectedElement);
        if (metadata.type === 'middleware' && Object.values<unknown>(metadata.references).includes(selectedElement)) {
          return controller.selectedElement;
        }
      }
      controller.withdraw();
      return controller.selectedElement;
    },
    withdraw: () => {
      controller.selectedElement = null;
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
