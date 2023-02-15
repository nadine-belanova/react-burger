import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { selectIngredientsOptions } from '../../store/ingredientsSlice';

import styles from './Ingredient.module.css';

const Ingredient = () => {
  const navigate = useNavigate();
  const { ingredients } = useSelector(selectIngredientsOptions);
  const { ingredientId } = useParams();

  const ingredient = useMemo(() => ingredients.find((item) => item._id === ingredientId), [ingredients, ingredientId]);
  if (!ingredient) {
    navigate('/');
    return null;
  }

  return (
    <main className={styles.ingredient}>
      <div>
        <div className="text text_type_main-large mt-4 mb-8">Детали ингредиента</div>
        <div>
          <img src={ingredient.image_large} alt={ingredient.name} />
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
      </div>
    </main>
  );
};

export default Ingredient;
