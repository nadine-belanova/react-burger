import burgerAPI from '../../burger-api';
import { AppDispatch } from '../index';

import { orderRequest, orderSuccess, orderError } from './orderSlice';

import { TIngredient } from '../../store/ingredients/ingredientsTypes';

export const createOrder = (ingredients: Array<TIngredient>) => (dispatch: AppDispatch) => {
  dispatch(orderRequest());
  burgerAPI
    .createOrder(ingredients)
    .then((orderData) => {
      dispatch(orderSuccess(orderData));
    })
    .catch((error) => {
      dispatch(orderError(error.message));
    });
};
