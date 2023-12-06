import { Data } from 'floating-ui-devtools';
import { CONTROLLER, ELEMENT_METADATA, ReferenceId, Serialized } from '@floating-ui-devtools/core';

const noop = () => {};

/* eslint no-restricted-globals: ["off"] */
const devtools =
  'devtools' in globalThis.chrome
    ? {
        select: (): Promise<Serialized<Data>> =>
          new Promise((resolve, reject) => {
            chrome.devtools.inspectedWindow.eval<Serialized<Data> | null | undefined>(
              `$0?.ownerDocument?.defaultView?.['${CONTROLLER}']?.select($0)?.['${ELEMENT_METADATA}']?.serializedData`,
              {},
              (nextSerializedData, error) => {
                if (error) {
                  reject(error);
                  return;
                }
                resolve(nextSerializedData ?? { type: 'NoData' });
              },
            );
          }),
        inspect: (referenceId: ReferenceId) =>
          chrome.devtools.inspectedWindow.eval(
            `void inspect($0.ownerDocument.defaultView['${CONTROLLER}'].selectedElement['${ELEMENT_METADATA}'].references.get('${referenceId}'));`,
            {},
            console.log,
          ),
        debug: () => chrome.devtools.inspectedWindow.eval(`void setTimeout(() => {debugger;}, 2000);`, {}, console.log),
        reload: () => chrome.devtools.inspectedWindow.reload(),
        getTheme: () => chrome.devtools.panels.themeName,
        addSelectionChangeListener: chrome.devtools.panels.elements.onSelectionChanged.addListener,
        removeSelectionChangeListener: chrome.devtools.panels.elements.onSelectionChanged.removeListener,
      }
    : {
        select: () => Promise.resolve<Serialized<Data>>({ type: 'NoData' }),
        eval: noop,
        inspect: noop,
        debug: noop,
        reload: noop,
        getTheme: () => 'default' as const,
        addSelectionChangeListener: noop,
        removeSelectionChangeListener: noop,
      };

export { devtools };
