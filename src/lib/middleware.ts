import { Middleware, MiddlewareArguments } from '@floating-ui/dom';
import { ElementMetadata, Refs } from './types';
import { CONTROLLER, ELEMENT_METADATA } from './constants';
import { createController } from './controller';
import { serialize } from './methods';

export const middleware = (targetDocument: Document, callback = defaultCallback): Middleware => {
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
          serializedData: serialize({ payload, referencesKeys: Object.keys(references) }),
          references,
        },
      });
      return {};
    },
  };
};

const defaultCallback = (state: MiddlewareArguments): { data: object; references: Refs } => {
  const { elements, ...data } = state;
  return {
    data,
    references: {
      floating: elements.floating,
      reference: elements.reference,
    },
  };
};
