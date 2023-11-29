import { CONTROLLER, ELEMENT_METADATA } from './constants';
import type { ElementWithMetadata, Metadata } from '../types';

export type Controller = {
  withdraw(): void;
  select(element?: HTMLElement | null): ElementWithMetadata | null;
  readonly selectedElement: ElementWithMetadata | null;
};

const isElementWithMetadata = (element: unknown): element is ElementWithMetadata =>
  Boolean(typeof element === 'object' && element && ELEMENT_METADATA in element);

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
        const metadata = selectedElement[ELEMENT_METADATA];
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
    return metadata.references.has(selectedElement);
  }
  return false;
}
