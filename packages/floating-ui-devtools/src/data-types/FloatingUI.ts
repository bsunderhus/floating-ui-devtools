import type { MiddlewareState } from '@floating-ui/dom';

export type MiddlewareData = Omit<MiddlewareState, 'platform'> & {
  type: 'FloatingUIMiddleware';
};
