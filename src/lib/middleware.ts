import type { Middleware, MiddlewareState } from '@floating-ui/dom';
import { injectController } from './controller';
import { ELEMENT_METADATA } from './utils/constants';
import { serialize } from './utils/serialize';
import type { Metadata } from './types';
import type { FloatingUI, MiddlewareData } from './data-types';

export const middleware = (
  targetDocument: Document,
  middlewareDataCallback: (state: MiddlewareState) => MiddlewareData = floatingUIMiddlewareDataCallback,
): Middleware => ({
  name: 'floating-ui-devtools',
  fn: (state: MiddlewareState) => {
    injectController(targetDocument);
    const [serializedData, references] = serialize(middlewareDataCallback(state));
    Object.assign<HTMLElement, { [ELEMENT_METADATA]: Metadata }>(state.elements.floating, {
      [ELEMENT_METADATA]: { references, serializedData, type: 'middleware' },
    });
    return {};
  },
});

const floatingUIMiddlewareDataCallback = (state: MiddlewareState): FloatingUI.MiddlewareData => ({
  ...state,
  type: 'FloatingUIMiddleware',
});
