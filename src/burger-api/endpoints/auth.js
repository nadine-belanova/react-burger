import { NORMA_API, checkResponse } from '../helpers';
import { getCookie, deleteCookie } from '../../services/utils';

export const refreshToken = () => {
  return fetch(`${NORMA_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkResponse);
};

export function registerUser(name, email, password) {
  const data = { name, email, password };
  return fetch(`${NORMA_API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function login(email, password) {
  const data = { email, password };
  return fetch(`${NORMA_API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function getUser() {
  return fetch(`${NORMA_API}/auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
  }).then(checkResponse);
}

export function logout() {
  const data = {
    token: localStorage.getItem('refreshToken'),
  };
  return fetch(`${NORMA_API}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(checkResponse)
    .then((result) => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      return result;
    });
}
