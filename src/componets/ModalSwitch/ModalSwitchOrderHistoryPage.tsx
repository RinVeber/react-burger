import React from 'react'
import { useAppDispatch, useAppSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeItemForModalPageAction } from '../../services/slices/orderSlice';
import { paths } from '../../router/paths';
import Modal from '../ui/modal/modal';
import FeedOrderInfo from '../FeedOrderInfo/FeedOrderInfo';
import { OrderHistory } from '../../pages/profile/componets/orders-history/OrdersHistory';
import { ProfilePage } from '../../pages/profile/ProfilePage';

interface Props {
  component: React.ReactElement;
}

export default function ModalSwitchOrderHistoryPage({component}: Props) {
    const selectedIngredient = useAppSelector(
        (state) => state.order.selectedIngredient,
      );
      const dispatch = useAppDispatch();
      const location = useLocation();
      const from = location.state && location.state.back;
      const navigate = useNavigate();
    
      function handleClose() {
        dispatch(removeItemForModalPageAction());
        navigate(paths.orderHistory, {replace: true, state: location});
      }
    
      return from && selectedIngredient ? (
        <ProfilePage>
          <OrderHistory>
          <Modal header="Детали ингредиента" onClose={handleClose}>
            <FeedOrderInfo />
          </Modal>
          </OrderHistory>
        </ProfilePage>
      ) : (
        component
      );
}
