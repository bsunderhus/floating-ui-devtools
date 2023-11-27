import { MiddlewareState } from '@floating-ui/core';
import { injectController } from './controller';
import { assignMetadata, serializable } from './methods';

export const middleware = (targetDocument: Document) => {
  return {
    name: 'positioningDevTools:active',
    fn: <State extends MiddlewareState>({ elements, platform, ...state }: State) => {
      injectController(targetDocument);
      assignMetadata(elements.floating, {
        type: 'middleware',
        serializedData: serializable({
          ...state,
          type: 'middleware',
          references: Object.keys(elements),
        }),
        references: { ...elements },
      });
      return {};
    },
  };
};
