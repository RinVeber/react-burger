import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, useLocation } from "react-router-dom";
import { router } from "./router/router";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./utils/error-boundary/error-boundary";
import { Provider } from "react-redux";
import store from "./services/store";
import AppRouter from "./router/AppRouter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        {/* <RouterProvider router={router}  /> */}
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
