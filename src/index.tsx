import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import ErrorBoundary from './utils/error-boundary/error-boundary';
import {Provider} from 'react-redux';
import store from './services/store';
import AppRouter from './router/AppRouter';

const isLocalhost = ['127.0.0.1', 'localhost'].includes(
  window.location.hostname,
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        {isLocalhost ? (
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        ) : (
          <HashRouter>
            <AppRouter />
          </HashRouter>
        )}
        {/* <BrowserRouter>
          <AppRouter />
        </BrowserRouter> */}
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
