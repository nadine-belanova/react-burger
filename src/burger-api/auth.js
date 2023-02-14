import { NORMA_API, checkResponse } from './index';

export function registerUser(name, email, password) {
  return new Promise(function (resolve, reject) {
    const data = {
      name,
      email,
      password,
    };
    fetch(`${NORMA_API}/auth/register`, {
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

export function login(email, password) {
  return new Promise(function (resolve, reject) {
    const data = {
      email,
      password,
    };
    fetch(`${NORMA_API}/auth/login`, {
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

export function getUser(accessToken) {
  return new Promise(function (resolve, reject) {
    fetch(`${NORMA_API}/auth/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
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

export function getToken(refreshToken) {
  return new Promise(function (resolve, reject) {
    const data = {
      token: refreshToken,
    };
    fetch(`${NORMA_API}/auth/token`, {
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

export function logout(refreshToken) {
  return new Promise(function (resolve, reject) {
    const data = {
      token: refreshToken,
    };
    fetch(`${NORMA_API}/auth/logout`, {
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

export function refreshAuth(refreshToken) {
  return new Promise(function (resolve, reject) {
    const data = {
      token: refreshToken,
    };
    fetch(`${NORMA_API}/auth/token`, {
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
