import React, {forwardRef} from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.scss';
import {IDataItem} from '../../../utils/data';
import {useAppDispatch} from '../../../services/store';
import {removeIngredientAction} from '../../../services/slices/constructorSlice';
import {useDrag, useDrop} from 'react-dnd';
import {DefaultBun} from '../helper';
import {TabStatus} from '../../burger-ingredients/burger-ingredients';

interface Props {
  item: IDataItem | DefaultBun;
  position?: 'top' | 'bottom';
  isVisibility: boolean;
  index?: number;
  moveListItem?: (dragIndex: number, hoverIndex: number) => void;
}

export default function BurgerItem({
  item,
  position,
  isVisibility,
  index,
  moveListItem,
}: Props) {
  const dispatch = useAppDispatch();

  const handleRemoveBtn = () => {
    dispatch(removeIngredientAction(item));
  };

  const [{isDrag}, drag] = useDrag({
    type: 'item',
    item: {index},
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const refElement = React.useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: 'item',
    hover: (item: {index: number}, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index!;
      const hoverBoundingRect = refElement.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect!.bottom - hoverBoundingRect!.top) / 2;
      const hoverActualY =
        monitor.getClientOffset()!.y - hoverBoundingRect!.top;

      if (dragIndex < hoverIndex! && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex! && hoverActualY > hoverMiddleY) return;
      moveListItem?.(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(refElement));

  return (
    <li
      className={style.item}
      {...(item.type !== TabStatus.buns && {ref: refElement})}
      style={isDrag ? {opacity: 0.5} : {opacity: 1}}
    >
      <div
        className={`${
          isVisibility ? style.dragIcon_visible : style.dragIcon_hidden
        } mr-2`}
      >
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        handleClose={() => handleRemoveBtn()}
        type={position}
        isLocked={position === 'top' || position === 'bottom'}
        text={
          item.name +
          (position === 'top' ? ' (верх)' : '') +
          (position === 'bottom' ? ' (низ)' : '')
        }
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
}
