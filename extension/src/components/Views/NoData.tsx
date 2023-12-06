import * as React from 'react';
import { makeStyles, shorthands, Link } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridGap: '3px',
    ...shorthands.padding('5px'),
  },
  icon: {
    textDecorationLine: 'none',
    position: 'relative',
    top: '-5px',
    zIndex: 1,
  },
});

export const NoData = React.memo(() => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <u aria-hidden className={styles.icon}>
        💡️
      </u>
      <div>
        Please select an element that supports the{' '}
        <Link
          href="https://react.fluentui.dev/?path=/docs/concepts-developer-positioning-components--default"
          target="_blank"
        >
          Positioning API
        </Link>{' '}
        (
        <Link href="https://react.fluentui.dev/?path=/docs/components-popover--default" target="_blank">
          Popover
        </Link>
        ,{' '}
        <Link href="https://react.fluentui.dev/?path=/docs/components-tooltip--default" target="_blank">
          Tooltip
        </Link>
        ,{' '}
        <Link href="https://react.fluentui.dev/?path=/docs/components-dropdown--default" target="_blank">
          Dropdown
        </Link>
        ,{' '}
        <Link href="https://react.fluentui.dev/?path=/docs/components-combobox--default" target="_blank">
          Combobox
        </Link>
        ,{' '}
        <Link href="https://react.fluentui.dev/?path=/docs/compat-components-datepicker--default" target="_blank">
          DatePicker
        </Link>
        ,{' '}
        <Link href="https://react.fluentui.dev/?path=/docs/components-menu-menu--default" target="_blank">
          Menu
        </Link>{' '}
        or it's respective triggers).
      </div>
    </div>
  );
});

NoData.displayName = 'NoData';

export default NoData;
