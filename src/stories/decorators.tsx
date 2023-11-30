import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { useTheme } from '../hooks/useTheme';

export const FluentProviderDecorator = (Story: React.ElementType) => {
  const { rootStyle, theme } = useTheme();

  return (
    <FluentProvider
      style={{ ...rootStyle, height: 700, width: 500, padding: 20, borderRadius: 20, overflow: 'auto' }}
      theme={theme === 'dark' ? webDarkTheme : webLightTheme}
    >
      <Story />
    </FluentProvider>
  );
};
