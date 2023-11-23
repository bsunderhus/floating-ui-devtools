import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DevToolsShell } from './components/DevToolsShell';
import { DevTools } from './components/DevTools';

ReactDOM.render(
  <React.StrictMode>
    <DevToolsShell>
      <DevTools />
    </DevToolsShell>
  </React.StrictMode>,
  document.getElementById('root'),
);
