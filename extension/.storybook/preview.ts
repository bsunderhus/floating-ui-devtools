import type { Preview } from '@storybook/react';
import { FluentDecorator } from './decorators';

const preview: Preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
  },
  decorators: [FluentDecorator],
};

export default preview;
