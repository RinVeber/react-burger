import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Modal from '../ui/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {paths} from '../../router/paths';
import MainLayout from '../main-layout/main-layout';
import {useAppDispatch, useAppSelector} from '../../services/store';
import { removeCurrentIngredientAction } from '../../services/slices/dataSlice';
interface Props {
  component: React.ReactElement;
}

export default function ModalSwitch({component}: Props) {
  const selectedIngredient = useAppSelector(
    (state) => state.data.selectedIngredient,
  );
  const dispatch = useAppDispatch()
  const location = useLocation();
  const from = location.state && location.state.from;
  const navigate = useNavigate();

  function handleClose() {
    dispatch(removeCurrentIngredientAction());
    navigate(paths.main, {replace: true, state: location});
  }

  return from && selectedIngredient ? (
    <MainLayout>
      <Modal header="Детали ингредиента" onClose={handleClose}>
        <IngredientDetails />
      </Modal>
    </MainLayout>
  ) : (
    component
  );
}
