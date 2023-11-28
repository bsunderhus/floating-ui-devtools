import type { Views } from '../../types';
import { lazy } from 'react';

export const components = {
  FluentUIMiddleware: lazy(() => import('./components/FluentUIMiddleware')),
} satisfies Partial<Views>;

export * from './types';
