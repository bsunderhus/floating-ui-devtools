import * as React from 'react';
import { CONTROLLER } from '../lib/constants';
import { SerializedData } from '../lib/types';

export type SerializedDataContextValue = [serializedData: SerializedData | null, recalculateData: () => void];

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
  const [serializedData, setSerializedData] = React.useState<SerializedData | null>(null);

  const recalculateSerializedData = React.useCallback(() => {
    chrome.devtools.inspectedWindow.eval<SerializedData | null | undefined>(
      `$0?.ownerDocument?.defaultView?.['${CONTROLLER}']?.select($0)`,
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
