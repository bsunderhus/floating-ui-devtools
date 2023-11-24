import { ReferenceElement } from '@floating-ui/dom';
import { CONTROLLER, ELEMENT_METADATA } from './constants';

export type Refs<Key extends string = string> = Record<Key, ReferenceElement>;

export type Element = HTMLElement & ElementMetadata;

/**
 * This has to be serializable
 */
export type SerializedData = { payload: object; referencesKeys: string[] };

export type ElementMetadata = {
  [ELEMENT_METADATA]: {
    serializedData: SerializedData;
    references: Refs;
  };
};

export type Controller<Key extends string = string> = {
  getReference(key: Key): HTMLElement | null;
  withdraw(): void;
  /**
   * sets the current inspected element.
   * 1. if the element is a floating container a reference to that element will be preserved.
   * 2. if the element is a valid reference then return container's data
   * 3. if the element is not a valid reference then withdraw reference and return null
   *
   * @param element element that was selected
   */
  select(element?: HTMLElement | null): SerializedData | null;
};

declare global {
  interface Window {
    [CONTROLLER]: Controller;
  }
}
