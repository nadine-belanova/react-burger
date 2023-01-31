import PropTypes from 'prop-types';

import { IngredientType } from '../../types'

import Modal from '../Modal';

import styles from './IngredientDetails.module.css';

const IngredientDetails = ({ ingredient, onClose }) => {
  const count = Math.floor(Math.random() * 3)

  return (
    <Modal header="Детали ингридиента" onClose={onClose}>
      <>
        <div>
          <img src={ingredient.image_large} />
        </div>
        <div className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</div>
        <div className={`${styles.pfc} text text_type_main-default mb-5`}>
          <div>
            <div className="mb-2">Калории, ккал</div>
            <div>{ingredient.calories}</div>
          </div>
          <div>
            <div className="mb-2">Белки, г</div>
            <div>{ingredient.proteins}</div>
          </div>
          <div>
            <div className="mb-2">Жиры, г</div>
            <div>{ingredient.fat}</div>
          </div>
          <div>
            <div className="mb-2">Углеводы, г</div>
            <div>{ingredient.carbohydrates}</div>
          </div>
        </div>
      </>
    </Modal>
  )
};

IngredientDetails.propTypes = {
  ingredient: IngredientType.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails
