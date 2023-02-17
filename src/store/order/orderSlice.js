import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderLoading: false,
    order: null,
    orderError: '',
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
});

const { actions, reducer } = orderSlice;

export const { orderRequest, orderSuccess, orderError, removeOrder } = actions;

export const selectOrderOptions = (state) => state.order;

export default reducer;
