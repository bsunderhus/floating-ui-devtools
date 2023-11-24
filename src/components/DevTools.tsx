import { SerializedDataView } from './SerializedDataView';
import { UnsupportedElementMessage } from './UnsupportedElementMessage';
import { usePdtSerializedData } from '../contexts/PdtSerializedData';

export const DevTools = () => {
  const [serializedData] = usePdtSerializedData();
  if (serializedData === null) {
    return <UnsupportedElementMessage />;
  }
  return <SerializedDataView serializedData={serializedData} />;
};
