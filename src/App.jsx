import { useEffect, useState } from 'react';

import AppHeader from './components/AppHeader'
import BurgerConstructor from './components/BurgerConstructor'
import BurgerIngredients from './components/BurgerIngredients'

import './App.css';

const INGRIDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [isError, setIsError] = useState(false);
  const [buns, setBuns] = useState([]);
  const [selectedBun, setSelectedBun] = useState();
  const [mains, setMains] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [selectedIngridients, setSelectedIngridients] = useState([]);

  useEffect(() => {
    fetch(INGRIDIENTS_URL)
      .then((result) => result.json())
      .then(result => {
        if (result.success && Array.isArray(result.data)) {
          console.log(result.data);
          setBuns(result.data.filter(item => item.type === 'bun'));
          setMains(result.data.filter(item => item.type === 'main'));
          setSauces(result.data.filter(item => item.type === 'sauce'));
        } else {
          setIsError(true);
        }
      })
      .catch(error => {
        setIsError(true);
      })
  }, []);

  useEffect(() => {
    if (buns.length > 0) {
      const selectedIndex = Math.floor(Math.random() * buns.length);
      setSelectedBun(buns[selectedIndex]);
    }
  }, [buns]);

  useEffect(() => {
    if (mains.length > 0 || sauces.length > 0) {
      setSelectedIngridients(mains.concat(sauces));
    }
  }, [mains, sauces]);

  return (
    <div className="App">
      {!isError && <>
        <AppHeader />
        <main>
          <BurgerConstructor buns={buns} mains={mains} sauces={sauces} />
          <BurgerIngredients selectedBun={selectedBun} selectedIngridients={selectedIngridients} />
        </main>
      </>}
      {isError && <div className="m-20">
        Что-то пошло не так...
      </div>}
    </div>
  );
}

export default App;
