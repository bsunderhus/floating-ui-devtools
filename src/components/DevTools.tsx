import { UnsupportedElementMessage } from './UnsupportedElementMessage';
import { useSerializedData } from '../contexts/SerializedData';
import { MiddlewareSerializedDataView } from './MiddlewareSerializedDataView';

export const DevTools = () => {
  const [serializedData] = useSerializedData();
  if (serializedData === null) {
    return <UnsupportedElementMessage />;
  }
  switch (serializedData.type) {
    case 'middleware':
      return <MiddlewareSerializedDataView serializedData={serializedData} />;
    default:
      return <UnsupportedElementMessage />;
  }
};
