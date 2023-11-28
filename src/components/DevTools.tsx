import { Suspense } from 'react';
import { Button, Text } from '@fluentui/react-components';
import { UnsupportedElementMessage } from './UnsupportedElementMessage';
import { useSerializedData } from '../contexts/SerializedData';
import { ErrorBoundary } from 'react-error-boundary';
import { reload } from '../utils/reload';
import Views from '../lib/views';
import { Data } from '../lib';

export const DevTools = () => {
  const [serializedData] = useSerializedData();
  if (serializedData === null) {
    return <UnsupportedElementMessage />;
  }
  if (serializedData.type in Views) {
    const Component = Views[serializedData.type] as React.ElementType<Data>;
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
        <Suspense fallback={null}>
          <Component {...serializedData} />
        </Suspense>
      </ErrorBoundary>
    );
  }
  return <Text as="p">⚠️Something went wrong with '{serializedData.type}' module </Text>;
};
