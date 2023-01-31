import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { selectIngredientsOptions } from '../../../services/ingredientsSlice';

import { IngredientType } from '../../../types'

import OrderDetails from '../../IngredientDetails'

import styles from './BurgerIngredient.module.css';

const BurgerIngredient = ({ ingredient }) => {
  const { selectedIngredients } = useSelector(selectIngredientsOptions);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const count = useMemo(() => selectedIngredients.filter(item => item._id === ingredient._id).length, [selectedIngredients]);

  const [{ opacity }, ref] = useDrag({
    type: ingredient.type === 'bun' ? 'bun' : 'ingridients',
    item: { _id: ingredient._id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <>
      <div style={{ opacity }} ref={ref} className={styles.card} onClick={handleOpenModal}>
        {count > 0 && <Counter count={count} size="default" />}
        <div><img src={ingredient.image} /></div>
        <div className={`${styles.price} m-1`}>
          <span className={`${styles.priceText} text text_type_digits-small mr-2`}>{ingredient.price}</span>
          <span className={styles.priceIcon}><CurrencyIcon type="primary" /></span>
        </div>
        <div className="text text_type_main-default">{ingredient.name}</div>
      </div>
      {isModalOpen && <OrderDetails ingredient={ingredient} onClose={handleCloseModal} />}
    </>
  )
};

BurgerIngredient.propTypes = {
  ingredient: IngredientType.isRequired,
};

export default BurgerIngredient
