import { ReferenceElement } from '@floating-ui/dom';
import { CONTROLLER, ELEMENT_METADATA, HTML_REFERENCE } from '../lib/constants';

export function inspect<Key extends ReferenceElement>(key: Key) {
  // HTMLElements are not actually available here, they're just strings
  const reference = (key as unknown as string).replace(HTML_REFERENCE, '');

  if (typeof reference === 'string') {
    chrome.devtools.inspectedWindow.eval(
      `void inspect($0.ownerDocument.defaultView['${CONTROLLER}'].selectedElement['${ELEMENT_METADATA}'].references['${reference}']);`,
      {},
      console.log,
    );
  }
}
