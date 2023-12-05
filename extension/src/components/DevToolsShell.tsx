import React from 'react';
import { useTheme } from '../hooks/useTheme';

import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { SerializedDataProvider, useSerializedDataContextValue } from '../contexts/SerializedData';
import { SidePanel } from './SidePanel';

export const DevToolsShell: React.FC = props => {
  const { rootStyle, theme } = useTheme();
  const serializedDataContextValue = useSerializedDataContextValue();

  return (
    <SerializedDataProvider value={serializedDataContextValue}>
      <FluentProvider style={rootStyle} theme={theme === 'dark' ? webDarkTheme : webLightTheme}>
        {props.children}
        <SidePanel />
      </FluentProvider>
    </SerializedDataProvider>
  );
};
