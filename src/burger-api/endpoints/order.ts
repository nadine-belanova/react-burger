import { NORMA_API, checkResponse } from '../helpers';
import { getCookie } from '../../services/utils';

export function createOrder(ingredients: Array<any>) {
  const data = {
    ingredients: ingredients.map((ingredient) => ingredient._id),
  };
  return fetch(`${NORMA_API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}
