import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { TOrderState } from './orderTypes';

const initialState: TOrderState = {
  orderLoading: false,
  order: null,
  orderError: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderRequest: (state) => {
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
});

const { actions, reducer } = orderSlice;

export const { orderRequest, orderSuccess, orderError, removeOrder } = actions;

export const selectOrderOptions = (state: RootState) => state.order;

export default reducer;
