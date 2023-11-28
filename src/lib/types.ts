import type { CONTROLLER, ELEMENT_METADATA } from './constants';
import type { MiddlewareState } from '@floating-ui/dom';

export type References = Record<string, HTMLElement>;

export type Metadata =
  | { type: 'middleware'; serializedData: MiddlewareData; references: References }
  | { type: 'trigger'; serializedData: TriggerData; references: References };

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
export namespace FloatingUI {
  export type MiddlewareData = MiddlewareState & {
    type: 'FloatingUIMiddleware';
  };
}

export namespace FluentUI {
  export type MiddlewareData = {
    type: 'FluentUIMiddleware';
    options: object;
    middlewareState: MiddlewareState;
    placement: { position: string; alignment?: string };
    initialPlacement: { position: string; alignment?: string };
    flipBoundaries: HTMLElement[];
    overflowBoundaries: HTMLElement[];
    scrollParents: HTMLElement[];
  };

  export type TriggerData = {
    type: 'FluentUITrigger';
  };
}

export type MiddlewareData = FloatingUI.MiddlewareData | FluentUI.MiddlewareData;
export type TriggerData = FluentUI.TriggerData;
export type Data = MiddlewareData | TriggerData;
