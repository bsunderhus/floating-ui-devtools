import React from 'react';
import { useTheme } from '../hooks/useTheme';

import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { PdtSerializedDataProvider, usePdtSerializedDataContextValue } from '../contexts/PdtSerializedData';
import { SidePanel } from './SidePanel';

export const DevToolsShell: React.FC = props => {
  const { rootStyle, theme } = useTheme();
  const serializedDataContextValue = usePdtSerializedDataContextValue();

  return (
    <PdtSerializedDataProvider value={serializedDataContextValue}>
      <FluentProvider style={rootStyle} theme={theme === 'dark' ? webDarkTheme : webLightTheme}>
        {props.children}
        <SidePanel />
      </FluentProvider>
    </PdtSerializedDataProvider>
  );
};
