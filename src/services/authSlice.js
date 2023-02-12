import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userName: '',
    userEmail: '',
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    setUserData: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      const { name, email } = user;
      state.userName = name;
      state.userEmail = email;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    clearUSerData: (state, action) => {
      state.userName = '';
      state.userEmail = '';
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

const { actions, reducer } = authSlice;

export const { setUserData, clearUSerData } = actions;

export const selectAuthOptions = (state) => state.auth;

export default reducer;
