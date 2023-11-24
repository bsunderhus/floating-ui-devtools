import { PDT_CONTROLLER, PDT_ELEMENT_METADATA } from './constants';

export type PdtRefs<Key extends string = string> = Map<Key, HTMLElement>;

export type PdtElement = HTMLElement & PdtElementMetadata;

/**
 * This has to be serializable
 */
export type PdtSerializedData = { payload: object; referencesKeys: string[] };

export type PdtElementMetadata = {
  [PDT_ELEMENT_METADATA]: {
    serializedData: PdtSerializedData;
    references: PdtRefs;
  };
};

export type PdtController<Key extends string = string> = {
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
  select(element?: HTMLElement | null): PdtSerializedData | null;
};

declare global {
  interface Window {
    [PDT_CONTROLLER]: PdtController;
  }
}
