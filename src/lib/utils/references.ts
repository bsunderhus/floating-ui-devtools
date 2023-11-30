import { HTML_ELEMENT_REFERENCE } from './constants';

export type References = {
  add: (element: HTMLElement) => ReferenceId;
  get: (id: ReferenceId) => HTMLElement | undefined;
  has: (element: HTMLElement) => boolean;
};

export type ReferenceId = `${typeof HTML_ELEMENT_REFERENCE}:${ReturnType<typeof crypto.randomUUID>}`;

export const generateReferenceId = (): ReferenceId => {
  return `${HTML_ELEMENT_REFERENCE}:${crypto.randomUUID()}`;
};

export const createReferences = (): References => {
  const weakSet = new WeakSet<HTMLElement>();
  const map = new Map<ReferenceId, HTMLElement>();
  const references: References = {
    add: element => {
      const id: ReferenceId = generateReferenceId();
      map.set(id, element);
      weakSet.add(element);
      return id;
    },
    get: id => {
      const element = map.get(id);
      if (element && weakSet.has(element)) {
        return element;
      }
    },
    has: element => {
      return weakSet.has(element);
    },
  };
  return references;
};
