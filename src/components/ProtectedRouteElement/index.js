import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectUserOptions } from '../../store/user/userSlice';
import { fetchUser } from '../../store/user/userAsyncActions';

export function ProtectedRouteElement({ element }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, userLoading } = useSelector(selectUserOptions);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (userLoading) {
    return null;
  }

  return user ? element : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}
