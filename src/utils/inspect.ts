import { CONTROLLER } from '../lib/constants';

export function inspect<Key extends string>(key: Key) {
  chrome.devtools.inspectedWindow.eval(
    `void inspect($0?.ownerDocument?.defaultView?.['${CONTROLLER}']?.getReference('${key}'));`,
    {},
    console.log,
  );
}
