import type { MiddlewareState } from '@floating-ui/dom';

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
