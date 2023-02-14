import { useContext, useState, createContext } from 'react';

import burgerAPI from '../burger-api';
import { setCookie, getCookie, deleteCookie } from './utils';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const prepareUser = (data) => {
    if (data && data.success) {
      setUser({ ...data.user });
    }
  };

  const prepareTokens = (data) => {
    if (data && data.success && data.accessToken.indexOf('Bearer ') === 0) {
      const newAccessToken = data.accessToken.split('Bearer ')[1];
      setAccessToken(newAccessToken);
      setCookie('refreshToken', data.refreshToken);
      return newAccessToken;
    }
    return '';
  };

  const getUserWithAccessToken = async (newAccessToken) => {
    return await burgerAPI
      .getUser(newAccessToken || accessToken)
      .then((data) => {
        prepareUser(data);
        return data;
      })
      .catch((error) => {
        return {
          success: false,
          message: error.message,
        };
      });
  };

  const getAccessToken = async () => {
    return await burgerAPI
      .getToken(getCookie('refreshToken'))
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return {
          success: false,
          message: error.message,
        };
      });
  };

  const getUser = async () => {
    let data = await getUserWithAccessToken();
    if (data && !data.success && data.message === 'jwt malformed') {
      data = await getAccessToken();
      const newAccessToken = prepareTokens(data);
      if (newAccessToken) {
        data = await getUserWithAccessToken(newAccessToken);
      }
    }
    return data.success;
  };

  const registerUser = async (name, email, password) => {
    const data = await burgerAPI.registerUser(name, email, password).then((data) => {
      prepareTokens(data);
      return data;
    });

    prepareUser(data);

    return data;
  };

  const signIn = async (email, password) => {
    const data = await burgerAPI.login(email, password).then((res) => {
      prepareTokens(res);
      return res;
    });

    prepareUser(data);

    return data;
  };

  const signOut = () => {
    return burgerAPI.logout(getCookie('refreshToken')).then(() => {
      setUser(null);
      setAccessToken(null);
      deleteCookie('refreshToken');
    });
  };

  return {
    user,
    getUser,
    registerUser,
    signIn,
    signOut,
  };
}
