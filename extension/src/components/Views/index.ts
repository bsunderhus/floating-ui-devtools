import React from 'react';
import type { Serialized } from '@floating-ui-devtools/core';
import type { Data } from 'floating-ui-devtools';

export const LazyViews: Record<string, React.FC<Serialized<Data>>> = Object.fromEntries(
  Object.entries(
    import.meta.glob<false, string, { default: React.FC<Serialized<Data>> }>('./*.tsx', {
      eager: false,
    }),
  ).map(([path, LazyView]) => [path.replace(/\.\/(\w+)\.tsx/, '$1'), React.lazy(LazyView)]),
);
