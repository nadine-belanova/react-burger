import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { selectIngredientsOptions } from '../../services/ingredientsSlice'

import BurgerIngredient from './BurgerIngredient'

import styles from './BurgerIngredients.module.css';

const BurgerIngredients = () => {
  const { ingredients } = useSelector(selectIngredientsOptions)
  const buns = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
  const mains = useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]);
  return (
    <div className={`${styles.constructor} mt-10 mb-10`} >
      <div className="text text_type_main-large">Соберите бургер</div>
      <div className={`${styles.tabs} mt-5`}>
        <Tab value="one" active={true} onClick={() => { }}>
          Булки
        </Tab>
        <Tab value="two" active={false} onClick={() => { }}>
          Соусы
        </Tab>
        <Tab value="three" active={false} onClick={() => { }}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients} custom-scroll`}>
        <div className={`${styles.heading} text text_type_main-medium mt-10`}>Булки</div>
        <div className={styles.section}>
          {buns.map(ingredient => (
            <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
        <div className={`${styles.heading} text text_type_main-medium mt-10`}>Соусы</div>
        <div className={styles.section}>
          {sauces.map(ingredient => (
            <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
        <div className={`${styles.heading} text text_type_main-medium mt-10`}>Начинки</div>
        <div className={styles.section}>
          {mains.map(ingredient => (
            <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default BurgerIngredients
