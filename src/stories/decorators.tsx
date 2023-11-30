import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { useTheme } from '../hooks/useTheme';

export const PanelDecorator = (Story: React.ElementType) => {
  const { rootStyle, theme } = useTheme();

  return (
    <FluentProvider
      style={{
        ...rootStyle,
        height: 500,
        width: 300,
        padding: 20,
        borderRadius: 20,
        overflow: 'auto',
        border: 'black dashed',
      }}
      theme={theme === 'dark' ? webDarkTheme : webLightTheme}
    >
      <Story />
    </FluentProvider>
  );
};

export const FluentDecorator = (Story: React.ElementType) => {
  const { rootStyle, theme } = useTheme();

  return (
    <FluentProvider
      style={{ ...rootStyle, alignItems: 'center' }}
      theme={theme === 'dark' ? webDarkTheme : webLightTheme}
    >
      <Story />
    </FluentProvider>
  );
};
