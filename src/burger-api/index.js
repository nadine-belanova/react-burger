import * as authAPI from './auth';
import * as ingredientsAPI from './ingredients';
import * as orderAPI from './order';
import * as resetPasswordAPI from './reset-password';

export const NORMA_API = 'https://norma.nomoreparties.space/api';

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const burgerAPI = { ...authAPI, ...ingredientsAPI, ...orderAPI, ...resetPasswordAPI };

export default burgerAPI;
