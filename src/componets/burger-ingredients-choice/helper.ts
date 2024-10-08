import bunImage from "../../images/bun.png";
import { IDataItem } from "../../utils/data";

export interface DefaultBun {
  name: string;
  price: number;
  image: string;
  type: string;
}

export const DefaultBun: DefaultBun = {
  name: "Выберите булку",
  price: 0,
  image: bunImage,
  type: "bun",
};

export const getRandom = () => {
  return `${Math.floor(Math.random() * 999)}`;
};

export const findElement = (
  target: { openId: string; type: string },
  items: IDataItem[],
) => {
  return items.find((item: IDataItem) => item._id === target.openId);
};
