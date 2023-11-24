import { Element } from './types';
import { ELEMENT_METADATA } from './constants';

export const isElement = <E extends Element>(element: unknown): element is E =>
  Boolean(typeof element === 'object' && element && ELEMENT_METADATA in element) &&
  Object.values<unknown>(getElementRefs(element as E)).includes(element);

export const isElementRef = (element: Element, referredElement: unknown) =>
  Object.values<unknown>(getElementRefs(element)).includes(referredElement);

export const getElementRefs = <E extends Element>(element: E): E[typeof ELEMENT_METADATA]['references'] =>
  element[ELEMENT_METADATA].references;

export const getElementSerializedData = <E extends Element>(element: E): E[typeof ELEMENT_METADATA]['serializedData'] =>
  element[ELEMENT_METADATA].serializedData;

/**
 * Ensures a value is serialized,
 * by only allowing simple objects/array
 * or objects who complies the `toString` signature
 */
export const serialize = <V>(value: V): V =>
  JSON.parse(
    JSON.stringify(value, (_, subValue) => {
      if (
        typeof subValue === 'object' &&
        subValue &&
        Object.getPrototypeOf(subValue) !== Object.prototype &&
        Object.getPrototypeOf(subValue) !== Array.prototype
      ) {
        if ('toString' in subValue) {
          return subValue.toString();
        }
        return undefined;
      }
      return subValue;
    }),
  );
