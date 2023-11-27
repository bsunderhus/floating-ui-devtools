import { ElementMetadata, ElementWithMetadata, Metadata } from './types';
import { ELEMENT_METADATA } from './constants';

export const isElementWithMetadata = (element: unknown): element is ElementWithMetadata =>
  Boolean(typeof element === 'object' && element && ELEMENT_METADATA in element);

export const getElementMetadata = (element: ElementWithMetadata): Metadata => element?.[ELEMENT_METADATA];

export const assignMetadata = <O extends object>(object: O, metadata: Metadata): O & ElementMetadata =>
  Object.assign<O, ElementMetadata>(object, {
    [ELEMENT_METADATA]: metadata,
  });

/**
 * Ensures a value is serialized,
 * by only allowing simple objects/array
 * or objects who complies the `toString` signature
 */
export const serializable = <O extends object>(object: O): O =>
  JSON.parse(
    JSON.stringify(object, (_, value) => {
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
