import {Params, useLocation, useParams} from 'react-router-dom';
import IngredientDetails from '../../componets/ingredient-details/ingredient-details';
import store, {useAppDispatch, useAppSelector} from '../../services/store';
import styles from './style.module.scss';
import {addIngredientAction} from '../../services/slices/constructorSlice';
import {getCurrentIngredientAction} from '../../services/slices/dataSlice';
import React from 'react';

// export const loaderIngredientById = async (params: Params<string>) => {
//   const allIngredients = await store.getState().data.ingredients;
//   const selectedIngredients = await allIngredients.filter(
//     (item) => item._id !== params.id
//   );
//   console.log("ingredients", allIngredients);
//   console.log("selectedIngredients", selectedIngredients);
//   return selectedIngredients;
// };

export function IngredientPage() {
  const {ingredients, selectedIngredient} = useAppSelector(
    (store) => store.data,
  );
  const dispatch = useAppDispatch();

  const params = useParams();

  const findIngredient = ingredients.find((item) => item._id === params.id);

  React.useEffect(() => {
    if (findIngredient) {
      dispatch(
        getCurrentIngredientAction({
          selectedIngredient: findIngredient,
          isModal: false,
        }),
      );
    }
  }, [findIngredient]);
  if (!selectedIngredient) {
    return <div className={styles.error}>Такого ингрединета нет</div>;
  }
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <h1 className={'text text_type_main-large'}>Детали ингредиента</h1>
        <IngredientDetails />
      </section>
    </main>
  );
}
