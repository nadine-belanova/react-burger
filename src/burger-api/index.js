import { registerUser, login, logout, refreshAuth } from './auth';
import { fetchIngredients } from './ingredients';
import { createOrder } from './order';
import { sendResetPasswordCode, resetPassword } from './reset-password';

export const NORMA_API = 'https://norma.nomoreparties.space/api';

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export default {
  registerUser,
  login,
  logout,
  refreshAuth,
  fetchIngredients,
  createOrder,
  sendResetPasswordCode,
  resetPassword,
};
