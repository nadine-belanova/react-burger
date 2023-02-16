import burgerAPI from '../../burger-api';

import { ingredientsRequest, ingredientsSuccess, ingredientsError } from '../slices/ingredients';

export const fetchIngredients = () => (dispatch) => {
  dispatch(ingredientsRequest());
  burgerAPI
    .fetchIngredients()
    .then((resultData) => {
      dispatch(ingredientsSuccess(resultData));
    })
    .catch((error) => {
      dispatch(ingredientsError(error.message));
    });
};
