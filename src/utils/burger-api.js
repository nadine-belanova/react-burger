const NORMA_API = 'https://norma.nomoreparties.space/api'

export function fetchIngredients() {
  return new Promise(function (resolve, reject) {
    fetch(`${NORMA_API}/ingredients`)
      .then((result) => result.json())
      .then(result => {
        if (result.success && Array.isArray(result.data)) {
          resolve(result.data);
        } else {
          reject(new Error('Неизвестная ошибка'));
        }
      })
      .catch(error => {
        reject(error);
      })
  })
}

export default { fetchIngredients }
