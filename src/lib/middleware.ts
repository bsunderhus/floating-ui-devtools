import type { Middleware, MiddlewareState } from '@floating-ui/dom';
import { injectController } from './controller';
import { assignMetadata, serializable } from './methods';
import { MiddlewareData } from './types';
import { middlewareDataCallback as floatingUIMiddlewareDataCallback } from './views/FloatingUI/methods/callback';

export const middleware = (
  targetDocument: Document,
  middlewareDataCallback: (state: MiddlewareState) => MiddlewareData = floatingUIMiddlewareDataCallback,
): Middleware => ({
  name: 'floating-ui-devtools',
  fn: (state: MiddlewareState) => {
    injectController(targetDocument);
    assignMetadata(state.elements.floating, {
      type: 'middleware',
      ...serializable(middlewareDataCallback(state)),
    });
    return {};
  },
});
