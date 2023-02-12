import { NORMA_API, checkResponse } from './index';

export function createOrder(ingredients) {
  return new Promise(function (resolve, reject) {
    const data = {
      ingredients: ingredients.map((ingredient) => ingredient._id),
    };
    fetch(`${NORMA_API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .then((result) => {
        if (result.success) {
          resolve({
            name: result.name,
            number: result.order.number,
          });
        } else {
          reject(new Error('Неизвестная ошибка'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
