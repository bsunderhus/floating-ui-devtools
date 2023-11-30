import type { MiddlewareState } from '@floating-ui/dom';

export namespace FloatingUI {
  export type MiddlewareData = Omit<MiddlewareState, 'platform'> & {
    type: 'FloatingUIMiddleware';
  };
}

export namespace FluentUI {
  export type MiddlewareData = {
    type: 'FluentUIMiddleware';
    options: object;
    middlewareState: Omit<MiddlewareState, 'platform'>;
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
