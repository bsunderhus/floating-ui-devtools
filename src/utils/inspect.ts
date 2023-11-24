import { PDT_CONTROLLER } from './constants';

export function inspect<Key extends string>(key: Key) {
  chrome.devtools.inspectedWindow.eval(
    `void inspect($0?.ownerDocument?.defaultView?.['${PDT_CONTROLLER}']?.getReference('${key}'));`,
    {},
    console.log,
  );
}
