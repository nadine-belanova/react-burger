import { NORMA_API, checkResponse } from '../helpers';

export function fetchIngredients() {
  return fetch(`${NORMA_API}/ingredients`).then(checkResponse);
}
