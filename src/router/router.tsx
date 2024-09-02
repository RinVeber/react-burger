import { createBrowserRouter } from "react-router-dom";
import { App, loaderIngredientsFull } from "../componets/app/app";
import MainLayout from "../componets/main-layout/main-layout";
import { paths } from "./paths";
import RegisterPage from "../pages/register/RegisterPage";
import { LoginPage } from "../pages/login/LoginPage";
import { ForgotPasswordPage } from "../pages/forgot-password/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/reset-password/ResetPasswordPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { UserContent } from "../pages/profile/componets/user-content/UserContent";
import { OrderHistory } from "../pages/profile/componets/orders-history/OrdersHistory";
import {
  loaderSendUserInfo,
  ProtectedRouteElement,
} from "./ProtectedRouteElement";
import { IngredientPage } from "../pages/ingredient/IngredientPage";

export const router = createBrowserRouter([
  {
    path: paths.main,
    element: <App />,
    loader: loaderIngredientsFull,
    children: [
      {
        path: paths.main,
        element: <MainLayout />,
      },
      {
        path: paths.ingredients,
   
        element: <IngredientPage />,
    
      },
      {
        element: <ProtectedRouteElement isAuth />,
        loader: loaderSendUserInfo,
        children: [
          {
            path: paths.register,
            element: <RegisterPage />,
          },
          {
            path: paths.login,
            element: <LoginPage />,
          },
          {
            path: paths.forgotPassword,
            element: <ForgotPasswordPage />,
          },
          {
            path: paths.resetPassword,
            element: <ResetPasswordPage />,
          },
          {
            path: paths.profile,
            element: <ProfilePage />,
            children: [
              {
                path: paths.profile,
                element: <UserContent />,
              },
              {
                path: paths.orderHistory,
                element: <OrderHistory />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
