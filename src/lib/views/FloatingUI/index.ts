import type { Views } from '../../types';
import { lazy } from 'react';

export const components = {
  FloatingUIMiddleware: lazy(() => import('./components/FloatingUIMiddleware')),
} satisfies Partial<Views>;

export * from './types';
export * from './methods/callback';
