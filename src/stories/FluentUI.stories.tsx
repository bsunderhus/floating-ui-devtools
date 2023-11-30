import { useFloating, useClick, useInteractions } from '@floating-ui/react';
import type { Meta } from '@storybook/react';
import { useState } from 'react';
import * as devtools from '../lib';
import { Serialized } from '../lib/utils/serialize';
import { generateReferenceId } from '../lib/utils/references';
import FluentUIMiddleware from '../components/Views/FluentUIMiddleware';
import { FluentProviderDecorator } from './decorators';

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

export const Panel = () => {
  const data: Serialized<devtools.FluentUI.MiddlewareData> = {
    type: 'FluentUIMiddleware',
    middlewareState: {
      elements: { floating: generateReferenceId(), reference: generateReferenceId() },
      x: 0,
      y: 0,
      strategy: 'absolute',
      rects: {
        floating: { x: 0, y: 0, width: 0, height: 0 },
        reference: { x: 0, y: 0, width: 0, height: 0 },
      },
      placement: 'bottom',
      initialPlacement: 'bottom-end',
      middlewareData: {},
    },
    flipBoundaries: [generateReferenceId()],
    scrollParents: [generateReferenceId()],
    overflowBoundaries: [generateReferenceId()],
    options: {},
    initialPlacement: { position: 'unknown', alignment: 'unknown' },
    placement: { position: 'unknown', alignment: 'unknown' },
  };

  return <FluentUIMiddleware {...data} />;
};

Panel.decorators = [FluentProviderDecorator];
