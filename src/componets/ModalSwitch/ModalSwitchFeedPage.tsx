import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Modal from '../ui/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {paths} from '../../router/paths';
import MainLayout from '../main-layout/main-layout';
import {useAppDispatch, useAppSelector} from '../../services/store';
import {removeCurrentIngredientAction} from '../../services/slices/dataSlice';
import {removeItemForModalPageAction} from '../../services/slices/orderSlice';
import {FeedPage} from '../../pages/feed/FeedPage';
import FeedOrderPage from '../../pages/feed/FeedOrderPage';
import FeedOrderInfo from '../FeedOrderInfo/FeedOrderInfo';
import Feeds from '../Feeds/Feeds';
interface Props {
  component: React.ReactElement;
}

export default function ModalSwitchFeedPage({component}: Props) {
  const selectedIngredient = useAppSelector(
    (state) => state.order.selectedIngredient,
  );
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from = location.state && location.state.back;
  const navigate = useNavigate();

  function handleClose() {
    dispatch(removeItemForModalPageAction());
    navigate(paths.feed, {replace: true, state: location});
  }

  return from && selectedIngredient ? (
    <FeedPage>
      <Modal header="Детали ингредиента" onClose={handleClose}>
        <FeedOrderInfo />
      </Modal>
    </FeedPage>
  ) : (
    component
  );
}
