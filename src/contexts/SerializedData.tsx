import * as React from 'react';
import { CONTROLLER, ELEMENT_METADATA } from '../lib/constants';
import type { Metadata } from '../lib/types';

export type SerializedDataContextValue = [
  serializedData: Metadata['serializedData'] | null,
  recalculateData: () => void,
];

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
  const [serializedData, setSerializedData] = React.useState<Metadata['serializedData'] | null>(null);

  const recalculateSerializedData = React.useCallback(() => {
    chrome.devtools.inspectedWindow.eval<Metadata['serializedData'] | null | undefined>(
      `$0?.ownerDocument?.defaultView?.['${CONTROLLER}']?.select($0)?.['${ELEMENT_METADATA}']?.serializedData;`,
      {},
      (nextSerializedData = null, error) => {
        console.log(nextSerializedData, error);
        setSerializedData(nextSerializedData);
      },
    );
  }, []);

  React.useEffect(() => {
    recalculateSerializedData();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(recalculateSerializedData);
    return () => {
      chrome.devtools.panels.elements.onSelectionChanged.removeListener(recalculateSerializedData);
    };
  }, [recalculateSerializedData]);

  return [serializedData, recalculateSerializedData];
}
