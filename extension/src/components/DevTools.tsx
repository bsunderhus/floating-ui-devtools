import React from 'react';
import { Button, Text } from '@fluentui/react-components';
import { ErrorBoundary } from 'react-error-boundary';
import { useSerializedData } from '../contexts/SerializedData';
import { devtools } from '../utils/devtools';
import { LazyViews } from './Views';

export const DevTools = () => {
  const [serializedData] = useSerializedData();
  const LazyView = LazyViews[serializedData.type];
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
        <LazyView {...serializedData} />
      </React.Suspense>
    </ErrorBoundary>
  );
};
