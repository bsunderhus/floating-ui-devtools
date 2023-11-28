import type { ElementMetadata, ElementWithMetadata, Metadata, References } from './types';
import { ELEMENT_METADATA, HTML_REFERENCE } from './constants';
import { isHTMLElement } from '@fluentui/react-utilities';

export const isElementWithMetadata = (element: unknown): element is ElementWithMetadata =>
  Boolean(typeof element === 'object' && element && ELEMENT_METADATA in element);

export const getElementMetadata = (element: ElementWithMetadata): Metadata => element?.[ELEMENT_METADATA];

export const assignMetadata = <O extends object>(object: O, metadata: Metadata): O & ElementMetadata =>
  Object.assign<O, ElementMetadata>(object, { [ELEMENT_METADATA]: metadata });

/**
 * Ensures a value is serialized,
 * by only allowing simple objects/array
 * or objects who complies the `toString` signature
 */
export const serializable = <O extends object>(object: O): { serializedData: O; references: References } => {
  const references: HTMLElement[] = [];
  const serializedData: O = JSON.parse(
    JSON.stringify(object, (_, value) => {
      // gather reference to all html elements
      if (isHTMLElement(value)) {
        const index = references.push(value) - 1;
        return `${HTML_REFERENCE}${index}`;
      }
      if (
        typeof value === 'object' &&
        value &&
        Object.getPrototypeOf(value) !== Object.prototype &&
        Object.getPrototypeOf(value) !== Array.prototype
      ) {
        if ('toString' in value) {
          return value.toString();
        }
        return undefined;
      }
      return value;
    }),
  );
  return {
    references: references.reduce((acc, element, index) => ({ ...acc, [index]: element }), {}),
    serializedData: {
      ...serializedData,
      references: references.map((_, index) => String(index)),
    },
  };
};
