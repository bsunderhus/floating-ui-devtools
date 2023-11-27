import { CONTROLLER, ELEMENT_METADATA } from '../lib/constants';

export function inspect<Key extends string>(key: Key) {
  chrome.devtools.inspectedWindow.eval(
    `void inspect($0.ownerDocument.defaultView['${CONTROLLER}'].selectedElement['${ELEMENT_METADATA}'].references['${key}']);`,
    {},
    console.log,
  );
}
