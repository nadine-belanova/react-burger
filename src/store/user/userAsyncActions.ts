import burgerAPI from '../../burger-api';
import { AppDispatch } from '../index';
import { setCookie } from '../../services/utils';

import { userRequest, userSuccess, userError, clearUser } from './userSlice';

export const fetchUser = () => (dispatch: AppDispatch) => {
  dispatch(userRequest());
  burgerAPI
    .getUser()
    .then((data) => {
      dispatch(userSuccess(data.user));
    })
    .catch(async (error) => {
      if (error.message === 'jwt malformed') {
        try {
          const refreshData = await burgerAPI.refreshToken();
          if (refreshData.success) {
            setCookie('accessToken', refreshData.token, {});
            const data = await burgerAPI.getUser();
            if (data.success) {
              dispatch(userSuccess(data.user));
            } else {
              dispatch(userError('Невозможно получить пользователя'));
            }
          } else {
            dispatch(userError('Невозможно обновить токен'));
          }
        } catch (err: any) {
          if (err instanceof Error) {
            dispatch(userError(err.message));
          } else {
            dispatch(userError('Невозможно обновить токен'));
          }
        }
      } else {
        dispatch(userError(error.message));
      }
    });
};

export const registerUser = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch(userRequest());
  burgerAPI
    .registerUser(name, email, password)
    .then((data) => {
      if (data.success && data.accessToken.indexOf('Bearer ') === 0) {
        localStorage.setItem('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1], {});
        dispatch(userSuccess(data.user));
      } else {
        dispatch(userError(data.message));
      }
    })
    .catch(async (error) => {
      dispatch(userError(error.message));
    });
};

export const signIn = (email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch(userRequest());
  burgerAPI
    .login(email, password)
    .then((data) => {
      if (data.success && data.accessToken.indexOf('Bearer ') === 0) {
        localStorage.setItem('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1], {});
        dispatch(userSuccess(data.user));
      } else {
        dispatch(userError(data.message));
      }
    })
    .catch(async (error) => {
      dispatch(userError(error.message));
    });
};

export const signOut = () => (dispatch: AppDispatch) => {
  burgerAPI
    .logout()
    .then(() => {
      dispatch(clearUser());
    })
    .then(() => {
      dispatch(clearUser());
    });
};
