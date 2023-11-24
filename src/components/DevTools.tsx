import { SerializedDataView } from './SerializedDataView';
import { UnsupportedElementMessage } from './UnsupportedElementMessage';
import { useSerializedData } from '../contexts/SerializedData';

export const DevTools = () => {
  const [serializedData] = useSerializedData();
  if (serializedData === null) {
    return <UnsupportedElementMessage />;
  }
  return <SerializedDataView serializedData={serializedData} />;
};
