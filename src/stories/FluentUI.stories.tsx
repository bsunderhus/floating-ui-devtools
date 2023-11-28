import { useFloating, useClick, useInteractions } from '@floating-ui/react';
import type { Meta } from '@storybook/react';
import { useState } from 'react';
import * as devtools from '../lib';

export default {
  title: 'Fluent UI',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      devtools.middleware(document, state => ({
        type: 'FluentUIMiddleware',
        middlewareState: state,
        flipBoundaries: [],
        scrollParents: [document.body],
        overflowBoundaries: [],
        options: {},
        initialPlacement: { position: 'unknown', alignment: 'unknown' },
        placement: { position: 'unknown', alignment: 'unknown' },
      })),
    ],
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Reference element
      </button>
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
          Floating element
        </div>
      )}
    </>
  );
};
