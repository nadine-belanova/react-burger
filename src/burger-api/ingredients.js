import { NORMA_API, checkResponse } from './index';

export function fetchIngredients() {
  return new Promise(function (resolve, reject) {
    fetch(`${NORMA_API}/ingredients`)
      .then(checkResponse)
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          resolve(result.data);
        } else {
          reject(new Error('Неизвестная ошибка'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
