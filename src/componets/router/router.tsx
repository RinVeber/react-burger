import { createBrowserRouter } from "react-router-dom";
import { App } from "../app/app";
import MainLayout from "../main-layout/main-layout";
import { paths } from "./paths";

export const router = createBrowserRouter([
  {
    path: paths.main,
    element: <App />,
    children: [
      {
        path: paths.main,
        element: <MainLayout />,
      },
    ],
  },
]);
