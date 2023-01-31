import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { createOrder, removeOrder, selectIngredientsOptions } from '../../services/ingredientsSlice';

import OrderDetails from '../OrderDetails';

import styles from './BurgerIngredients.module.css';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(selectIngredientsOptions)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const buns = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
  const selectedIngredients = useMemo(() => ingredients.filter(item => item.type !== 'bun'), [ingredients]);
  const selectedBun = useMemo(() => {
    if (buns.length > 0) {
      const selectedIndex = Math.floor(Math.random() * buns.length);
      return buns[selectedIndex];
    }
    return null;
  }, [buns])

  const handleOpenModal = () => {
    dispatch(createOrder([selectedBun, ...selectedIngredients]));
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    dispatch(removeOrder());
    setIsModalOpen(false);
  }

  return (
    <>
      <div className={styles.ingredients}>
        {selectedBun &&
          <div className={`${styles.ingredient} mt-25 mr-4 ml-4`}>
            <div className="pt-10 pb-10" />
            <ConstructorElement
              type="top"
              isLocked={true}
              text={selectedBun.name}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
            />
          </div>
        }
        <div className={`${styles.selectedIngredients} mt-4 mb-4 custom-scroll`}>
          {selectedIngredients.map(ingredient => (
            <div key={ingredient._id} className={`${styles.ingredient} mr-4 ml-4`}>
              <div className="pt-10 pb-10">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                key={ingredient._id}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>
        {selectedBun &&
          <div className={`${styles.ingredient} mr-4 ml-4`}>
            <div className="pt-10 pb-10" />
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={selectedBun.name}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
            />
          </div>
        }
        <div className={`${styles.total} mt-10 mr-4 ml-4  mb-25`}>
          <span className={`${styles.totalPrice} text text_type_digits-medium mr-10`}>
            <span className="mr-2">1233</span>
            <CurrencyIcon type="primary" />
          </span>
          <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
            Оформить заказ
          </Button>
        </div>
      </div>
      {isModalOpen && <OrderDetails onClose={handleCloseModal} />}
    </>
  )
};

export default BurgerIngredients
