import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { IngridientType } from '../../types'

import BurgerIngridient from './BurgerIngridient'

import styles from './BurgerConstructor.module.css';

const BurgerConstructor = ({ ingridients }) => {
    const buns = useMemo(() => ingridients.filter(item => item.type === 'bun'), [ingridients]);
    const mains = useMemo(() => ingridients.filter(item => item.type === 'main'), [ingridients]);
    const sauces = useMemo(() => ingridients.filter(item => item.type === 'sauce'), [ingridients]);
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
            <div className={`${styles.ingridients} custom-scroll`}>
                <div className={`${styles.heading} text text_type_main-medium mt-10`}>Булки</div>
                <div className={styles.section}>
                    {buns.map(ingridient => (
                        <BurgerIngridient key={ingridient._id} ingridient={ingridient} />
                    ))}
                </div>
                <div className={`${styles.heading} text text_type_main-medium mt-10`}>Соусы</div>
                <div className={styles.section}>
                    {sauces.map(ingridient => (
                        <BurgerIngridient key={ingridient._id} ingridient={ingridient} />
                    ))}
                </div>
                <div className={`${styles.heading} text text_type_main-medium mt-10`}>Начинки</div>
                <div className={styles.section}>
                    {mains.map(ingridient => (
                        <BurgerIngridient key={ingridient._id} ingridient={ingridient} />
                    ))}
                </div>
            </div>
        </div>
    )
};

BurgerConstructor.propTypes = {
    ingridients: PropTypes.arrayOf(IngridientType).isRequired,
};

export default BurgerConstructor
