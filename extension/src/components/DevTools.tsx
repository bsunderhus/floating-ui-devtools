import React from 'react';
import { Button, Text } from '@fluentui/react-components';
import { UnsupportedElementMessage } from './UnsupportedElementMessage';
import { useSerializedData } from '../contexts/SerializedData';
import { ErrorBoundary } from 'react-error-boundary';
import { Data } from 'floating-ui-devtools';
import type { Serialized } from '@floating-ui-devtools/core';
import { devtools } from '../utils/devtools';

export const DevTools = () => {
  const [serializedData] = useSerializedData();
  if (serializedData === null) {
    return <UnsupportedElementMessage />;
  }
  const LazyComponent = React.lazy<React.FC<Serialized<Data>>>(() => import(`./Views/${serializedData.type}.tsx`));
  return (
    <ErrorBoundary
      fallback={
        <>
          <Text as="p">⚠️Something went wrong with '{serializedData.type}' module </Text>
          <Button onClick={devtools.reload} autoFocus appearance="primary">
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