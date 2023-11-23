import React from 'react';
import { useTheme } from '../hooks/useTheme';

import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { PdtDataProvider, usePdtDataContextValue } from '../contexts/PdtData';
import { SidePanel } from './SidePanel';

export const DevToolsShell: React.FC = props => {
  const { rootStyle, theme } = useTheme();
  const PdtDataContextValue = usePdtDataContextValue();

  return (
    <PdtDataProvider value={PdtDataContextValue}>
      <FluentProvider style={rootStyle} theme={theme === 'dark' ? webDarkTheme : webLightTheme}>
        {props.children}
        <SidePanel />
      </FluentProvider>
    </PdtDataProvider>
  );
};
