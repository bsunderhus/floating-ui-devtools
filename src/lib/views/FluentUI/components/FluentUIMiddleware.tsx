import React from 'react';
import { inspect } from '../../../../utils/inspect';
import JsonView, { ThemeKeys } from 'react-json-view';
import { Button, makeStyles, shorthands } from '@fluentui/react-components';
import { useTheme } from '../../../../hooks/useTheme';
import { tokens } from '../../../../utils/tokens';
import { Eye20Filled } from '@fluentui/react-icons';
import { FluentUIMiddlewareData } from '../types';

const useStyles = makeStyles({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    ...shorthands.paddingBlock('4px'),
    ...shorthands.paddingInline('calc(1rem + 2px)'),
    rowGap: '2px',
  },
  htmlElement: {
    color: tokens.htmlElementColor,
    letterSpacing: 'unset',
    opacity: 'unset',
  },
  buttonContainer: {},
  propertyKey: {
    cursor: 'default',
    fontFamily: 'monospace',
    color: tokens.propertyColor,
    letterSpacing: '0.5px',
    opacity: '0.85',
  },
  keyValueContainer: {
    cursor: 'default',
    ...shorthands.paddingBlock('4px'),
    ...shorthands.paddingInline('calc(1rem + 2px)'),
  },
  string: {
    fontFamily: 'monospace',
    color: tokens.stringColor,
    opacity: 'unset',
    letterSpacing: 'unset',
  },
});

export const FluentUIMiddleware = React.memo((props: FluentUIMiddlewareData) => {
  const {
    middlewareState: { elements, initialPlacement, middlewareData, y, x, strategy, rects, placement },
  } = props;
  const styles = useStyles();
  const { theme: themeType } = useTheme();
  const theme: ThemeKeys = themeType === 'dark' ? 'monokai' : 'rjv-default';
  return (
    <>
      {Object.entries({ initialPlacement, middlewareData, y, x, strategy, rects, placement }).map(([key, value]) => {
        if (value && typeof value === 'object') {
          return (
            <JsonView
              name={key}
              indentWidth={2}
              collapsed={true}
              enableClipboard={false}
              displayObjectSize={false}
              displayDataTypes={false}
              quotesOnKeys={false}
              style={{ backgroundColor: 'unset' }}
              src={value}
              theme={theme}
            />
          );
        }
        return (
          <div className={styles.keyValueContainer}>
            <span className={styles.propertyKey}>{key} :</span> <span className={styles.string}>"{value}"</span>
          </div>
        );
      })}
      <div className={styles.buttonGroup}>
        <div className={styles.buttonContainer}>
          <span className={styles.propertyKey}>floating :</span>{' '}
          <Button
            title={`Inspect floating`}
            icon={<Eye20Filled />}
            iconPosition="after"
            appearance="subtle"
            onClick={() => inspect(elements.floating)}
          >
            {'<HTMLElement/>'}
          </Button>
        </div>
        <div className={styles.buttonContainer}>
          <span className={styles.propertyKey}>reference :</span>{' '}
          <Button
            title={`Inspect reference`}
            icon={<Eye20Filled />}
            iconPosition="after"
            appearance="subtle"
            onClick={() => inspect(elements.reference)}
          >
            {'<HTMLElement/>'}
          </Button>
        </div>
      </div>
    </>
  );
});

FluentUIMiddleware.displayName = 'FluentUIMiddleware';

export default FluentUIMiddleware;
