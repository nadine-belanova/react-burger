import burgerAPI from '../../burger-api';
import { AppDispatch } from '../index';

import { orderRequest, orderSuccess, orderError } from './orderSlice';

export const createOrder = (order: any) => (dispatch: AppDispatch) => {
  dispatch(orderRequest());
  burgerAPI
    .createOrder(order)
    .then((orderData) => {
      dispatch(orderSuccess(orderData));
    })
    .catch((error) => {
      dispatch(orderError(error.message));
    });
};
