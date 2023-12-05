import * as React from 'react';
import type { Data } from 'floating-ui-devtools';
import { Serialized } from '@floating-ui-devtools/core';
import { devtools } from '../utils/devtools';

export type SerializedDataContextValue = [serializedData: Serialized<Data> | null, recalculateData: () => void];

// eslint-disable-next-line react-refresh/only-export-components
const SerializedDataContext = React.createContext<SerializedDataContextValue | null>(null);

export const { Provider: SerializedDataProvider } = SerializedDataContext;

export function useSerializedData() {
  const context = React.useContext(SerializedDataContext);
  if (context === null) {
    throw new Error('useSerializedData must be used within a SerializedDataProvider');
  }
  return context;
}

export function useSerializedDataContextValue(): SerializedDataContextValue {
  const [serializedData, setSerializedData] = React.useState<Serialized<Data> | null>(null);

  const recalculateSerializedData = React.useCallback(async () => setSerializedData(await devtools.select()), []);

  React.useEffect(() => {
    recalculateSerializedData();
    devtools.addSelectionChangeListener(recalculateSerializedData);
    return () => {
      devtools.removeSelectionChangeListener(recalculateSerializedData);
    };
  }, [recalculateSerializedData]);

  return [serializedData, recalculateSerializedData];
}
