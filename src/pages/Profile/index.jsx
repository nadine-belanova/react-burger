import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { signOut } from '../../store/user/userAsyncActions';
import { selectUserOptions } from '../../store/user/userSlice';

import styles from './Profile.module.css';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectUserOptions);

  const handleLoginClick = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <>
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
          <div
            className={`${styles.profileNavItemInactive} text text_type_main-medium text_color_inactive`}
            onClick={handleLoginClick}
          >
            Выход
          </div>
          <div className={`text text_type_main-default text_color_inactive mt-20`}>
            В этом разделе вы можете изменить свои персональные данные
          </div>
        </div>
        <Outlet />
      </main>
      <NotificationContainer />
    </>
  );
};

export default Profile;
