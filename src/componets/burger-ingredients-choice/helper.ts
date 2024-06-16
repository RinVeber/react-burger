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
  const timetamp = new Date().getTime();
  return `${timetamp}`;
};

export const findElement = (
  target: { openId: string; type: string },
  items: IDataItem[]
) => {
  return items.find((item: IDataItem) => item._id === target.openId);
};
