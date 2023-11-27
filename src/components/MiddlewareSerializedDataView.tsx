import React from 'react';
import { inspect } from '../utils/inspect';
import JsonView, { ThemeKeys } from 'react-json-view';
import { Button, makeStyles, shorthands } from '@fluentui/react-components';
import { useTheme } from '../hooks/useTheme';
import { tokens } from '../utils/tokens';
import { Eye20Filled } from '@fluentui/react-icons';
import { Metadata } from '../lib/types';

export type MiddlewareSerializedDataViewProps = {
  serializedData: Extract<Metadata, { type: 'middleware' }>['serializedData'];
};

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

export const MiddlewareSerializedDataView = React.memo(
  ({ serializedData: { type, references, ...payload } }: MiddlewareSerializedDataViewProps) => {
    const styles = useStyles();
    const { theme: themeType } = useTheme();
    const theme: ThemeKeys = themeType === 'dark' ? 'monokai' : 'rjv-default';
    return (
      <>
        {Object.entries(payload).map(([key, value]) => {
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
          {Array.from(references, reference => (
            <div key={reference} className={styles.buttonContainer}>
              <span className={styles.propertyKey}>{reference} :</span>{' '}
              <Button
                title={`Inspect ${reference}`}
                icon={<Eye20Filled />}
                iconPosition="after"
                appearance="subtle"
                onClick={() => inspect(reference)}
              >
                {'<HTMLElement/>'}
              </Button>
            </div>
          ))}
        </div>
      </>
    );
  },
);
