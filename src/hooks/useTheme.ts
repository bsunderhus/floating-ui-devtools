import React from 'react';
import { tokens } from '@fluentui/react-components';
import { ColorTokens } from '../utils/tokens';

const themeToCSSVariables = (theme: ColorTokens): React.CSSProperties =>
  Object.fromEntries(Object.entries(theme).map(([token, value]) => [`--pdt-${token}`, value]));

export const lightTheme = themeToCSSVariables({
  htmlElementColor: 'rgb(133, 153, 0)',
  stringColor: 'rgb(203, 75, 22)',
  propertyColor: 'rgb(0, 43, 54)',
});

export const darkTheme = themeToCSSVariables({
  htmlElementColor: 'rgb(166, 226, 46)',
  stringColor: 'rgb(253, 151, 31)',
  propertyColor: 'rgb(249, 248, 245)',
});

export function useTheme() {
  const theme = chrome.devtools.panels.themeName === 'dark' ? darkTheme : lightTheme;
  const rootStyle: React.CSSProperties = {
    ...theme,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    height: 'inherit',
    width: 'inherit',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };
  return { rootStyle, theme: chrome.devtools.panels.themeName };
}
