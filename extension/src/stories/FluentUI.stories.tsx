import type { Meta } from '@storybook/react';
import * as devtools from 'floating-ui-devtools';
import { Serialized, generateReferenceId } from '@floating-ui-devtools/core';
import FluentUIMiddleware from '../components/Views/FluentUIMiddleware';
import { PanelDecorator } from './decorators';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

export default {
  title: 'Fluent UI',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export const Default = () => (
  <Popover>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Open Popover</Button>
    </PopoverTrigger>

    <PopoverSurface tabIndex={-1}>
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);

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

Panel.decorators = [PanelDecorator];
