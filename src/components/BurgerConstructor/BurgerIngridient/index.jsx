import { useState } from 'react';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { IngridientType } from '../../../types'

import OrderDetails from '../../IngredientDetails'

import styles from './BurgerIngridient.module.css';

const BurgerIngridient = ({ ingridient }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const count = Math.floor(Math.random() * 3)

    return (
        <>
            <div className={styles.card} onClick={handleOpenModal}>
                {count > 0 && <Counter count={count} size="default" />}
                <div><img src={ingridient.image} /></div>
                <div className={`${styles.price} m-1`}>
                    <span className={`${styles.priceText} text text_type_digits-small mr-2`}>{ingridient.price}</span>
                    <span className={styles.priceIcon}><CurrencyIcon type="primary" /></span>
                </div>
                <div className="text text_type_main-default">{ingridient.name}</div>
            </div>
            {isModalOpen && <OrderDetails ingridient={ingridient} onClose={handleCloseModal} />}
        </>
    )
};

BurgerIngridient.propTypes = {
    ingridient: IngridientType.isRequired,
};

export default BurgerIngridient
