import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../../components/AppHeader';
import BurgerIngredients from '../../components/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor';

import styles from './Constructor.module.css';

const Constructor = () => (
  <>
    <AppHeader />
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  </>
);

export default Constructor;
