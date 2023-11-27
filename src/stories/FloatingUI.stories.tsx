import { useFloating, useClick, useInteractions, Middleware } from '@floating-ui/react';
import type { Meta } from '@storybook/react';
import { useState } from 'react';
import * as devtools from '../lib';

export default {
  title: 'Floating UI',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

const customMiddleware: Middleware = {
  name: 'custom',
  fn: state =>
    devtools.middleware(document).fn({
      ...state,
      someCustomInfo: 'this is some custom serializable info',
      elements: { ...state.elements, body: document.body },
    }),
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [customMiddleware],
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
