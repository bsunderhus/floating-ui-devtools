import { ContainerDataView } from './ContainerDataView';
import { UnsupportedElementMessage } from './UnsupportedElementMessage';
import { usePdtData } from '../contexts/PdtData';

export const DevTools = () => {
  const [pdtData] = usePdtData();
  if (pdtData === null) {
    return <UnsupportedElementMessage />;
  }
  switch (pdtData.type) {
    case 'container':
      return <ContainerDataView data={pdtData} />;
    default:
      return <UnsupportedElementMessage />;
  }
};
