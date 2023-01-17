
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './AppHeader.module.css';

const AppHeader = () => (
    <header className={`${styles.header} text text_type_main-default p-4`}>
        <a href="/" className={`${styles.selectedMenuItem} pt-4 pr-5 pb-4 pl-5`}>
            <span className={`${styles.menuItemIcon} mr-2`}>
                <BurgerIcon type="primary" />
            </span>
            <span>Конструктор</span>
        </a>
        <a href="/" className={`${styles.menuItem} pt-4 pr-5 pb-4 pl-5`}>
            <span className={`${styles.menuItemIcon} mr-2`}>
                <ListIcon type="secondary" />
            </span>
            <span>Лента заказов</span>
        </a>
        <a href="/" className={styles.logo}>
            <Logo />
        </a>
        <a href="/" className={`${styles.menuItem} pt-4 pr-5 pb-4 pl-5`}>
            <span className={`${styles.menuItemIcon} mr-2`}>
                <ProfileIcon type="secondary" />
            </span>
            <span>Личный кабинет</span>
        </a>
    </header>
);

export default AppHeader
