import { NavLink, Outlet } from 'react-router-dom';

import AppHeader from '../../components/AppHeader';

import styles from './Profile.module.css';

const Profile = () => (
  <>
    <AppHeader />
    <main className={`${styles.profile} pt-30`}>
      <div className={`${styles.profileNav} ml-9 mr-15`}>
        <div className="text text_type_main-medium pt-4 pr-5 pb-4">
          <NavLink
            to="/profile/info"
            className={({ isActive }) =>
              isActive ? styles.profileNavItem : `${styles.profileNavItemInactive} text_color_inactive`
            }
          >
            Профиль
          </NavLink>
        </div>
        <div className="text text_type_main-medium pt-4 pr-5 pb-4">
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              isActive ? styles.profileNavItem : `${styles.profileNavItemInactive} text_color_inactive`
            }
          >
            История заказов
          </NavLink>
        </div>
        <div className={`${styles.profileNavItemInactive} text text_type_main-medium text_color_inactive`}>Выход</div>
        <div className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>
      <Outlet />
    </main>
  </>
);

export default Profile;
