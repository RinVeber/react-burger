import React from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../services/store';
import MainLayout, {
  loaderIngredientsFull,
} from '../componets/main-layout/main-layout';
import {
  loaderSendUserInfo,
  OnlyAuth,
  OnlyUnAuth,
  ProtectedRouteElement,
} from './ProtectedRouteElement';
import {paths} from './paths';
import {removeCurrentIngredientAction} from '../services/slices/dataSlice';
import {Preloader} from '../componets/Preloader/Preloader';
import AppHeader from '../componets/app-header/app-header';
import {IngredientPage} from '../pages/ingredient/IngredientPage';
import Modal from '../componets/ui/modal/modal';
import IngredientDetails from '../componets/ingredient-details/ingredient-details';
import RegisterPage from '../pages/register/RegisterPage';
import {LoginPage} from '../pages/login/LoginPage';
import {ForgotPasswordPage} from '../pages/forgot-password/ForgotPasswordPage';
import {ResetPasswordPage} from '../pages/reset-password/ResetPasswordPage';
import {ProfilePage} from '../pages/profile/ProfilePage';
import {UserContent} from '../pages/profile/componets/user-content/UserContent';
import {OrderHistory} from '../pages/profile/componets/orders-history/OrdersHistory';
import FeedOrderPage from '../pages/feed/FeedOrderPage';
import {FeedPage} from '../pages/feed/FeedPage';
import {removeItemForModalPageAction} from '../services/slices/orderSlice';
import {sendUserInfoRequestAction} from '../services/actions/actions';
import {App} from '../componets/app/app';
import FeedOrderInfo from '../componets/FeedOrderInfo/FeedOrderInfo';

export default function AppRouter() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from: Location | undefined = location.state?.from;
  const navigate = useNavigate();
  const {ingredients} = useAppSelector((store) => store.data);

  React.useEffect(() => {
    dispatch(sendUserInfoRequestAction());
  }, []);

  React.useEffect(() => {
    loaderIngredientsFull();
  }, []);

  function handleClose() {
    dispatch(removeCurrentIngredientAction());
    navigate(paths.main, {replace: true, state: location});
  }

  function handleCloseFeedModal() {
    dispatch(removeItemForModalPageAction());
    navigate(paths.feed, {replace: true, state: location});
  }

  function handleCloseOrderModal() {
    dispatch(removeItemForModalPageAction());
    navigate(paths.orderHistory, {replace: true, state: location});
  }

  if (!ingredients) {
    return <Preloader />;
  }
  return (
    <React.Fragment>
      <Routes location={from || location}>
        <Route element={<App />}>
          <Route path={paths.main} element={<MainLayout />} />,
          <Route path={paths.ingredients} element={<IngredientPage />} />
          <Route
            path={paths.register}
            element={<OnlyUnAuth page={<RegisterPage />} />}
          />
          <Route
            path={paths.login}
            element={<OnlyUnAuth page={<LoginPage />} />}
          />
          <Route
            path={paths.forgotPassword}
            element={<OnlyUnAuth page={<ForgotPasswordPage />} />}
          />
          <Route
            path={paths.resetPassword}
            element={<OnlyUnAuth page={<ResetPasswordPage />} />}
          />
          <Route
            path={paths.profile}
            element={<OnlyAuth page={<ProfilePage />} />}
          >
            <Route path={paths.profile} element={<UserContent />} />
            <Route path={paths.orderHistory} element={<OrderHistory />} />
          </Route>
          <Route path={paths.feed} element={<FeedPage />} />
          <Route path={paths.orderHistoryById} element={<FeedOrderPage />} />
          <Route path={paths.feedOrder} element={<FeedOrderPage />} />
        </Route>
      </Routes>

      {from && (
        <Routes>
          <Route
            path={paths.ingredients}
            element={
              <Modal header="Детали ингредиента" onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={paths.feedOrder}
            element={
              <Modal onClose={handleCloseFeedModal}>
                <FeedOrderInfo />
              </Modal>
            }
          />
          <Route
            path={paths.orderHistoryById}
            element={
              <Modal onClose={handleCloseOrderModal}>
                <FeedOrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </React.Fragment>
  );
}
