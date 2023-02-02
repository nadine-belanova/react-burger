import { createSlice } from '@reduxjs/toolkit'

import burgerAPI from '../utils/burger-api'

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderLoading: false,
    order: null,
    orderError: ''
  },
  reducers: {
    orderRequest: (state, action) => {
      state.orderLoading = true;
    },
    orderSuccess: (state, action) => {
      state.orderLoading = false;
      state.order = action.payload;
    },
    orderError: (state, action) => {
      state.orderLoading = false;
      state.orderError = action.payload;
    },
    removeOrder: (state) => {
      state.order = null;
    },
  },
})

const { actions, reducer } = orderSlice

export const { orderLoading, orderReceived, orderFailed, removeOrder } = actions

export const selectOrderOptions = (state) => state.order;

export const createOrder = (order) => (dispatch) => {
  dispatch(orderRequest());
  burgerAPI.createOrder(order).then(orderData => {
    dispatch(orderSuccess(orderData));
  }).catch(error => {
    dispatch(orderError(error.message));
  });
}

export default reducer
