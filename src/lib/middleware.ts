import type { Middleware, MiddlewareState } from '@floating-ui/dom';
import { injectController } from './utils/controller';
import { ELEMENT_METADATA } from './utils/constants';
import { serialize } from './utils/serialize';
import type { ElementMetadata } from './types';
import type { FloatingUI, MiddlewareData } from './data-types';

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
