import type { CONTROLLER, ELEMENT_METADATA } from './utils/constants';
import type { References } from './utils/references';
import type { Controller } from './utils/controller';
import { Serialized } from './utils/serialize';
import { MiddlewareData, TriggerData } from './data-types';

export type Metadata =
  | { type: 'middleware'; serializedData: Serialized<MiddlewareData>; references: References }
  | { type: 'trigger'; serializedData: Serialized<TriggerData>; references: References };

export type ElementMetadata = {
  [ELEMENT_METADATA]: Metadata;
};

export type ElementWithMetadata = HTMLElement & ElementMetadata;

declare global {
  interface Window {
    [CONTROLLER]: Controller;
  }
}
