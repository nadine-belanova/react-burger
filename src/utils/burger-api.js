const NORMA_API = 'https://norma.nomoreparties.space/api'

function fetchIngredients() {
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

function createOrder(ingredients) {
  return new Promise(function (resolve, reject) {
    const data = {
      ingredients: ingredients.map(ingredient => ingredient._id)
    };
    fetch(`${NORMA_API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then(result => {
        if (result.success) {
          resolve({
            name: result.name,
            number: result.order.number
          });
        } else {
          reject(new Error('Неизвестная ошибка'));
        }
      })
      .catch(error => {
        reject(error);
      })
  })
}

export default { fetchIngredients, createOrder }
