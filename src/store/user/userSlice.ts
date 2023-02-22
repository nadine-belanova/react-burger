import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { TUserState } from './userTypes';

const initialState: TUserState = {
  userLoading: false,
  user: null,
  userError: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
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

export const selectUserOptions = (state: RootState) => state.user;

export default reducer;
