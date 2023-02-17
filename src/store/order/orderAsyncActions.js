import burgerAPI from '../../burger-api';

import { orderRequest, orderSuccess, orderError } from './orderSlice';

export const createOrder = (order) => (dispatch) => {
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
