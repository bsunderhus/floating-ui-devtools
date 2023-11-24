import * as React from 'react';
import { PDT_CONTROLLER } from '../utils/constants';
import { PdtSerializedData } from '../utils/types';

export type PdtSerializedDataContextValue = [serializedData: PdtSerializedData | null, recalculateData: () => void];

// eslint-disable-next-line react-refresh/only-export-components
const PDTSerializedDataContext = React.createContext<PdtSerializedDataContextValue | null>(null);

export const { Provider: PdtSerializedDataProvider } = PDTSerializedDataContext;

export function usePdtSerializedData() {
  const context = React.useContext(PDTSerializedDataContext);
  if (context === null) {
    throw new Error('usePdtSerializedData must be used within a PdtSerializedDataProvider');
  }
  return context;
}

export function usePdtSerializedDataContextValue(): PdtSerializedDataContextValue {
  const [data, setData] = React.useState<PdtSerializedData | null>(null);

  const recalculateData = React.useCallback(() => {
    chrome.devtools.inspectedWindow.eval<PdtSerializedData | null | undefined>(
      `$0?.ownerDocument?.defaultView?.['${PDT_CONTROLLER}']?.select($0)`,
      {},
      (positioningState = null, error) => {
        console.log(positioningState, error);
        setData(positioningState);
      },
    );
  }, []);

  React.useEffect(() => {
    recalculateData();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(recalculateData);
    return () => {
      chrome.devtools.panels.elements.onSelectionChanged.removeListener(recalculateData);
    };
  }, [recalculateData]);

  return [data, recalculateData];
}
