import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/normalize.css/normalize.css';
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import '../node_modules/@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '../node_modules/@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import '../node_modules/@blueprintjs/select/lib/css/blueprint-select.css';
import '../node_modules/@blueprintjs/timezone/lib/css/blueprint-timezone.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
//<React.StrictMode>
    <App />,
//</React.StrictMode>, 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
