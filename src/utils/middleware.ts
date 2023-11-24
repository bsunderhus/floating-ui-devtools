import { Middleware, MiddlewareArguments } from '@floating-ui/dom';
import { PdtElementMetadata, PdtRefs } from './types';
import { PDT_CONTROLLER, PDT_ELEMENT_METADATA } from './constants';
import { createPdtController } from './controller';
import { serialize } from './methods';

export const pdtMiddleware = (
  targetDocument: Document,
  callback: (state: MiddlewareArguments) => { data: object; references: PdtRefs },
): Middleware => {
  if (!targetDocument.defaultView) {
    return {
      name: 'positioningDevTools:idle',
      fn: () => ({}),
    };
  }
  if (!targetDocument.defaultView[PDT_CONTROLLER]) {
    targetDocument.defaultView[PDT_CONTROLLER] = createPdtController();
  }
  return {
    name: 'positioningDevTools:active',
    fn: state => {
      const { data: payload, references } = callback(state);
      Object.assign<HTMLElement, PdtElementMetadata>(state.elements.floating, {
        [PDT_ELEMENT_METADATA]: {
          serializedData: serialize({ payload, referencesKeys: Array.from(references.keys()) }),
          references,
        },
      });
      return {};
    },
  };
};
