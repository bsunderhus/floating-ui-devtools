import type { Middleware, MiddlewareState } from '@floating-ui/dom';
import { injectController } from './controller';
import { serialize } from './methods';
import type { ElementMetadata, FloatingUI, MiddlewareData } from './types';
import { ELEMENT_METADATA } from './constants';

export const middleware = (
  targetDocument: Document,
  middlewareDataCallback: (state: MiddlewareState) => MiddlewareData = floatingUIMiddlewareDataCallback,
): Middleware => ({
  name: 'floating-ui-devtools',
  fn: (state: MiddlewareState) => {
    injectController(targetDocument);
    const [serializedData, references] = serialize(middlewareDataCallback(state));
    Object.assign<HTMLElement, ElementMetadata>(state.elements.floating, {
      [ELEMENT_METADATA]: { references, serializedData, type: 'middleware' },
    });
    return {};
  },
});

const floatingUIMiddlewareDataCallback = (state: MiddlewareState): FloatingUI.MiddlewareData => ({
  ...state,
  type: 'FloatingUIMiddleware',
});
