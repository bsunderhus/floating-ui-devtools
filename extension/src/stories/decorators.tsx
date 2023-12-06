import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    height: '500px',
    ...shorthands.overflow('auto'),
    ...shorthands.padding('5px'),
    ...shorthands.borderRadius('20px'),
    ...shorthands.border('2px', 'dashed', 'black'),
  },
});

export const PanelDecorator = (Story: React.ElementType) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Story />
    </div>
  );
};
