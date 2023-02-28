import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import { selectUserOptions } from '../../store/user/userSlice';
import { fetchUser } from '../../store/user/userAsyncActions';

type TProtectedRouteElementProps = {
  element: JSX.Element;
  anonymous?: boolean;
};

const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({ element, anonymous = false }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user, userLoading } = useSelector(selectUserOptions);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (userLoading) {
    return null;
  }

  if (anonymous) {
    if (user) {
      return <Navigate to="/" replace />;
    }
    return element;
  }

  if (user) {
    return element;
  }

  return <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

export default ProtectedRouteElement;
