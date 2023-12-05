import type { MiddlewareState } from '@floating-ui/dom';

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
