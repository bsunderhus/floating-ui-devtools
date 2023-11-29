import type { ElementWithMetadata, Metadata, References, Serialized } from './types';
import { ELEMENT_METADATA, HTML_ELEMENT_REFERENCE } from './constants';
import { isHTMLElement } from '@fluentui/react-utilities';

export const isElementWithMetadata = (element: unknown): element is ElementWithMetadata =>
  Boolean(typeof element === 'object' && element && ELEMENT_METADATA in element);

export const getElementMetadata = (element: ElementWithMetadata): Metadata => element[ELEMENT_METADATA];

export const serialize = <Data extends object>(
  data: Data,
): [serializedData: Serialized<Data>, references: References] => {
  const referencesArray: HTMLElement[] = [];
  const serializedData: Serialized<Data> = JSON.parse(
    JSON.stringify(data, (_, value) => {
      // gather reference to all html elements
      if (isHTMLElement(value)) {
        const index = referencesArray.push(value) - 1;
        return `${HTML_ELEMENT_REFERENCE}${index}`;
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
  const references = referencesArray.reduce<References>((acc, element, index) => ({ ...acc, [index]: element }), {});
  return [serializedData, references];
};
