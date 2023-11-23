import React from 'react';
import {
  inspectContainer,
  inspectFlipBoundary,
  inspectOverflowBoundary,
  inspectScrollParent,
  inspectTarget,
} from '../utils/inspect';
import JsonView, { ThemeKeys } from 'react-json-view';
import { Button, makeStyles, shorthands } from '@fluentui/react-components';
import { useTheme } from '../hooks/useTheme';
import { tokens } from '../utils/tokens';
import { Eye20Filled } from '@fluentui/react-icons';
import { ContainerData } from '../utils/types';

export type ContainerDataViewProps = {
  data: ContainerData;
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

export const ContainerDataView = React.memo(({ data }: ContainerDataViewProps) => {
  const styles = useStyles();
  const { theme: themeType } = useTheme();
  const theme: ThemeKeys = themeType === 'dark' ? 'monokai' : 'rjv-default';
  return (
    <>
      <div className={styles.keyValueContainer}>
        <span className={styles.propertyKey}>strategy :</span> <span className={styles.string}>"{data.strategy}"</span>
      </div>
      <JsonView
        name="initial placement"
        indentWidth={2}
        collapsed={false}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        quotesOnKeys={false}
        style={{ backgroundColor: 'unset' }}
        src={data.initialPlacement}
        theme={theme}
      />
      <JsonView
        name="placement"
        indentWidth={2}
        collapsed={false}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        quotesOnKeys={false}
        style={{ backgroundColor: 'unset' }}
        src={data.placement}
        theme={theme}
      />
      <JsonView
        name="coords"
        indentWidth={2}
        collapsed={true}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        quotesOnKeys={false}
        style={{ backgroundColor: 'unset' }}
        src={data.coords}
        theme={theme}
      />
      <JsonView
        name="options"
        indentWidth={2}
        collapsed={true}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        quotesOnKeys={false}
        style={{ backgroundColor: 'unset' }}
        src={data.options}
        theme={theme}
      />
      <JsonView
        name="rects"
        indentWidth={2}
        collapsed={true}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        quotesOnKeys={false}
        style={{ backgroundColor: 'unset' }}
        src={data.rects}
        theme={theme}
      />
      <JsonView
        name="middlewareData"
        indentWidth={2}
        collapsed={true}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        quotesOnKeys={false}
        style={{ backgroundColor: 'unset' }}
        src={data.middlewareData}
        theme={theme}
      />
      <div className={styles.buttonGroup}>
        <div className={styles.buttonContainer}>
          <span className={styles.propertyKey}>container :</span>{' '}
          <Button
            title="Inspect Container"
            icon={<Eye20Filled />}
            iconPosition="after"
            appearance="subtle"
            onClick={inspectContainer}
          >
            {'<HTMLElement/>'}
          </Button>
        </div>
        <div className={styles.buttonContainer} onClick={inspectTarget}>
          <span className={styles.propertyKey}>target :</span>{' '}
          <Button
            title="Inspect Target"
            icon={<Eye20Filled />}
            iconPosition="after"
            appearance="subtle"
            onClick={inspectTarget}
          >
            {'<HTMLElement/>'}
          </Button>
        </div>
        {Array.from({ length: data.overflowBoundariesAmount }, (_, index) => (
          <div key={index} className={styles.buttonContainer}>
            <span className={styles.propertyKey}>overflow_boundary {index + 1} :</span>{' '}
            <Button
              title="Inspect Overflow boundary"
              icon={<Eye20Filled />}
              iconPosition="after"
              appearance="subtle"
              onClick={() => inspectOverflowBoundary(index)}
            >
              {'<HTMLElement/>'}
            </Button>
          </div>
        ))}
        {Array.from({ length: data.flipBoundariesAmount }, (_, index) => (
          <div key={index} className={styles.buttonContainer}>
            <span className={styles.propertyKey}>flip boundary {index + 1} :</span>{' '}
            <Button
              title="Inspect Flip boundary"
              icon={<Eye20Filled />}
              iconPosition="after"
              appearance="subtle"
              onClick={() => inspectFlipBoundary(index)}
            >
              {'<HTMLElement/>'}
            </Button>
          </div>
        ))}
        {Array.from({ length: data.scrollParentsAmount }, (_, index) => (
          <div key={index} className={styles.buttonContainer}>
            <span className={styles.propertyKey}>scroll parent {index + 1} :</span>{' '}
            <Button
              title="Inspect Scroll parent"
              icon={<Eye20Filled />}
              iconPosition="after"
              appearance="subtle"
              onClick={() => inspectScrollParent(index)}
            >
              {'<HTMLElement/>'}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
});
