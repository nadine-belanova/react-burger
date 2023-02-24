import { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch } from '../../../hooks/useAppDispatch';

import { TIngredient } from '../../../store/ingredients/ingredientsTypes';
import { removeIngredient, sortIngridients } from '../../../store/ingredients/ingredientsSlice';

import styles from '../BurgerConstructor.module.css';

type TInnerIngredientProps = {
  ingredient: TIngredient;
  index: number;
};

export const InnerIngredient: FC<TInnerIngredientProps> = ({ ingredient, index }) => {
  const dispatch = useAppDispatch();

  const handleRemoveIngredient = (_id: string) => {
    dispatch(removeIngredient(_id));
  };

  const [{ opacity, isDragging }, dragRef] = useDrag({
    type: 'sort',
    item: () => {
      return { fromIndex: index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'sort',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(sortIngridients({ ...(item as { fromIndex: number }), toIndex: index }));
    },
  });

  return (
    <div ref={dropTarget}>
      <div className={`${styles.ingredient} mr-4 ml-4`} ref={dragRef} style={{ opacity }}>
        <div className="pt-10 pb-10">
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => {
            handleRemoveIngredient(ingredient._id);
          }}
          extraClass={isHover && !isDragging ? styles.constructorElementHover : ''}
        />
      </div>
    </div>
  );
};

export default InnerIngredient;
