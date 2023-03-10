import { useMemo, useRef, useState, UIEvent } from 'react';
import { useSelector } from 'react-redux';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { selectIngredientsOptions } from '../../store/ingredients/ingredientsSlice';

import BurgerIngredient from './BurgerIngredient';

import styles from './BurgerIngredients.module.css';

const BurgerIngredients = () => {
  const { ingredients } = useSelector(selectIngredientsOptions);

  const [currentTab, setCurrentTab] = useState('bunsTab');

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);

  const bunsRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const handleTabClick = (tabValue: string) => {
    setCurrentTab(tabValue);
    if (tabValue === 'bunsTab' && bunsRef.current) {
      bunsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (tabValue === 'mainsTab' && mainsRef.current) {
      mainsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (tabValue === 'saucesTab' && saucesRef.current) {
      saucesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const handleIngridientsScroll = (e: UIEvent<HTMLDivElement>) => {
    if (bunsRef.current && mainsRef.current) {
      const scrollTop = e.currentTarget.scrollTop;
      const bunsRect = bunsRef.current.getBoundingClientRect();
      const isBunsVisible = bunsRect.height - scrollTop > 0;
      const mainsRect = mainsRef.current.getBoundingClientRect();
      const isMainsVisible = bunsRect.height + mainsRect.height - scrollTop > 0;
      if (isBunsVisible) {
        setCurrentTab('bunsTab');
      } else if (isMainsVisible) {
        setCurrentTab('mainsTab');
      } else {
        setCurrentTab('saucesTab');
      }
    }
  };

  return (
    <div className={`${styles.constructor} mt-10 mb-10`}>
      <div className="text text_type_main-large">???????????????? ????????????</div>
      <div className={`${styles.tabs} mt-5`}>
        <Tab value="bunsTab" active={currentTab === 'bunsTab'} onClick={handleTabClick}>
          ??????????
        </Tab>
        <Tab value="mainsTab" active={currentTab === 'mainsTab'} onClick={handleTabClick}>
          ??????????
        </Tab>
        <Tab value="saucesTab" active={currentTab === 'saucesTab'} onClick={handleTabClick}>
          ??????????????
        </Tab>
      </div>
      <div className={`${styles.ingredients} custom-scroll`} onScroll={handleIngridientsScroll}>
        <div ref={bunsRef}>
          <div className={`${styles.heading} text text_type_main-medium mt-10`}>??????????</div>
          <div className={styles.section}>
            {buns.map((ingredient) => (
              <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
            ))}
          </div>
        </div>
        <div ref={mainsRef}>
          <div className={`${styles.heading} text text_type_main-medium mt-10`}>??????????</div>
          <div className={styles.section}>
            {sauces.map((ingredient) => (
              <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
            ))}
          </div>
        </div>
        <div ref={saucesRef}>
          <div className={`${styles.heading} text text_type_main-medium mt-10`} ref={saucesRef}>
            ??????????????
          </div>
          <div className={styles.section}>
            {mains.map((ingredient) => (
              <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
