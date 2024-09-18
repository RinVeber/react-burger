import {createBrowserRouter, useLocation} from 'react-router-dom';
import {App} from '../componets/app/app';
import MainLayout, { loaderIngredientsFull } from '../componets/main-layout/main-layout';
import {paths} from './paths';
import RegisterPage from '../pages/register/RegisterPage';
import {LoginPage} from '../pages/login/LoginPage';
import {ForgotPasswordPage} from '../pages/forgot-password/ForgotPasswordPage';
import {ResetPasswordPage} from '../pages/reset-password/ResetPasswordPage';
import {ProfilePage} from '../pages/profile/ProfilePage';
import {UserContent} from '../pages/profile/componets/user-content/UserContent';
import {OrderHistory} from '../pages/profile/componets/orders-history/OrdersHistory';
import {loaderSendUserInfo, ProtectedRouteElement} from './ProtectedRouteElement';
import {IngredientPage} from '../pages/ingredient/IngredientPage';
import ModalSwitch from '../componets/ModalSwitch/ModalSwitch';

export const router = createBrowserRouter([
  {
    path: paths.main,
    element: <App />,
    loader: loaderSendUserInfo,
    children: [
      {
        path: paths.main,
        element: <MainLayout />,
        loader: loaderIngredientsFull,
      },

      {
        path: paths.ingredients,
        loader: loaderIngredientsFull,
        element: <ModalSwitch component={<IngredientPage />} />,
      },

      {
        path: paths.register,
        element: (
          <ProtectedRouteElement
            isAuth={false}
            page={<RegisterPage />}
            isNotForAuthorized={true}
          />
        ),
      },
      {
        path: paths.login,
        element: (
          <ProtectedRouteElement
            isAuth={false}
            page={<LoginPage />}
            isNotForAuthorized={true}
          />
        ),
      },
      {
        path: paths.forgotPassword,
        element: (
          <ProtectedRouteElement
            isAuth={false}
            isNotForAuthorized={true}
            page={<ForgotPasswordPage />}
          />
        ),
      },
      {
        path: paths.resetPassword,
        element: (
          <ProtectedRouteElement
            isAuth={false}
            isNotForAuthorized={true}
            page={<ResetPasswordPage />}
          />
        ),
      },
      {
        path: paths.profile,
        element: (
          <ProtectedRouteElement
            isAuth={true}
            page={<ProfilePage />}
            isNotForAuthorized={false}
          />
        ),
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
]);
