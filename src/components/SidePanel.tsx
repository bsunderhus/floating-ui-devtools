import React from 'react';
import { Button, Tooltip, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { ArrowReset24Filled, Bug24Filled } from '@fluentui/react-icons';
import { useSerializedData } from '../contexts/SerializedData';
import { debug } from '../utils/debug';

const useStyles = makeStyles({
  aside: {
    position: 'absolute',
    bottom: '0',
    alignSelf: 'flex-end',
    zIndex: '1',
    ...shorthands.margin(tokens.spacingHorizontalL),
  },
});

export const SidePanel = React.memo(() => {
  const styles = useStyles();
  const [, recalculatePdtData] = useSerializedData();
  return (
    <aside className={styles.aside}>
      <Tooltip relationship="label" content="Reload">
        <Button
          appearance="secondary"
          icon={<ArrowReset24Filled />}
          iconPosition="after"
          onClick={recalculatePdtData}
        />
      </Tooltip>
      <Tooltip relationship="label" content="Debug">
        <Button onClick={debug} appearance="secondary" icon={<Bug24Filled />} iconPosition="after" />
      </Tooltip>
    </aside>
  );
});
