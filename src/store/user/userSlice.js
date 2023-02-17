import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userLoading: false,
    user: null,
    userError: '',
  },
  reducers: {
    userRequest: (state) => {
      state.userLoading = true;
    },
    userSuccess: (state, action) => {
      state.userLoading = false;
      state.user = action.payload;
      state.userError = '';
    },
    userError: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    clearUser: (state) => {
      state.userLoading = false;
      state.user = null;
      state.userError = '';
    },
  },
});

const { actions, reducer } = userSlice;

export const { userRequest, userSuccess, userError, clearUser } = actions;

export const selectUserOptions = (state) => state.user;

export default reducer;
