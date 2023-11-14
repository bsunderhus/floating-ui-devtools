chrome.devtools.panels.elements.createSidebarPane('Fluent UI positioning', sidebarPanel => {
  sidebarPanel.setPage('index.html');

  sidebarPanel.onShown.addListener(devtoolsWindow => {
    devtoolsWindow.postMessage({ visible: true }, '*');
  });
});
