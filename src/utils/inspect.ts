import { POSITIONING_DEV_TOOLS } from './constants';

export function inspectContainer() {
  chrome.devtools.inspectedWindow.eval(
    `
    {
      const window = $0.ownerDocument.defaultView
      const positioningDevTools = window['${POSITIONING_DEV_TOOLS}'];
      inspect(positioningDevTools.getContainer());
    }
    undefined;
  `,
    {},
    console.log,
  );
}

export function inspectTarget() {
  chrome.devtools.inspectedWindow.eval(
    `
    {
      const window = $0.ownerDocument.defaultView
      const positioningDevTools = window['${POSITIONING_DEV_TOOLS}'];
      inspect(positioningDevTools.getTarget());
    }
    undefined;
  `,
    {},
    console.log,
  );
}

export function inspectScrollParent(index: number) {
  chrome.devtools.inspectedWindow.eval(
    `
    {
      const window = $0.ownerDocument.defaultView
      const positioningDevTools = window['${POSITIONING_DEV_TOOLS}'];
      inspect(positioningDevTools.getScrollParentByIndex(${index}));
    }
    undefined;
  `,
    {},
    console.log,
  );
}

export function inspectOverflowBoundary(index: number) {
  chrome.devtools.inspectedWindow.eval(
    `
    {
      const window = $0.ownerDocument.defaultView
      const positioningDevTools = window['${POSITIONING_DEV_TOOLS}'];
      inspect(positioningDevTools.getOverflowBoundaryByIndex(${index}));
    }
    undefined;
  `,
    {},
    console.log,
  );
}

export function inspectFlipBoundary(index: number) {
  chrome.devtools.inspectedWindow.eval(
    `
    {
      const window = $0.ownerDocument.defaultView
      const positioningDevTools = window['${POSITIONING_DEV_TOOLS}'];
      inspect(positioningDevTools.getFlipBoundaryByIndex(${index}));
    }
    undefined;
  `,
    {},
    console.log,
  );
}
