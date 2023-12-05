import { CONTROLLER, ELEMENT_METADATA, References, Serialized } from '@floating-ui-devtools/core';
import type { Controller } from './controller';
import type { MiddlewareData, TriggerData } from './data-types';

type MetadataType<Type extends string, Data extends object> = {
  type: Type;
  serializedData: Serialized<Data>;
  references: References;
};

export type Metadata = MetadataType<'middleware', MiddlewareData> | MetadataType<'trigger', TriggerData>;

export interface HTMLElementWithMetadata extends HTMLElement {
  [ELEMENT_METADATA]: Metadata;
}

declare global {
  interface Window {
    [CONTROLLER]: Controller;
  }
}
