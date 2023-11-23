import type { Coords, ElementRects, MiddlewareData, ReferenceElement, Strategy } from '@floating-ui/dom';
import { POSITIONING_DEV_TOOLS } from './constants';

export type ContainerData = {
  type: 'container';
  options: object;
  initialPlacement: { position: string; alignment?: string };
  placement: { position: string; alignment?: string };
  strategy: Strategy;
  middlewareData: MiddlewareData;
  coords: Coords;
  rects: ElementRects;
  flipBoundariesAmount: number;
  overflowBoundariesAmount: number;
  scrollParentsAmount: number;
};

export type Data = ContainerData;

export type Refs = {
  container: HTMLElement;
  target: ReferenceElement;
  scrollParents: HTMLElement[];
  flipBoundaries: HTMLElement[];
  overflowBoundaries: HTMLElement[];
};

export type Element = {
  [POSITIONING_DEV_TOOLS]: {
    state: Data;
    refs: Refs;
  };
};

export type Container = {
  [POSITIONING_DEV_TOOLS]: {
    state: ContainerData;
    refs: Refs;
  };
};
