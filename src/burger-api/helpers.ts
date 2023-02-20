export const NORMA_API = 'https://norma.nomoreparties.space/api';

export const checkResponse = (res: any) => {
  return res.ok ? res.json() : res.json().then((err: Error) => Promise.reject(err));
};
