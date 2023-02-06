import { Link } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';

const AppHeader = () => (
  <header className={`${styles.header} text text_type_main-default p-4`}>
    <Link to="/" className={`${styles.selectedMenuItem} pt-4 pr-5 pb-4 pl-5`}>
      <span className={`${styles.menuItemIcon} mr-2`}>
        <BurgerIcon type="primary" />
      </span>
      <span>Конструктор</span>
    </Link>
    <Link to="/" className={`${styles.menuItem} pt-4 pr-5 pb-4 pl-5`}>
      <span className={`${styles.menuItemIcon} mr-2`}>
        <ListIcon type="secondary" />
      </span>
      <span>Лента заказов</span>
    </Link>
    <Link to="/" className={styles.logo}>
      <Logo />
    </Link>
    <Link to="/" className={`${styles.menuItem} pt-4 pr-5 pb-4 pl-5`}>
      <span className={`${styles.menuItemIcon} mr-2`}>
        <ProfileIcon type="secondary" />
      </span>
      <span>Личный кабинет</span>
    </Link>
  </header>
);

export default AppHeader;
