import IngredientDetails from '../../components/IngredientDetails';

import styles from './Ingredient.module.css';

const Ingredient = () => (
  <main className={styles.ingredient}>
    <div>
      <div className="text text_type_main-large mt-4 mb-8">Детали ингредиента</div>
      <IngredientDetails />
    </div>
  </main>
);

export default Ingredient;
