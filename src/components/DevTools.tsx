import React from 'react';
import { Button, Text } from '@fluentui/react-components';
import { UnsupportedElementMessage } from './UnsupportedElementMessage';
import { useSerializedData } from '../contexts/SerializedData';
import { ErrorBoundary } from 'react-error-boundary';
import { reload } from '../utils/reload';
import { Data, Serialized } from '../lib/types';

export const DevTools = () => {
  const [serializedData] = useSerializedData();
  if (serializedData === null) {
    return <UnsupportedElementMessage />;
  }
  const LazyComponent = React.lazy<React.FC<Serialized<Data>>>(() => import(`./views/${serializedData.type}.tsx`));
  return (
    <ErrorBoundary
      fallback={
        <>
          <Text as="p">⚠️Something went wrong with '{serializedData.type}' module </Text>
          <Button onClick={reload} autoFocus appearance="primary">
            Reload
          </Button>
        </>
      }
    >
      <React.Suspense fallback={null}>
        <LazyComponent {...serializedData} />
      </React.Suspense>
    </ErrorBoundary>
  );
};
