import { useFloating, useClick, useInteractions } from '@floating-ui/react';
import type { Meta } from '@storybook/react';
import { useState } from 'react';
import * as devtools from 'floating-ui-devtools';
import { FloatingUIMiddleware } from '../components/Views/FloatingUIMiddleware';
import { Serialized } from '@floating-ui-devtools/core';
import { generateReferenceId } from '@floating-ui-devtools/core';
import { PanelDecorator } from './decorators';

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
    middleware: [devtools.middleware(document)],
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  return (
    <>
      {/* <button>before</button> */}
      <button ref={refs.setReference} {...getReferenceProps()}>
        Reference element
      </button>
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
          Floating element
        </div>
      )}
      {/* <button>after</button> */}
    </>
  );
};

export const Panel = () => {
  const data: Serialized<devtools.FloatingUI.MiddlewareData> = {
    elements: { floating: generateReferenceId(), reference: generateReferenceId() },
    x: 0,
    y: 0,
    type: 'FloatingUIMiddleware',
    strategy: 'absolute',
    rects: {
      floating: { x: 0, y: 0, width: 0, height: 0 },
      reference: { x: 0, y: 0, width: 0, height: 0 },
    },
    placement: 'bottom',
    initialPlacement: 'bottom-end',
    middlewareData: {},
  };

  return <FloatingUIMiddleware {...data} />;
};

Panel.decorators = [PanelDecorator];
