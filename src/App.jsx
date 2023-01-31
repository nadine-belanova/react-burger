import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from './components/AppHeader'
import BurgerIngredients from './components/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor'

import './App.css';

import { fetchIngredients } from './services/ingredientsSlice';
import { selectIngredientsOptions } from './services/ingredientsSlice'

function App() {
  const dispatch = useDispatch();
  const { isLoading, ingredientsError } = useSelector(selectIngredientsOptions)

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);


  return (
    <div className="App">
      {!isLoading && ingredientsError === '' && <>
        <AppHeader />
        <main>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </>}
      {ingredientsError !== '' && <div className="m-20">
        <div className="mb-10 text text_type_main-default">Что-то пошло не так...</div>
        <div className="text text_type_main-small text_color_inactive">{ingredientsError}</div>
      </div>}
    </div>
  );
}

export default App;
