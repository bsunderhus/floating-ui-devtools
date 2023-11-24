import { PdtElement } from './types';
import { PDT_ELEMENT_METADATA } from './constants';

export const isPDTElement = <E extends PdtElement>(element: unknown): element is E =>
  Boolean(typeof element === 'object' && element && PDT_ELEMENT_METADATA in element) &&
  Array.from<unknown>(getPdtElementRefs(element as E).values()).includes(element);

export const isPdtElementRef = (element: PdtElement, referredElement: unknown) =>
  Array.from<unknown>(getPdtElementRefs(element).values()).includes(referredElement);

export const getPdtElementRefs = <E extends PdtElement>(element: E): E[typeof PDT_ELEMENT_METADATA]['references'] =>
  element[PDT_ELEMENT_METADATA].references;

export const getPdtElementSerializedData = <E extends PdtElement>(
  element: E,
): E[typeof PDT_ELEMENT_METADATA]['serializedData'] => element[PDT_ELEMENT_METADATA].serializedData;

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
