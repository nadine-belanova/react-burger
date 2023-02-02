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
    orderLoading: (state, action) => {
      state.orderLoading = true;
    },
    orderReceived: (state, action) => {
      state.orderLoading = false;
      state.order = action.payload;
    },
    orderFailed: (state, action) => {
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
  dispatch(orderLoading());
  burgerAPI.createOrder(order).then(orderData => {
    dispatch(orderReceived(orderData));
  }).catch(error => {
    dispatch(orderFailed(error.message));
  });
}

export default reducer
