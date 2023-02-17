import { NORMA_API, checkResponse } from '../helpers';

export function sendResetPasswordCode(email) {
  const data = {
    email,
  };
  return fetch(`${NORMA_API}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function resetPassword(password, token) {
  const data = {
    password,
    token,
  };
  return fetch(`${NORMA_API}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}
