import * as React from 'react';
import { POSITIONING_DEV_TOOLS } from '../utils/constants';
import { Data } from '../utils/types';

export type PdtDataContextValue = [data: Data | null, recalculateData: () => void];

// eslint-disable-next-line react-refresh/only-export-components
const PDTContext = React.createContext<PdtDataContextValue | null>(null);

export const { Provider: PdtDataProvider } = PDTContext;

export function usePdtData() {
  const context = React.useContext(PDTContext);
  if (context === null) {
    throw new Error('usePDTData must be used within a PDTDataProvider');
  }
  return context;
}

export function usePdtDataContextValue(): PdtDataContextValue {
  const [data, setData] = React.useState<Data | null>(null);

  const recalculateData = React.useCallback(() => {
    chrome.devtools.inspectedWindow.eval<Data | null | undefined>(
      `window['${POSITIONING_DEV_TOOLS}']?.select($0)`,
      {},
      (positioningState, error) => {
        console.log(positioningState, error);
        setData(positioningState ?? null);
      },
    );
  }, []);

  React.useEffect(() => {
    if (chrome.devtools) {
      chrome.devtools.panels.elements.onSelectionChanged.addListener(recalculateData);
    }
    recalculateData();

    return () => {
      if (chrome.devtools) {
        chrome.devtools.panels.elements.onSelectionChanged.removeListener(recalculateData);
      }
    };
  }, [recalculateData]);

  return [data, recalculateData];
}
