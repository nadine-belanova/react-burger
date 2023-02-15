import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { selectIngredientsOptions } from '../../../store/ingredientsSlice';

import { IngredientType } from '../../../types';

import styles from './BurgerIngredient.module.css';

const BurgerIngredient = ({ ingredient }) => {
  const navigate = useNavigate();
  const { selectedBun, selectedIngredients } = useSelector(selectIngredientsOptions);

  const showIngredientDetails = () => {
    navigate(`/ingredients/${ingredient._id}`);
  };

  const allIngredients = useMemo(
    () => (selectedBun ? [selectedBun, ...selectedIngredients, selectedBun] : selectedIngredients),
    [selectedBun, selectedIngredients]
  );
  const count = useMemo(
    () => allIngredients.filter((item) => item._id === ingredient._id).length,
    [allIngredients, ingredient._id]
  );

  const [{ opacity }, ref] = useDrag({
    type: ingredient.type === 'bun' ? 'bun' : 'ingridients',
    item: { _id: ingredient._id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <>
      <div style={{ opacity }} ref={ref} className={styles.card} onClick={showIngredientDetails}>
        {count > 0 && <Counter count={count} size="default" />}
        <div>
          <img src={ingredient.image} alt={ingredient.name} />
        </div>
        <div className={`${styles.price} m-1`}>
          <span className={`${styles.priceText} text text_type_digits-small mr-2`}>{ingredient.price}</span>
          <span className={styles.priceIcon}>
            <CurrencyIcon type="primary" />
          </span>
        </div>
        <div className="text text_type_main-default">{ingredient.name}</div>
      </div>
    </>
  );
};

BurgerIngredient.propTypes = {
  ingredient: IngredientType.isRequired,
};

export default BurgerIngredient;
