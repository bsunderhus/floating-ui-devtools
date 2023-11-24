import { Middleware, MiddlewareArguments } from '@floating-ui/dom';
import { ElementMetadata, Refs } from './types';
import { CONTROLLER, ELEMENT_METADATA } from './constants';
import { createController } from './controller';
import { serialize } from './methods';

export const middleware = (
  targetDocument: Document,
  callback: (state: MiddlewareArguments) => { data: object; references: Refs },
): Middleware => {
  if (!targetDocument.defaultView) {
    return {
      name: 'positioningDevTools:idle',
      fn: () => ({}),
    };
  }
  if (!targetDocument.defaultView[CONTROLLER]) {
    targetDocument.defaultView[CONTROLLER] = createController();
  }
  return {
    name: 'positioningDevTools:active',
    fn: state => {
      const { data: payload, references } = callback(state);
      Object.assign<HTMLElement, ElementMetadata>(state.elements.floating, {
        [ELEMENT_METADATA]: {
          serializedData: serialize({ payload, referencesKeys: Array.from(references.keys()) }),
          references,
        },
      });
      return {};
    },
  };
};
