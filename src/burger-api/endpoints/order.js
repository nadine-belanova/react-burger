import { NORMA_API, checkResponse } from '../helpers';

export function createOrder(ingredients) {
  const data = {
    ingredients: ingredients.map((ingredient) => ingredient._id),
  };
  return fetch(`${NORMA_API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}
