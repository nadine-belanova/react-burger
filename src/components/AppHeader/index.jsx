import { NavLink } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';

const AppHeader = () => (
  <header className={`${styles.header} text text_type_main-default p-4`}>
    <NavLink
      to="/"
      className={({ isActive }) => `${isActive ? styles.selectedMenuItem : styles.menuItem} pt-4 pr-5 pb-4 pl-5`}
    >
      <span className={`${styles.menuItemIcon} mr-2`}>
        <BurgerIcon type="primary" />
      </span>
      <span>Конструктор</span>
    </NavLink>
    <NavLink to="/" className={`${styles.menuItem} pt-4 pr-5 pb-4 pl-5`}>
      <span className={`${styles.menuItemIcon} mr-2`}>
        <ListIcon type="secondary" />
      </span>
      <span>Лента заказов</span>
    </NavLink>
    <NavLink to="/" className={styles.logo}>
      <Logo />
    </NavLink>
    <NavLink
      to="/profile"
      className={({ isActive }) => `${isActive ? styles.selectedMenuItem : styles.menuItem} pt-4 pr-5 pb-4 pl-5`}
    >
      <span className={`${styles.menuItemIcon} mr-2`}>
        <ProfileIcon type="secondary" />
      </span>
      <span>Личный кабинет</span>
    </NavLink>
  </header>
);

export default AppHeader;
