import burgerAPI from '../../burger-api';

import { ingredientsRequest, ingredientsSuccess, ingredientsError } from './ingredientsSlice';

export const fetchIngredients = () => (dispatch) => {
  dispatch(ingredientsRequest());
  burgerAPI
    .fetchIngredients()
    .then((result) => {
      if (result.success && Array.isArray(result.data)) {
        dispatch(ingredientsSuccess(result.data));
      } else {
        dispatch(ingredientsError(result.message));
      }
    })
    .catch((error) => {
      dispatch(ingredientsError(error.message));
    });
};
