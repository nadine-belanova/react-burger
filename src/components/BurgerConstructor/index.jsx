import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { addSelectedBun, addSelectedIngredient, removeIngredient, createOrder, removeOrder, selectIngredientsOptions } from '../../services/ingredientsSlice';

import OrderDetails from '../OrderDetails';

import styles from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { selectedIngredients } = useSelector(selectIngredientsOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedBun = useMemo(() => selectedIngredients.find(item => item.type === 'bun'), [selectedIngredients]);
  const innerIngredients = useMemo(() => selectedIngredients.filter(item => item.type !== 'bun'), [selectedIngredients]);
  const totalPrice = useMemo(() => selectedIngredients.reduce((accum, item) => (accum + item.price), 0), [selectedIngredients]);

  const handleOpenModal = () => {
    dispatch(createOrder([selectedBun, ...innerIngredients]));
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    dispatch(removeOrder());
    setIsModalOpen(false);
  }

  const [{ isTopBunHover }, dropTopBunTarget] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isTopBunHover: monitor.isOver()
    }),
    drop(item) {
      dispatch(addSelectedBun(item._id))
    },
  });
  const [{ isIngridientsHover }, dropIngridientsTarget] = useDrop({
    accept: 'ingridients',
    collect: monitor => ({
      isIngridientsHover: monitor.isOver()
    }),
    drop(item) {
      dispatch(addSelectedIngredient(item._id))
    },
  });
  const [{ isBottomBunHover }, dropBottomBunTarget] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isBottomBunHover: monitor.isOver()
    }),
    drop(item) {
      dispatch(addSelectedBun(item._id))
    },
  });
  const handleRemoveIngredient = (_id) => {
    dispatch(removeIngredient(_id))
  }

  return (
    <>
      <div className={styles.ingredients}>
        <div className={`${styles.ingredient} mt-25 mr-4 ml-4`} ref={dropTopBunTarget}>
          <div className="pt-10 pb-10" />
          {selectedBun && <ConstructorElement
            type="top"
            isLocked={true}
            text={selectedBun.name}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
            extraClass={(isTopBunHover || isBottomBunHover) ? styles.constructorElementHover : ''}
          />}
          {!selectedBun &&
            <div className={`${styles.constructorElement} ${styles.constructorElementPosTop} ${(isTopBunHover || isBottomBunHover) ? styles.constructorElementHover : ''}`}>
              <span className={styles.constructorElementRow}>
                <span className={styles.constructorElementText}>Тащи сюда булку</span>
              </span>
            </div>
          }
        </div>
        <div className={`${styles.selectedIngredients} mt-4 mr-1 mb-4 ml-1 custom-scroll ${isIngridientsHover ? styles.constructorElementHover : ''}`} ref={dropIngridientsTarget}>
          {innerIngredients.map((ingredient, index) => (
            <div key={index} className={`${styles.ingredient} mr-4 ml-4`}>
              <div className="pt-10 pb-10">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => { handleRemoveIngredient(ingredient._id) }}
              />
            </div>
          ))}
        </div>
        <div className={`${styles.ingredient} mr-4 ml-4`} ref={dropBottomBunTarget}>
          <div className="pt-10 pb-10" />
          {selectedBun && <ConstructorElement
            type="bottom"
            isLocked={true}
            text={selectedBun.name}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
            extraClass={(isTopBunHover || isBottomBunHover) ? styles.constructorElementHover : ''}
          />}
          {!selectedBun &&
            <div className={`${styles.constructorElement} ${styles.constructorElementPosBottom} ${(isTopBunHover || isBottomBunHover) ? styles.constructorElementHover : ''}`}>
              <span className={styles.constructorElementRow}>
                <span className={styles.constructorElementText}>Тащи сюда булку</span>
              </span>
            </div>
          }
        </div>
        <div className={`${styles.total} mt-10 mr-4 ml-4  mb-25`}>
          <span className={`${styles.totalPrice} text text_type_digits-medium mr-10`}>
            <span className="mr-2">{totalPrice}</span>
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

export default BurgerConstructor
