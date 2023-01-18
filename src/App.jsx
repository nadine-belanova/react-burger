import { useEffect, useState } from 'react';

import { fetchIngredients } from './utils/burger-api'

import AppHeader from './components/AppHeader'
import BurgerConstructor from './components/BurgerConstructor'
import BurgerIngredients from './components/BurgerIngredients'

import './App.css';

function App() {
  const [errorMessage, setErrorMessage] = useState('');
  const [ingridients, setIngridients] = useState([]);

  useEffect(() => {
    fetchIngredients().then(resultData => {
      setIngridients(resultData)
    }).catch(error => {
      console.log({ error });
      setErrorMessage(error.message)
    });
  }, []);


  return (
    <div className="App">
      {errorMessage === '' && <>
        <AppHeader />
        <main>
          <BurgerConstructor ingridients={ingridients} />
          <BurgerIngredients ingridients={ingridients} />
        </main>
      </>}
      {errorMessage !== '' && <div className="m-20">
        <div className="mb-10 text text_type_main-default">Что-то пошло не так...</div>
        <div className="text text_type_main-small text_color_inactive">{errorMessage}</div>
      </div>}
    </div>
  );
}

export default App;
