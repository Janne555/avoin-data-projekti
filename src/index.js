import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import * as msal from "@azure/msal-browser";

const queryCache = new QueryCache()

const msalConfig = {
  auth: {
      clientId: 'c699ca69-5eae-433f-9fcd-f7765f2132e7'
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <App />
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
