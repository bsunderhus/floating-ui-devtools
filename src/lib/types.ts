import { ReferenceElement } from '@floating-ui/core';
import { CONTROLLER, ELEMENT_METADATA } from './constants';
import { FloatingUIMiddlewareData } from './views/FloatingUI';
import { FluentUIMiddlewareData, FluentUITriggerData } from './views/FluentUI';

export type References = Record<string, ReferenceElement>;

export type Metadata =
  | { type: 'middleware'; serializedData: MiddlewareData; references: References }
  | { type: 'trigger'; serializedData: TriggerData; references: References };

export type ElementMetadata = { [ELEMENT_METADATA]: Metadata };

export type ElementWithMetadata = HTMLElement & ElementMetadata;

export type MiddlewareData = FloatingUIMiddlewareData | FluentUIMiddlewareData;
export type TriggerData = FluentUITriggerData;
export type Data = MiddlewareData | TriggerData;

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

export type Views = { [T in Data['type']]: React.ElementType<Extract<Data, { type: T }>> };
