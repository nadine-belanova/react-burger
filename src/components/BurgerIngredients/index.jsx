import { useState, useMemo } from 'react';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import { IngridientType } from '../../types'

import OrderDetails from '../OrderDetails';

import styles from './BurgerIngridients.module.css';

const BurgerIngridients = ({ ingridients }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const buns = useMemo(() => ingridients.filter(item => item.type === 'bun'), [ingridients]);
    const selectedIngridients = useMemo(() => ingridients.filter(item => item.type !== 'bun'), [ingridients]);
    const selectedBun = useMemo(() => {
        if (buns.length > 0) {
            const selectedIndex = Math.floor(Math.random() * buns.length);
            return buns[selectedIndex];
        }
        return null;
    }, [buns])

    return (
        <>
            <div className={styles.ingridients}>
                {selectedBun &&
                    <div className={`${styles.ingridient} mt-25 mr-4 ml-4`}>
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
                <div className={`${styles.selectedIngridients} mt-4 mb-4 custom-scroll`}>
                    {selectedIngridients.map(ingridient => (
                        <div key={ingridient._id} className={`${styles.ingridient} mr-4 ml-4`}>
                            <div className="pt-10 pb-10">
                                <DragIcon type="primary" />
                            </div>
                            <ConstructorElement
                                key={ingridient._id}
                                text={ingridient.name}
                                price={ingridient.price}
                                thumbnail={ingridient.image}
                            />
                        </div>
                    ))}
                </div>
                {selectedBun &&
                    <div className={`${styles.ingridient} mr-4 ml-4`}>
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

BurgerIngridients.propTypes = {
    ingridients: PropTypes.arrayOf(IngridientType).isRequired,
};

export default BurgerIngridients
