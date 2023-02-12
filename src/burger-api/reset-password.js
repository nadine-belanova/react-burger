import { NORMA_API, checkResponse } from './index';

export function sendResetPasswordCode(email) {
  return new Promise(function (resolve, reject) {
    const data = {
      email,
    };
    fetch(`${NORMA_API}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function resetPassword(password, token) {
  return new Promise(function (resolve, reject) {
    const data = {
      password,
      token,
    };
    fetch(`${NORMA_API}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
