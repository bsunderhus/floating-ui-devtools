import type { MiddlewareState } from '@floating-ui/dom';

export type FluentUIMiddlewareData = {
  type: 'FluentUIMiddleware';
  options: object;
  middlewareState: MiddlewareState;
  placement: { position: string; alignment?: string };
  initialPlacement: { position: string; alignment?: string };
  flipBoundaries: HTMLElement[];
  overflowBoundaries: HTMLElement[];
  scrollParents: HTMLElement[];
};

export type FluentUITriggerData = {
  type: 'FluentUITrigger';
};
