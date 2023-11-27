import { ReferenceElement } from '@floating-ui/dom';
import { CONTROLLER, ELEMENT_METADATA } from './constants';

export type Metadata =
  | {
      type: undefined;
      serializedData: { type: undefined };
    }
  | {
      type: 'middleware';
      serializedData: { type: 'middleware'; references: string[] };
      references: Record<string, ReferenceElement>;
    };

export type ElementMetadata = { [ELEMENT_METADATA]: Metadata };

export type ElementWithMetadata = HTMLElement & ElementMetadata;

export type Controller = {
  withdraw(): void;
  select(element?: HTMLElement | null): ElementWithMetadata | null;
  selectedElement: ElementWithMetadata | null;
};

declare global {
  interface Window {
    [CONTROLLER]: Controller;
  }
}
