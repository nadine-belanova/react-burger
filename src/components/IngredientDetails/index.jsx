import PropTypes from 'prop-types';

import { IngridientType } from '../../types'

import Modal from '../Modal';

import styles from './IngredientDetails.module.css';

const IngredientDetails = ({ ingridient, onClose }) => {
    const count = Math.floor(Math.random() * 3)

    return (
        <Modal header="Детали ингридиента" onClose={onClose}>
            <>
                <div>
                    <img src={ingridient.image_large} />
                </div>
                <div className="text text_type_main-medium mt-4 mb-8">{ingridient.name}</div>
                <div className={`${styles.pfc} text text_type_main-default mb-5`}>
                    <div>
                        <div className="mb-2">Калории, ккал</div>
                        <div>{ingridient.calories}</div>
                    </div>
                    <div>
                        <div className="mb-2">Белки, г</div>
                        <div>{ingridient.proteins}</div>
                    </div>
                    <div>
                        <div className="mb-2">Жиры, г</div>
                        <div>{ingridient.fat}</div>
                    </div>
                    <div>
                        <div className="mb-2">Углеводы, г</div>
                        <div>{ingridient.carbohydrates}</div>
                    </div>
                </div>
            </>
        </Modal>
    )
};

IngredientDetails.propTypes = {
    ingridient: IngridientType.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default IngredientDetails
