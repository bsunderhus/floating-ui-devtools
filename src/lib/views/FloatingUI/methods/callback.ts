import { MiddlewareState } from '@floating-ui/dom';
import type { FloatingUIMiddlewareData } from '../types';

export const middlewareDataCallback = (state: MiddlewareState): FloatingUIMiddlewareData => ({
  ...state,
  type: 'FloatingUIMiddleware',
});
