import { createContext, FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { selectUserOptions } from '../store/user/userSlice';

import { TUser } from '../store/user/userTypes';

const AuthContext = createContext<TUser | null>(null);

type TProvideAuthProps = {
  children: ReactNode;
};

export const ProvideAuth: FC<TProvideAuthProps> = ({ children }) => {
  const { user } = useSelector(selectUserOptions);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
