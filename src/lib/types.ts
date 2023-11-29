import type { CONTROLLER, ELEMENT_METADATA, HTML_ELEMENT_REFERENCE } from './constants';
import type { MiddlewareState, ReferenceElement } from '@floating-ui/dom';

export type Serialized<T> = T extends (infer R)[]
  ? Serialized<R>[]
  : T extends Function
  ? never
  : T extends ReferenceElement
  ? Reference
  : T extends object
  ? { [P in keyof T]: Serialized<T[P]> }
  : T;

export type References = Record<string, Reference>;
export type Reference = `${typeof HTML_ELEMENT_REFERENCE}${string}`;

export type Metadata =
  | { type: 'middleware'; serializedData: Serialized<MiddlewareData>; references: References }
  | { type: 'trigger'; serializedData: Serialized<TriggerData>; references: References };

export type ElementMetadata = {
  [ELEMENT_METADATA]: Metadata;
};

export type ElementWithMetadata = HTMLElement & ElementMetadata;

export type Controller = {
  withdraw(): void;
  select(element?: HTMLElement | null): ElementWithMetadata | null;
  readonly selectedElement: ElementWithMetadata | null;
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
