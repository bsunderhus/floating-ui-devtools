import type { Views as Views } from '../types';

const Modules = import.meta.glob<true, string, Partial<Views>>('./**/index.ts', {
  eager: true,
  import: 'components',
});

const views: Partial<Views> = Object.fromEntries(
  Object.values(Modules).flatMap(components => Object.entries(components)),
);

export default views;
