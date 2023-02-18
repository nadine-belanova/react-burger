import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDrop } from 'react-dnd';

import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import {
  addSelectedBun,
  addSelectedIngredient,
  selectIngredientsOptions,
  clearSelectedIngredients,
} from '../../store/ingredients/ingredientsSlice';
import { createOrder } from '../../store/order/orderAsyncActions';
import { removeOrder } from '../../store/order/orderSlice';
import { selectUserOptions } from '../../store/user/userSlice';
import { fetchUser } from '../../store/user/userAsyncActions';

import OrderDetails from '../OrderDetails';
import InnerIngredient from './InnerIngredient';

import styles from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userLoading } = useSelector(selectUserOptions);
  const { selectedIngredients, selectedBun } = useSelector(selectIngredientsOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateOrderClicked, setIsCreateOrderClicked] = useState(false);

  const allIngredients = useMemo(
    () => (selectedBun ? [selectedBun, ...selectedIngredients, selectedBun] : [...selectedIngredients]),
    [selectedIngredients, selectedBun]
  );

  const totalPrice = useMemo(() => allIngredients.reduce((accum, item) => accum + item.price, 0), [allIngredients]);

  const handleCreateOrderClick = () => {
    dispatch(fetchUser());
    setIsCreateOrderClicked(true);
  };

  useEffect(() => {
    if (isCreateOrderClicked && !userLoading) {
      if (user) {
        dispatch(createOrder(allIngredients));
        setIsModalOpen(true);
        setIsCreateOrderClicked(false);
      } else {
        navigate('/login', { state: { from: location.pathname } });
      }
    }
  }, [isCreateOrderClicked, userLoading, user, dispatch, navigate, location.pathname, allIngredients]);

  const handleCloseModal = () => {
    dispatch(clearSelectedIngredients());
    dispatch(removeOrder());
    setIsModalOpen(false);
  };

  const [{ isTopBunHover }, dropTopBunTarget] = useDrop({
    accept: 'bun',
    collect: (monitor) => ({
      isTopBunHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addSelectedBun(item._id));
    },
  });
  const [{ isIngridientsHover }, dropIngridientsTarget] = useDrop({
    accept: 'ingridients',
    collect: (monitor) => ({
      isIngridientsHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addSelectedIngredient(item._id));
    },
  });
  const [{ isBottomBunHover }, dropBottomBunTarget] = useDrop({
    accept: 'bun',
    collect: (monitor) => ({
      isBottomBunHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addSelectedBun(item._id));
    },
  });

  return (
    <>
      <div className={styles.ingredients}>
        <div className={`${styles.ingredient} mt-25 mr-4 ml-4`} ref={dropTopBunTarget}>
          <div className="pt-10 pb-10" />
          {selectedBun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${selectedBun.name}\n(верх)`}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
              extraClass={isTopBunHover || isBottomBunHover ? styles.constructorElementHover : ''}
            />
          )}
          {!selectedBun && (
            <div
              className={`${styles.constructorElement} ${styles.constructorElementPosTop} ${
                isTopBunHover || isBottomBunHover ? styles.constructorElementHover : ''
              }`}
            >
              <span className={styles.constructorElementRow}>
                <span className={styles.constructorElementText}>Тащи сюда булку</span>
              </span>
            </div>
          )}
        </div>
        <div
          className={`${styles.selectedIngredients} mt-4 mr-1 mb-4 ml-1 custom-scroll ${
            isIngridientsHover ? styles.constructorElementHover : ''
          }`}
          ref={dropIngridientsTarget}
        >
          {selectedIngredients.map((ingredient, index) => (
            <InnerIngredient key={index} ingredient={ingredient} index={index} />
          ))}
        </div>
        <div className={`${styles.ingredient} mr-4 ml-4`} ref={dropBottomBunTarget}>
          <div className="pt-10 pb-10" />
          {selectedBun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${selectedBun.name}\n(низ)`}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
              extraClass={isTopBunHover || isBottomBunHover ? styles.constructorElementHover : ''}
            />
          )}
          {!selectedBun && (
            <div
              className={`${styles.constructorElement} ${styles.constructorElementPosBottom} ${
                isTopBunHover || isBottomBunHover ? styles.constructorElementHover : ''
              }`}
            >
              <span className={styles.constructorElementRow}>
                <span className={styles.constructorElementText}>Тащи сюда булку</span>
              </span>
            </div>
          )}
        </div>
        <div className={`${styles.total} mt-10 mr-4 ml-4  mb-25`}>
          <span className={`${styles.totalPrice} text text_type_digits-medium mr-10`}>
            <span className="mr-2">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </span>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleCreateOrderClick}
            disabled={!selectedBun || selectedIngredients.length === 0}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {isModalOpen && <OrderDetails onClose={handleCloseModal} />}
    </>
  );
};

export default BurgerConstructor;
