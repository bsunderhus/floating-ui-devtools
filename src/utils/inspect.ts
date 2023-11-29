import type { ReferenceElement } from '@floating-ui/dom';
import { CONTROLLER, ELEMENT_METADATA, HTML_ELEMENT_REFERENCE } from '../lib/constants';
import type { Serialized } from '../lib/types';

export function inspect(element: Serialized<ReferenceElement>) {
  const reference = element.replace(HTML_ELEMENT_REFERENCE, '');
  console.log({ element, reference, HTML_ELEMENT_REFERENCE });
  chrome.devtools.inspectedWindow.eval(
    `void inspect($0.ownerDocument.defaultView['${CONTROLLER}'].selectedElement['${ELEMENT_METADATA}'].references['${reference}']);`,
    {},
    console.log,
  );
}
