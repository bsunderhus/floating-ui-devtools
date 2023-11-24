import { useFloating, useClick, useInteractions } from '@floating-ui/react';
import type { Meta } from '@storybook/react';
import { useState } from 'react';
import * as devtools from '../lib';

export default {
  title: 'Floating UI',
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
      devtools.middleware(document, ({ elements, ...data }) => {
        return {
          data,
          references: {
            floating: elements.floating,
            reference: elements.reference,
          },
        };
      }),
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
