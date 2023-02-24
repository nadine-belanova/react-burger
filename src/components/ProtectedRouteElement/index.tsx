import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';

import { selectUserOptions } from '../../store/user/userSlice';
import { fetchUser } from '../../store/user/userAsyncActions';

type TProtectedRouteElementProps = {
  element: JSX.Element;
};

const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({ element }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user, userLoading } = useSelector(selectUserOptions);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (userLoading) {
    return null;
  }

  if (user) {
    return element;
  }

  return <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

export default ProtectedRouteElement;
