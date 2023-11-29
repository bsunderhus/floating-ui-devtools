import { CONTROLLER, ELEMENT_METADATA } from '../lib/utils/constants';
import type { ReferenceId } from '../lib/utils/references';

export function inspect(referenceId: ReferenceId) {
  chrome.devtools.inspectedWindow.eval(
    `void inspect($0.ownerDocument.defaultView['${CONTROLLER}'].selectedElement['${ELEMENT_METADATA}'].references.get('${referenceId}'));`,
    {},
    console.log,
  );
}
