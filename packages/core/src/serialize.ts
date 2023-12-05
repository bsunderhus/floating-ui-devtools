import { isHTMLElement } from '@fluentui/react-utilities';
import { ReferenceId, References, createReferences } from './references';
import type { ReferenceElement } from '@floating-ui/dom';

export type Serialized<T> = T extends (infer R)[]
  ? Serialized<R>[]
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any[]) => any
  ? never
  : T extends ReferenceElement
  ? ReferenceId
  : T extends object
  ? { [P in keyof T]: Serialized<T[P]> }
  : T;

export const serialize = <Data extends object>(
  data: Data,
): [serializedData: Serialized<Data>, references: References] => {
  const references = createReferences();
  const serializedData: Serialized<Data> = JSON.parse(
    JSON.stringify(data, (_, value) => {
      if (isHTMLElement(value)) {
        return references.add(value);
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
  return [serializedData, references];
};
