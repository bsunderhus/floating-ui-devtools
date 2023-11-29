export function debug() {
  chrome.devtools.inspectedWindow.eval(`void setTimeout(() => {debugger;}, 2000);`, {}, console.log);
}
