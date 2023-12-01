import * as React from 'react';
import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { useTheme } from '../src/hooks/useTheme';

export const FluentDecorator = (Story: React.ElementType) => {
  const { rootStyle, theme } = useTheme();
  return (
    <FluentProvider style={rootStyle} theme={theme === 'default' ? webLightTheme : webDarkTheme}>
      <Story />
    </FluentProvider>
  );
};
