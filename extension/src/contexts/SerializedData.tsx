import * as React from 'react';
import type { Data } from 'floating-ui-devtools';
import { Serialized } from '@floating-ui-devtools/core';
import { devtools } from '../utils/devtools';

export type SerializedDataContextValue = [serializedData: Serialized<Data>, recalculateData: () => void];

// eslint-disable-next-line react-refresh/only-export-components
const SerializedDataContext = React.createContext<SerializedDataContextValue | null>(null);
const serializedDataDefaultValue: SerializedDataContextValue = [
  { type: 'NoData' },
  () => {
    /* noop */
  },
];

export const { Provider: SerializedDataProvider } = SerializedDataContext;

export const useSerializedData = (): SerializedDataContextValue => {
  return React.useContext(SerializedDataContext) ?? serializedDataDefaultValue;
};

export const useSerializedDataContextValue = (): SerializedDataContextValue => {
  const [serializedData, setSerializedData] = React.useState<Serialized<Data>>({ type: 'NoData' });

  const recalculateSerializedData = React.useCallback(async () => setSerializedData(await devtools.select()), []);

  React.useEffect(() => {
    recalculateSerializedData();
    devtools.addSelectionChangeListener(recalculateSerializedData);
    return () => {
      devtools.removeSelectionChangeListener(recalculateSerializedData);
    };
  }, [recalculateSerializedData]);

  return [serializedData, recalculateSerializedData];
};
