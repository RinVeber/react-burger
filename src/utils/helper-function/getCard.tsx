import IngredientItem from "../../componets/ingredients/ingredient-item/ingredient-item";
import { IDataItem } from "../data";

export function getIngredientCards(data: IDataItem[], onOpen: any) {
  const buns: JSX.Element[] = [],
    mains: JSX.Element[] = [],
    sauces: JSX.Element[] = [];

  data.forEach((element: IDataItem) => {
    const ingredientCard = (
      <IngredientItem
        key={element._id}
        openId={element._id}
        name={element.name}
        image={element.image}
        price={element.price}
        onOpen={onOpen}
        type={element.type}
        index={element._id}
      />
    );
    switch (element.type) {
      case "main": {
        mains.push(ingredientCard);
        break;
      }
      case "bun": {
        buns.push(ingredientCard);
        break;
      }
      case "sauce": {
        sauces.push(ingredientCard);
        break;
      }
      default: {
        break;
      }
    }
  });
  const separatedData = {
    mains: mains,
    buns: buns,
    sauces: sauces,
  };
  return separatedData;
}
